export interface UserProfile {
  name: string;
  weightKg: number;
  weightUnit: 'kg' | 'lb';
  dailyGoalMl: number;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface HydrationEntry {
  id: string;
  amountMl: number;
  timestamp: string;
  dateKey: string;
}

export interface DailyRecord {
  dateKey: string;
  totalMl: number;
  goalMl: number;
  entries: HydrationEntry[];
  goalMet: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDateKey: string;
}

export interface XPData {
  totalXP: number;
  level: number;
}

export type BadgeId =
  | 'first_drop'
  | 'hydration_hero'
  | 'three_day_streak'
  | 'weekly_warrior'
  | 'monthly_master'
  | 'early_bird'
  | 'night_owl'
  | 'overachiever'
  | 'glass_half_full';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  intervalHours: number;
  startHour: number;
  endHour: number;
}

export interface AppSettings {
  darkMode: boolean;
  volumeUnit: 'ml' | 'l';
  notifications: NotificationSettings;
}
