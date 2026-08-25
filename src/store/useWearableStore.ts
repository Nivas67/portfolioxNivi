import { create } from 'zustand';
import { WearableDailyData, WearableSource, WorkoutLog } from '../types';
import { wearableService } from '../services/wearableService';
import { getTodayDateString } from '../utils/dateUtils';
import { storageService } from '../services/storageService';

interface WearableState {
  connectedSources: Record<WearableSource, boolean>;
  activePrimarySource: WearableSource;
  dailyData: Record<string, WearableDailyData>;
  isSyncing: boolean;
  liveHeartRate: number;
  universalCalibrationStatus: string;

  // Actions
  connectSource: (source: WearableSource) => Promise<boolean>;
  disconnectSource: (source: WearableSource) => void;
  syncTodayData: (manualWorkoutLogs?: WorkoutLog[]) => Promise<void>;
  simulateStepsAdd: (stepsDelta: number) => void;
  getTodayWearableData: (manualWorkoutLogs?: WorkoutLog[]) => WearableDailyData;
}

const todayStr = getTodayDateString();

const SEED_MASTER_DATA: Record<string, WearableDailyData> = {
  [todayStr]: wearableService.getMasterDailyData('health_connect', todayStr),
};

export const useWearableStore = create<WearableState>((set, get) => ({
  connectedSources: {
    health_connect: true,
    healthkit: true,
    fitbit: false,
  },
  activePrimarySource: 'health_connect',
  dailyData: SEED_MASTER_DATA,
  isSyncing: false,
  liveHeartRate: 74,
  universalCalibrationStatus: 'Calibrated & 100% Unified (Health Connect & HealthKit)',

  connectSource: async (source: WearableSource) => {
    set({ isSyncing: true });
    const result = await wearableService.requestPermissionAndConnect(source);
    if (result.success) {
      const updatedConnected = { ...get().connectedSources, [source]: true };
      
      const currentMaster = get().getTodayWearableData();
      const updatedDailyData: WearableDailyData = {
        ...currentMaster,
        source,
        lastSyncedAt: new Date().toISOString(),
      };

      set({
        connectedSources: updatedConnected,
        activePrimarySource: source,
        dailyData: { ...get().dailyData, [todayStr]: updatedDailyData },
        isSyncing: false,
      });

      storageService.setItem('fittrack_wearables_connected', updatedConnected);
      return true;
    }
    set({ isSyncing: false });
    return false;
  },

  disconnectSource: (source: WearableSource) => {
    const updatedConnected = { ...get().connectedSources, [source]: false };
    set({ connectedSources: updatedConnected });
    storageService.setItem('fittrack_wearables_connected', updatedConnected);
  },

  syncTodayData: async (manualWorkoutLogs?: WorkoutLog[]) => {
    set({ isSyncing: true });
    await new Promise((res) => setTimeout(res, 500));
    const current = get().getTodayWearableData();

    // Run Sanity Check
    const rawData = {
      steps: current.steps + Math.floor(Math.random() * 60),
      activeCalories: current.activeCalories + Math.floor(Math.random() * 8),
      restingHeartRate: current.restingHeartRate,
      sleepMinutes: current.sleepMinutes,
    };
    const sanitized = wearableService.sanitizeTelemetry(rawData);

    // Apply De-Duplication Calorie Priority
    let finalActiveCalories = sanitized.activeCalories;
    if (manualWorkoutLogs) {
      const deDup = wearableService.deDuplicateCalories(sanitized.activeCalories, manualWorkoutLogs, todayStr);
      finalActiveCalories = deDup.finalActiveCalories;
    }

    const refreshed: WearableDailyData = {
      ...current,
      steps: sanitized.steps,
      activeCalories: finalActiveCalories,
      totalCalories: 1720 + finalActiveCalories,
      restingHeartRate: sanitized.restingHeartRate,
      lastSyncedAt: new Date().toISOString(),
    };

    set({
      dailyData: { ...get().dailyData, [todayStr]: refreshed },
      liveHeartRate: 72 + Math.floor(Math.random() * 6),
      isSyncing: false,
    });
  },

  simulateStepsAdd: (stepsDelta: number) => {
    const current = get().getTodayWearableData();
    const addedCal = Math.round(stepsDelta * 0.045);
    const updated: WearableDailyData = {
      ...current,
      steps: current.steps + stepsDelta,
      activeCalories: current.activeCalories + addedCal,
      totalCalories: (current.totalCalories || 2280) + addedCal,
      lastSyncedAt: new Date().toISOString(),
    };

    set({
      dailyData: { ...get().dailyData, [todayStr]: updated },
    });
  },

  getTodayWearableData: (manualWorkoutLogs?: WorkoutLog[]) => {
    const day = get().dailyData[todayStr];
    const base = day || wearableService.getMasterDailyData(get().activePrimarySource, todayStr);

    if (manualWorkoutLogs && manualWorkoutLogs.length > 0) {
      const deDup = wearableService.deDuplicateCalories(base.activeCalories, manualWorkoutLogs, todayStr);
      return {
        ...base,
        activeCalories: deDup.finalActiveCalories,
        totalCalories: 1720 + deDup.finalActiveCalories,
      };
    }
    return base;
  },
}));
