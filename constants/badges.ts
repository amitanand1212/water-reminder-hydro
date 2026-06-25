import { Badge, BadgeId } from '../types';

export const ALL_BADGES: Omit<Badge, 'unlockedAt'>[] = [
  {
    id: 'first_drop',
    name: 'First Drop',
    description: 'Log your first water intake',
    icon: '💧',
    xpReward: 50,
  },
  {
    id: 'hydration_hero',
    name: 'Hydration Hero',
    description: 'Complete your daily goal for the first time',
    icon: '🏆',
    xpReward: 100,
  },
  {
    id: 'three_day_streak',
    name: 'Hat Trick',
    description: 'Maintain a 3-day hydration streak',
    icon: '🎯',
    xpReward: 150,
  },
  {
    id: 'weekly_warrior',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day hydration streak',
    icon: '⚡',
    xpReward: 300,
  },
  {
    id: 'monthly_master',
    name: 'Monthly Master',
    description: 'Maintain a 30-day hydration streak',
    icon: '👑',
    xpReward: 1000,
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Log water before 8:00 AM',
    icon: '🌅',
    xpReward: 75,
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Log water after 9:00 PM',
    icon: '🌙',
    xpReward: 75,
  },
  {
    id: 'overachiever',
    name: 'Overachiever',
    description: 'Drink 150% of your daily goal',
    icon: '🚀',
    xpReward: 200,
  },
  {
    id: 'glass_half_full',
    name: 'Glass Half Full',
    description: 'Reach 50% of your goal for 7 consecutive days',
    icon: '✨',
    xpReward: 250,
  },
];
