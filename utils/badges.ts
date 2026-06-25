import { ALL_BADGES } from '../constants/badges';
import { Badge, BadgeId, DailyRecord, StreakData } from '../types';

interface BadgeCheckContext {
  streak: StreakData;
  todayRecord: DailyRecord;
  allRecords: Record<string, DailyRecord>;
  unlockedBadgeIds: BadgeId[];
}

function isUnlocked(id: BadgeId, unlocked: BadgeId[]): boolean {
  return unlocked.includes(id);
}

export function checkBadgeConditions(ctx: BadgeCheckContext): Badge[] {
  const { streak, todayRecord, allRecords, unlockedBadgeIds } = ctx;
  const newBadges: Badge[] = [];
  const now = new Date().toISOString();

  const tryUnlock = (id: BadgeId, condition: boolean) => {
    if (condition && !isUnlocked(id, unlockedBadgeIds)) {
      const def = ALL_BADGES.find((b) => b.id === id)!;
      newBadges.push({ ...def, unlockedAt: now });
    }
  };

  const hasAnyEntry = Object.values(allRecords).some((r) => r.entries.length > 0);
  tryUnlock('first_drop', hasAnyEntry);
  tryUnlock('hydration_hero', todayRecord.goalMet);
  tryUnlock('three_day_streak', streak.currentStreak >= 3);
  tryUnlock('weekly_warrior', streak.currentStreak >= 7);
  tryUnlock('monthly_master', streak.currentStreak >= 30);

  const hour = new Date().getHours();
  tryUnlock('early_bird', todayRecord.entries.length > 0 && hour < 8);
  tryUnlock('night_owl', todayRecord.entries.length > 0 && hour >= 21);

  const overachiever = todayRecord.goalMl > 0 && todayRecord.totalMl >= todayRecord.goalMl * 1.5;
  tryUnlock('overachiever', overachiever);

  const keys = Object.keys(allRecords).sort().slice(-7);
  const sevenDayHalf = keys.length === 7 && keys.every((k) => {
    const r = allRecords[k];
    return r && r.goalMl > 0 && r.totalMl >= r.goalMl * 0.5;
  });
  tryUnlock('glass_half_full', sevenDayHalf);

  return newBadges;
}

export function calculateXPForWater(amountMl: number): number {
  return Math.round((amountMl / 250) * 10);
}

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 500) + 1;
}

export function xpToNextLevel(totalXP: number): number {
  return 500 - (totalXP % 500);
}
