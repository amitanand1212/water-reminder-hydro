import { create } from 'zustand';
import { UserProfile, DailyRecord, StreakData, XPData, Badge, BadgeId, AppSettings, HydrationEntry } from '../types';
import { STORAGE_KEYS, loadFromStorage, saveToStorage, clearAllStorage } from '../utils/storage';
import { todayKey, yesterdayKey } from '../utils/dateHelpers';
import { goalFromWeightKg } from '../utils/calculations';
import { checkBadgeConditions, calculateXPForWater, calculateLevel } from '../utils/badges';
import { ALL_BADGES } from '../constants/badges';

export const DEFAULT_NOTIFICATION_SETTINGS = {
  enabled: true,
  intervalHours: 2,
  startHour: 8,
  endHour: 22,
};

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  volumeUnit: 'l',
  notifications: DEFAULT_NOTIFICATION_SETTINGS,
};

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDateKey: '',
};

const DEFAULT_XP: XPData = { totalXP: 0, level: 1 };

function makeEmptyRecord(dateKey: string, goalMl: number): DailyRecord {
  return { dateKey, totalMl: 0, goalMl, entries: [], goalMet: false };
}

function computeStreak(streak: StreakData, records: Record<string, DailyRecord>): StreakData {
  const today = todayKey();
  const yesterday = yesterdayKey();
  const todayRecord = records[today];
  const todayMet = todayRecord?.goalMet ?? false;

  if (streak.lastCompletedDateKey === today) return streak;

  if (streak.lastCompletedDateKey === yesterday || streak.lastCompletedDateKey === '') {
    if (todayMet) {
      const newStreak = streak.currentStreak + 1;
      return {
        currentStreak: newStreak,
        longestStreak: Math.max(streak.longestStreak, newStreak),
        lastCompletedDateKey: today,
      };
    }
    return streak;
  }

  // Gap of 1+ days — reset
  return {
    currentStreak: todayMet ? 1 : 0,
    longestStreak: streak.longestStreak,
    lastCompletedDateKey: todayMet ? today : streak.lastCompletedDateKey,
  };
}

interface HydrationStore {
  user: UserProfile | null;
  dailyRecords: Record<string, DailyRecord>;
  streak: StreakData;
  xp: XPData;
  unlockedBadges: Badge[];
  settings: AppSettings;
  isLoading: boolean;

  initStore: () => Promise<void>;
  saveUser: (profile: Partial<UserProfile>) => void;
  addWater: (amountMl: number) => void;
  getTodayRecord: () => DailyRecord;
  getWeekRecords: (dateKeys: string[]) => DailyRecord[];
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
  resetApp: () => Promise<void>;
}

export const useHydrationStore = create<HydrationStore>((set, get) => ({
  user: null,
  dailyRecords: {},
  streak: DEFAULT_STREAK,
  xp: DEFAULT_XP,
  unlockedBadges: [],
  settings: DEFAULT_SETTINGS,
  isLoading: true,

  initStore: async () => {
    const [user, records, streak, xp, badges, settings] = await Promise.all([
      loadFromStorage<UserProfile | null>(STORAGE_KEYS.USER, null),
      loadFromStorage<Record<string, DailyRecord>>(STORAGE_KEYS.RECORDS, {}),
      loadFromStorage<StreakData>(STORAGE_KEYS.STREAK, DEFAULT_STREAK),
      loadFromStorage<XPData>(STORAGE_KEYS.XP, DEFAULT_XP),
      loadFromStorage<Badge[]>(STORAGE_KEYS.BADGES, []),
      loadFromStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
    ]);

    const today = todayKey();
    const goalMl = user?.dailyGoalMl ?? 2000;
    if (!records[today]) {
      records[today] = makeEmptyRecord(today, goalMl);
    }

    const updatedStreak = computeStreak(streak, records);

    set({
      user,
      dailyRecords: records,
      streak: updatedStreak,
      xp,
      unlockedBadges: badges,
      settings,
      isLoading: false,
    });
  },

  saveUser: (profile) => {
    const current = get().user;
    const updated: UserProfile = {
      name: '',
      weightKg: 70,
      weightUnit: 'kg',
      dailyGoalMl: goalFromWeightKg(70),
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
      ...current,
      ...profile,
    };
    set({ user: updated });
    saveToStorage(STORAGE_KEYS.USER, updated);

    // Update today's record goal if goal changed
    if (profile.dailyGoalMl) {
      const records = { ...get().dailyRecords };
      const today = todayKey();
      if (records[today]) {
        records[today] = { ...records[today], goalMl: updated.dailyGoalMl };
        set({ dailyRecords: records });
        saveToStorage(STORAGE_KEYS.RECORDS, records);
      }
    }
  },

  addWater: (amountMl) => {
    const state = get();
    const today = todayKey();
    const records = { ...state.dailyRecords };
    const goalMl = state.user?.dailyGoalMl ?? 2000;

    if (!records[today]) {
      records[today] = makeEmptyRecord(today, goalMl);
    }

    const entry: HydrationEntry = {
      id: `${Date.now()}-${Math.random()}`,
      amountMl,
      timestamp: new Date().toISOString(),
      dateKey: today,
    };

    const updatedRecord: DailyRecord = {
      ...records[today],
      entries: [...records[today].entries, entry],
      totalMl: records[today].totalMl + amountMl,
    };
    const wasGoalMet = records[today].goalMet;
    updatedRecord.goalMet = updatedRecord.totalMl >= updatedRecord.goalMl;
    records[today] = updatedRecord;

    // XP
    let xpEarned = calculateXPForWater(amountMl);
    if (!wasGoalMet && updatedRecord.goalMet) {
      xpEarned += 50;
    }
    const newTotalXP = state.xp.totalXP + xpEarned;
    const newXP: XPData = { totalXP: newTotalXP, level: calculateLevel(newTotalXP) };

    // Streak
    const updatedStreak = computeStreak(state.streak, records);

    // Badges
    const unlockedIds = state.unlockedBadges.map((b) => b.id as BadgeId);
    const newBadges = checkBadgeConditions({
      streak: updatedStreak,
      todayRecord: updatedRecord,
      allRecords: records,
      unlockedBadgeIds: unlockedIds,
    });
    // Add badge XP
    const badgeXP = newBadges.reduce((sum, b) => sum + b.xpReward, 0);
    const finalXP: XPData = { totalXP: newTotalXP + badgeXP, level: calculateLevel(newTotalXP + badgeXP) };
    const allUnlocked = [...state.unlockedBadges, ...newBadges];

    set({ dailyRecords: records, xp: finalXP, streak: updatedStreak, unlockedBadges: allUnlocked });
    saveToStorage(STORAGE_KEYS.RECORDS, records);
    saveToStorage(STORAGE_KEYS.XP, finalXP);
    saveToStorage(STORAGE_KEYS.STREAK, updatedStreak);
    saveToStorage(STORAGE_KEYS.BADGES, allUnlocked);
  },

  getTodayRecord: () => {
    const { dailyRecords, user } = get();
    const today = todayKey();
    return dailyRecords[today] ?? makeEmptyRecord(today, user?.dailyGoalMl ?? 2000);
  },

  getWeekRecords: (dateKeys) => {
    const { dailyRecords, user } = get();
    const goalMl = user?.dailyGoalMl ?? 2000;
    return dateKeys.map((k) => dailyRecords[k] ?? makeEmptyRecord(k, goalMl));
  },

  updateSettings: (partial) => {
    const updated = { ...get().settings, ...partial };
    set({ settings: updated });
    saveToStorage(STORAGE_KEYS.SETTINGS, updated);
  },

  resetSettings: () => {
    set({ settings: DEFAULT_SETTINGS });
    saveToStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  resetApp: async () => {
    await clearAllStorage();
    set({
      user: null,
      dailyRecords: {},
      streak: DEFAULT_STREAK,
      xp: DEFAULT_XP,
      unlockedBadges: [],
      settings: DEFAULT_SETTINGS,
    });
  },
}));
