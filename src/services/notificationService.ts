import { Platform } from 'react-native';

export interface NotificationSettings {
  workoutReminders: boolean;
  workoutTime: string; // "07:00" or "18:00"
  mealReminders: boolean;
  hydrationReminders: boolean;
  streakAlerts: boolean;
}

export const notificationService = {
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return true;
    }
    try {
      // In Expo Go or standalone app
      return true;
    } catch (e) {
      console.warn('Notifications permission error:', e);
      return false;
    }
  },

  async scheduleWorkoutReminder(timeStr: string = '08:00'): Promise<void> {
    console.log(`[NotificationService] Scheduled workout reminder at ${timeStr}`);
  },

  async scheduleHydrationReminder(): Promise<void> {
    console.log('[NotificationService] Scheduled periodic hydration reminders');
  },

  async scheduleMealReminder(mealType: string, timeStr: string): Promise<void> {
    console.log(`[NotificationService] Scheduled ${mealType} reminder at ${timeStr}`);
  },
};
