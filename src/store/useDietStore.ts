import { create } from 'zustand';
import { DailyMealLogs, FoodItem, LoggedFoodItem, MealType } from '../types';
import { POPULAR_FOODS_SEED } from '../data/dietTemplates';
import { getTodayDateString } from '../utils/dateUtils';
import { storageService } from '../services/storageService';

interface DietState {
  dailyLogs: Record<string, DailyMealLogs>;
  customFoods: FoodItem[];
  selectedDate: string;

  // Actions
  setSelectedDate: (date: string) => void;
  addFoodToMeal: (date: string, mealType: MealType, food: FoodItem, quantity?: number) => void;
  removeFoodFromMeal: (date: string, mealType: MealType, index: number) => void;
  addWater: (date: string, amountMl: number) => void;
  setWater: (date: string, amountMl: number) => void;
  createCustomFood: (food: Omit<FoodItem, 'id' | 'isCustom'>) => FoodItem;
  getDailySummary: (date: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    waterMl: number;
  };
}

const todayStr = getTodayDateString();

const SEED_DAILY_LOGS: Record<string, DailyMealLogs> = {
  [todayStr]: {
    date: todayStr,
    breakfast: [
      {
        id: 'f-02',
        name: 'Eggs (Large Whole)',
        brand: 'Generic',
        servingSize: 1,
        servingUnit: 'piece',
        calories: 216,
        protein: 18.9,
        carbs: 1.2,
        fat: 14.4,
        quantity: 3,
        loggedAt: `${todayStr}T08:15:00Z`,
      },
      {
        id: 'f-05',
        name: 'Rolled Oats (Raw)',
        brand: 'Quaker',
        servingSize: 50,
        servingUnit: 'g',
        calories: 190,
        protein: 6.5,
        carbs: 34,
        fat: 3.5,
        fiber: 5,
        quantity: 1,
        loggedAt: `${todayStr}T08:15:00Z`,
      },
    ],
    lunch: [
      {
        id: 'f-01',
        name: 'Chicken Breast (Boneless, Skinless)',
        brand: 'Generic',
        servingSize: 100,
        servingUnit: 'g',
        calories: 330,
        protein: 62,
        carbs: 0,
        fat: 7.2,
        quantity: 2,
        loggedAt: `${todayStr}T13:00:00Z`,
      },
      {
        id: 'f-06',
        name: 'Jasmine White Rice (Cooked)',
        brand: 'Generic',
        servingSize: 150,
        servingUnit: 'g',
        calories: 292,
        protein: 6,
        carbs: 64.5,
        fat: 0.6,
        quantity: 1.5,
        loggedAt: `${todayStr}T13:00:00Z`,
      },
    ],
    dinner: [
      {
        id: 'f-10',
        name: 'Atlantic Salmon Fillet',
        brand: 'Generic',
        servingSize: 150,
        servingUnit: 'g',
        calories: 310,
        protein: 34,
        carbs: 0,
        fat: 18,
        quantity: 1,
        loggedAt: `${todayStr}T19:30:00Z`,
      },
      {
        id: 'f-07',
        name: 'Sweet Potato (Cooked)',
        brand: 'Generic',
        servingSize: 150,
        servingUnit: 'g',
        calories: 202,
        protein: 4.5,
        carbs: 46.5,
        fat: 0.3,
        fiber: 6.7,
        quantity: 1.5,
        loggedAt: `${todayStr}T19:30:00Z`,
      },
    ],
    snack: [
      {
        id: 'f-08',
        name: 'Whey Protein Isolate',
        brand: 'Optimum Nutrition',
        servingSize: 30,
        servingUnit: 'g',
        calories: 120,
        protein: 24,
        carbs: 2,
        fat: 1,
        quantity: 1,
        loggedAt: `${todayStr}T16:00:00Z`,
      },
    ],
    waterIntakeMl: 2250,
  },
};

export const useDietStore = create<DietState>((set, get) => ({
  dailyLogs: SEED_DAILY_LOGS,
  customFoods: POPULAR_FOODS_SEED,
  selectedDate: todayStr,

  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },

  addFoodToMeal: (date: string, mealType: MealType, food: FoodItem, quantity = 1) => {
    const logs = { ...get().dailyLogs };
    const dayLog = logs[date] || {
      date,
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      waterIntakeMl: 0,
    };

    const pVal = food.proteinGrams || food.protein || 0;
    const cVal = food.carbsGrams || food.carbs || 0;
    const fVal = food.fatGrams || food.fat || 0;

    const loggedItem: LoggedFoodItem = {
      ...food,
      calories: Math.round(food.calories * quantity),
      protein: Math.round(pVal * quantity * 10) / 10,
      carbs: Math.round(cVal * quantity * 10) / 10,
      fat: Math.round(fVal * quantity * 10) / 10,
      fiber: food.fiber ? Math.round(food.fiber * quantity * 10) / 10 : undefined,
      quantity,
      loggedAt: new Date().toISOString(),
    };

    logs[date] = {
      ...dayLog,
      [mealType]: [...dayLog[mealType], loggedItem],
    };

    set({ dailyLogs: logs });
    storageService.setItem('fittrack_daily_diet_logs', logs);
  },

  removeFoodFromMeal: (date: string, mealType: MealType, index: number) => {
    const logs = { ...get().dailyLogs };
    const dayLog = logs[date];
    if (!dayLog) return;

    const updatedMeal = [...dayLog[mealType]];
    updatedMeal.splice(index, 1);

    logs[date] = {
      ...dayLog,
      [mealType]: updatedMeal,
    };

    set({ dailyLogs: logs });
    storageService.setItem('fittrack_daily_diet_logs', logs);
  },

  addWater: (date: string, amountMl: number) => {
    const logs = { ...get().dailyLogs };
    const dayLog = logs[date] || {
      date,
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      waterIntakeMl: 0,
    };

    logs[date] = {
      ...dayLog,
      waterIntakeMl: Math.max(0, dayLog.waterIntakeMl + amountMl),
    };

    set({ dailyLogs: logs });
    storageService.setItem('fittrack_daily_diet_logs', logs);
  },

  setWater: (date: string, amountMl: number) => {
    const logs = { ...get().dailyLogs };
    const dayLog = logs[date] || {
      date,
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      waterIntakeMl: 0,
    };

    logs[date] = {
      ...dayLog,
      waterIntakeMl: Math.max(0, amountMl),
    };

    set({ dailyLogs: logs });
    storageService.setItem('fittrack_daily_diet_logs', logs);
  },

  createCustomFood: (food) => {
    const newFood: FoodItem = {
      ...food,
      id: `custom-${Date.now()}`,
      isCustom: true,
    };
    const updated = [newFood, ...get().customFoods];
    set({ customFoods: updated });
    storageService.setItem('fittrack_custom_foods', updated);
    return newFood;
  },

  getDailySummary: (date: string) => {
    const dayLog = get().dailyLogs[date];
    if (!dayLog) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, waterMl: 0 };
    }

    const allItems = [
      ...dayLog.breakfast,
      ...dayLog.lunch,
      ...dayLog.dinner,
      ...dayLog.snack,
    ];

    return {
      calories: allItems.reduce((sum, item) => sum + item.calories, 0),
      protein: Math.round(allItems.reduce((sum, item) => sum + (item.proteinGrams || item.protein || 0), 0) * 10) / 10,
      carbs: Math.round(allItems.reduce((sum, item) => sum + (item.carbsGrams || item.carbs || 0), 0) * 10) / 10,
      fat: Math.round(allItems.reduce((sum, item) => sum + (item.fatGrams || item.fat || 0), 0) * 10) / 10,
      fiber: Math.round(allItems.reduce((sum, item) => sum + (item.fiber || 0), 0) * 10) / 10,
      waterMl: dayLog.waterIntakeMl,
    };
  },
}));
