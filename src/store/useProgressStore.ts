import { create } from 'zustand';
import {
  BodyWeightEntry,
  BodyMeasurementsEntry,
  ProgressPhotoEntry,
  OneRmRecord,
} from '../types';
import { getTodayDateString, getPastNDays } from '../utils/dateUtils';
import { storageService } from '../services/storageService';

interface ProgressState {
  weightLogs: BodyWeightEntry[];
  measurementLogs: BodyMeasurementsEntry[];
  photoLogs: ProgressPhotoEntry[];
  oneRmRecords: Record<string, OneRmRecord>;

  // Actions
  logWeight: (weightKg: number, bodyFat?: number, note?: string, date?: string) => void;
  logMeasurements: (measurements: Omit<BodyMeasurementsEntry, 'id' | 'date'>, date?: string) => void;
  addPhoto: (
    photoUriOrData: string | { photoUri: string; weightKgAtTime?: number; caption?: string; hasSilhouetteAlignment?: boolean },
    type?: 'front' | 'side' | 'back',
    weightKg?: number,
    caption?: string
  ) => void;
  recordOneRm: (record: OneRmRecord) => void;
  getWeightTrend: () => { date: string; weightKg: number }[];
}

const pastDates = getPastNDays(14);

const SEED_WEIGHT_LOGS: BodyWeightEntry[] = [
  { id: 'w-1', date: pastDates[0], weightKg: 84.5, bodyFatPercent: 16.5 },
  { id: 'w-2', date: pastDates[2], weightKg: 84.2, bodyFatPercent: 16.3 },
  { id: 'w-3', date: pastDates[4], weightKg: 83.8, bodyFatPercent: 16.0 },
  { id: 'w-4', date: pastDates[6], weightKg: 83.4, bodyFatPercent: 15.8 },
  { id: 'w-5', date: pastDates[8], weightKg: 83.1, bodyFatPercent: 15.6 },
  { id: 'w-6', date: pastDates[10], weightKg: 82.8, bodyFatPercent: 15.4 },
  { id: 'w-7', date: pastDates[12], weightKg: 82.6, bodyFatPercent: 15.2 },
  { id: 'w-8', date: pastDates[13], weightKg: 82.5, bodyFatPercent: 15.0 },
];

const SEED_MEASUREMENTS: BodyMeasurementsEntry[] = [
  {
    id: 'm-1',
    date: pastDates[0],
    chestCm: 106,
    waistCm: 84,
    hipsCm: 98,
    leftArmCm: 39,
    rightArmCm: 39.5,
    leftThighCm: 60,
    rightThighCm: 60.5,
  },
  {
    id: 'm-2',
    date: pastDates[13],
    chestCm: 107.5,
    waistCm: 81.5,
    hipsCm: 97,
    leftArmCm: 40.2,
    rightArmCm: 40.5,
    leftThighCm: 61,
    rightThighCm: 61.5,
  },
];

const SEED_PHOTOS: ProgressPhotoEntry[] = [
  {
    id: 'p-1',
    date: pastDates[0],
    photoUri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    weightKgAtTime: 84.5,
    caption: 'Day 1 Baseline Shape',
    hasSilhouetteAlignment: true,
  },
  {
    id: 'p-2',
    date: pastDates[13],
    photoUri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    weightKgAtTime: 81.2,
    caption: 'Week 2 Hypertrophy Cut',
    hasSilhouetteAlignment: true,
  },
];

const SEED_1RM: Record<string, OneRmRecord> = {
  'ex-chest-01': {
    exerciseId: 'ex-chest-01',
    exerciseName: 'Barbell Flat Bench Press',
    oneRmKg: 120,
    date: pastDates[12],
  },
  'ex-leg-01': {
    exerciseId: 'ex-leg-01',
    exerciseName: 'Barbell Back Squat',
    oneRmKg: 165,
    date: pastDates[10],
  },
  'ex-back-01': {
    exerciseId: 'ex-back-01',
    exerciseName: 'Barbell Deadlift',
    oneRmKg: 190,
    date: pastDates[13],
  },
  'ex-sh-01': {
    exerciseId: 'ex-sh-01',
    exerciseName: 'Overhead Military Press',
    oneRmKg: 75,
    date: pastDates[11],
  },
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  weightLogs: SEED_WEIGHT_LOGS,
  measurementLogs: SEED_MEASUREMENTS,
  photoLogs: SEED_PHOTOS,
  oneRmRecords: SEED_1RM,

  logWeight: (weightKg, bodyFat, note, date = getTodayDateString()) => {
    const newEntry: BodyWeightEntry = {
      id: `weight-${Date.now()}`,
      date,
      weightKg,
      bodyFatPercent: bodyFat,
      notes: note,
    };
    const updated = [...get().weightLogs.filter((w) => w.date !== date), newEntry].sort(
      (a, b) => a.date.localeCompare(b.date)
    );
    set({ weightLogs: updated });
    storageService.setItem('fittrack_weight_logs', updated);
  },

  logMeasurements: (measurements, date = getTodayDateString()) => {
    const newEntry: BodyMeasurementsEntry = {
      ...measurements,
      id: `measure-${Date.now()}`,
      date,
    };
    const updated = [...get().measurementLogs.filter((m) => m.date !== date), newEntry].sort(
      (a, b) => a.date.localeCompare(b.date)
    );
    set({ measurementLogs: updated });
    storageService.setItem('fittrack_measurements_logs', updated);
  },

  addPhoto: (photoUriOrData, type, weightKg, caption) => {
    let newPhoto: ProgressPhotoEntry;
    if (typeof photoUriOrData === 'object') {
      newPhoto = {
        id: `photo-${Date.now()}`,
        date: getTodayDateString(),
        ...photoUriOrData,
      };
    } else {
      newPhoto = {
        id: `photo-${Date.now()}`,
        date: getTodayDateString(),
        photoUri: photoUriOrData,
        weightKgAtTime: weightKg,
        caption,
        hasSilhouetteAlignment: true,
      };
    }
    const updated = [newPhoto, ...get().photoLogs];
    set({ photoLogs: updated });
    storageService.setItem('fittrack_photo_logs', updated);
  },

  recordOneRm: (record) => {
    const current = { ...get().oneRmRecords };
    const existing = current[record.exerciseId];
    const newKg = record.oneRmKg || record.estimatedOneRmKg || 0;
    const existingKg = existing ? (existing.oneRmKg || existing.estimatedOneRmKg || 0) : 0;
    if (!existing || newKg > existingKg) {
      current[record.exerciseId] = record;
      set({ oneRmRecords: current });
      storageService.setItem('fittrack_1rm_records', current);
    }
  },

  getWeightTrend: () => {
    return get().weightLogs.map((w) => ({
      date: w.date,
      weightKg: w.weightKg,
    }));
  },
}));
