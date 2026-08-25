import { Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-workout',
    title: 'First Blood',
    description: 'Complete your first live workout session in FitTrack.',
    category: 'workout',
    iconName: 'dumbbell',
    progress: 1,
    unlockedAt: '2026-08-20T10:00:00Z',
    requirementText: 'Log 1 workout'
  },
  {
    id: 'badge-streak-7',
    title: '7-Day Discipline Warrior',
    description: 'Maintain a 7-day streak of following your workout and diet plan.',
    category: 'streak',
    iconName: 'flame',
    progress: 0.85,
    requirementText: '7 continuous active days'
  },
  {
    id: 'badge-streak-30',
    title: 'Iron Consistency',
    description: 'Follow the plan for 30 consecutive days. Habit locked in.',
    category: 'streak',
    iconName: 'trophy',
    progress: 0.20,
    requirementText: '30 consecutive days'
  },
  {
    id: 'badge-tonnage-10k',
    title: '10-Ton Titan',
    description: 'Lift an accumulated 10,000 kg across all your completed workouts.',
    category: 'strength',
    iconName: 'zap',
    progress: 1,
    unlockedAt: '2026-08-21T18:30:00Z',
    requirementText: '10,000 kg total volume'
  },
  {
    id: 'badge-tonnage-100k',
    title: 'Iron Century (100 Tons)',
    description: 'Accumulate 100,000 kg in total weight lifted.',
    category: 'strength',
    iconName: 'shield',
    progress: 0.42,
    requirementText: '100,000 kg total volume'
  },
  {
    id: 'badge-hydrated-master',
    title: 'Hydration Machine',
    description: 'Meet your daily water intake goal 7 days in a row.',
    category: 'nutrition',
    iconName: 'droplet',
    progress: 0.71,
    requirementText: '7 days water target met'
  },
  {
    id: 'badge-wearable-synced',
    title: 'Cyborg Sync',
    description: 'Connect a smartwatch (Apple Watch, Google Fit, or Fitbit) and sync daily activity.',
    category: 'wearable',
    iconName: 'watch',
    progress: 1,
    unlockedAt: '2026-08-20T12:00:00Z',
    requirementText: 'Connect any wearable watch'
  },
  {
    id: 'badge-pr-crusher',
    title: 'Record Crusher',
    description: 'Hit 5 new personal records (1RM or rep PRs) in live workout sessions.',
    category: 'strength',
    iconName: 'award',
    progress: 0.60,
    requirementText: '5 PRs achieved'
  }
];
