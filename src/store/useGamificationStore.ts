import { create } from 'zustand';
import { Badge, DailyDisciplineChecklist, StreakInfo } from '../types';
import { INITIAL_BADGES } from '../data/badgesData';
import { getTodayDateString, getPastNDays } from '../utils/dateUtils';
import { storageService } from '../services/storageService';

interface GamificationState {
  streak: StreakInfo;
  dailyChecklists: Record<string, DailyDisciplineChecklist>;
  badges: Badge[];

  // Actions
  toggleChecklistItem: (
    date: string,
    key: keyof Omit<DailyDisciplineChecklist, 'date'>
  ) => void;
  getTodayChecklist: () => DailyDisciplineChecklist;
  calculateWeeklyAdherence: () => number;
  unlockBadge: (badgeId: string) => void;
}

const todayStr = getTodayDateString();
const past7 = getPastNDays(7);

const SEED_CHECKLISTS: Record<string, DailyDisciplineChecklist> = {
  [past7[0]]: { date: past7[0], workoutCompleted: true, dietLogged: true, waterGoalMet: true, sleepGoalMet: true, stepsGoalMet: true },
  [past7[1]]: { date: past7[1], workoutCompleted: true, dietLogged: true, waterGoalMet: true, sleepGoalMet: true, stepsGoalMet: true },
  [past7[2]]: { date: past7[2], workoutCompleted: true, dietLogged: true, waterGoalMet: true, sleepGoalMet: false, stepsGoalMet: true },
  [past7[3]]: { date: past7[3], workoutCompleted: true, dietLogged: true, waterGoalMet: true, sleepGoalMet: true, stepsGoalMet: true },
  [past7[4]]: { date: past7[4], workoutCompleted: true, dietLogged: true, waterGoalMet: true, sleepGoalMet: true, stepsGoalMet: true },
  [past7[5]]: { date: past7[5], workoutCompleted: true, dietLogged: true, waterGoalMet: true, sleepGoalMet: true, stepsGoalMet: true },
  [todayStr]: { date: todayStr, workoutCompleted: true, dietLogged: true, waterGoalMet: false, sleepGoalMet: true, stepsGoalMet: true },
};

export const useGamificationStore = create<GamificationState>((set, get) => ({
  streak: {
    currentStreak: 6,
    longestStreak: 18,
    lastActiveDate: todayStr,
    weeklyAdherencePercentage: 94,
  },
  dailyChecklists: SEED_CHECKLISTS,
  badges: INITIAL_BADGES,

  toggleChecklistItem: (date, key) => {
    const all = { ...get().dailyChecklists };
    const current = all[date] || {
      date,
      workoutCompleted: false,
      dietLogged: false,
      waterGoalMet: false,
      sleepGoalMet: false,
      stepsGoalMet: false,
    };

    all[date] = {
      ...current,
      [key]: !current[key],
    };

    set({ dailyChecklists: all });
    storageService.setItem('fittrack_daily_checklists', all);

    // Recalculate adherence
    const adherence = get().calculateWeeklyAdherence();
    set((state) => ({
      streak: { ...state.streak, weeklyAdherencePercentage: adherence },
    }));
  },

  getTodayChecklist: () => {
    const list = get().dailyChecklists[todayStr];
    if (list) return list;
    return {
      date: todayStr,
      workoutCompleted: false,
      dietLogged: false,
      waterGoalMet: false,
      sleepGoalMet: false,
      stepsGoalMet: false,
    };
  },

  calculateWeeklyAdherence: () => {
    const past7Days = getPastNDays(7);
    let totalItems = past7Days.length * 3; // workout + diet + water
    let completedItems = 0;

    past7Days.forEach((d) => {
      const entry = get().dailyChecklists[d];
      if (entry) {
        if (entry.workoutCompleted) completedItems++;
        if (entry.dietLogged) completedItems++;
        if (entry.waterGoalMet) completedItems++;
      }
    });

    return Math.round((completedItems / totalItems) * 100);
  },

  unlockBadge: (badgeId: string) => {
    const updatedBadges = get().badges.map((b) => {
      if (b.id === badgeId) {
        return {
          ...b,
          progress: 1,
          unlockedAt: new Date().toISOString(),
        };
      }
      return b;
    });
    set({ badges: updatedBadges });
  },
}));
