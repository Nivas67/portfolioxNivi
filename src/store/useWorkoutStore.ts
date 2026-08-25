import { create } from 'zustand';
import {
  WorkoutPlan,
  WorkoutLog,
  ExerciseLog,
  SetLog,
  Exercise,
  WorkoutDay,
  WorkoutExercise,
} from '../types';
import { DEFAULT_WORKOUT_TEMPLATES } from '../data/workoutTemplates';
import { EXERCISES_DATABASE } from '../data/exercisesData';
import { calculateEpley1RM, calculateTotalVolumeKg } from '../utils/strengthCalculators';
import { getTodayDateString } from '../utils/dateUtils';
import { storageService } from '../services/storageService';

export interface ActiveRestTimer {
  active: boolean;
  secondsRemaining: number;
  totalDuration: number;
}

export interface ActiveWorkoutSession {
  planId?: string;
  planName: string;
  dayName: string;
  startTime: string; // ISO
  exercises: ExerciseLog[];
  currentExerciseIndex: number;
  restTimer: ActiveRestTimer;
}

interface WorkoutState {
  plans: WorkoutPlan[];
  activePlanId: string;
  selectedDayIndex: number;
  activeSession: ActiveWorkoutSession | null;
  workoutLogs: WorkoutLog[];
  exerciseLibrary: Exercise[];

  // Actions
  setActivePlan: (planId: string) => void;
  setSelectedDayIndex: (index: number) => void;
  startWorkoutSession: (planId?: string, dayIndex?: number) => void;
  startCustomWorkoutSession: (name: string, exercises: Exercise[]) => void;
  
  // Set Logging inside live session
  logSet: (exerciseIndex: number, setIndex: number, weightKg: number, reps: number, rpe?: number) => void;
  toggleSetCompleted: (exerciseIndex: number, setIndex: number) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  removeSetFromExercise: (exerciseIndex: number, setIndex: number) => void;
  addExerciseToSession: (exercise: Exercise) => void;
  removeExerciseFromSession: (exerciseIndex: number) => void;
  setCurrentExerciseIndex: (index: number) => void;

  // Rest Timer Controls
  startRestTimer: (seconds: number) => void;
  tickRestTimer: () => void;
  adjustRestTimer: (deltaSeconds: number) => void;
  cancelRestTimer: () => void;

  // Finish / Cancel
  finishWorkoutSession: (notes?: string, rating?: number) => WorkoutLog | null;
  cancelWorkoutSession: () => void;

  // Custom Plan Customization Actions
  swapExerciseInDay: (planId: string, dayIndex: number, exerciseIndex: number, newExercise: Exercise) => void;
  addExerciseToDay: (planId: string, dayIndex: number, exercise: Exercise) => void;
  removeExerciseFromDay: (planId: string, dayIndex: number, exerciseIndex: number) => void;
  updateExerciseInDay: (planId: string, dayIndex: number, exerciseIndex: number, updates: Partial<WorkoutExercise>) => void;
  reorderDaysInPlan: (planId: string, fromIndex: number, toIndex: number) => void;
  saveCustomPlan: (plan: WorkoutPlan) => void;
  deleteCustomPlan: (planId: string) => void;
  resetPlanToDefault: (planId?: string) => void;
  getProgressiveOverloadAdvice: (exerciseId: string) => { shouldIncrease: boolean; recommendation: string; targetWeight?: number };
}

const SEED_WORKOUT_LOGS: WorkoutLog[] = [
  {
    id: 'log-1',
    planId: 'plan-default-hypertrophy',
    planName: 'Default Muscle-Building Split (7-Day)',
    dayName: 'Monday — Chest & Triceps',
    date: '2026-08-21',
    startTime: '2026-08-21T09:00:00Z',
    endTime: '2026-08-21T10:15:00Z',
    durationSeconds: 4500,
    totalVolumeKg: 8420,
    totalSets: 20,
    totalReps: 195,
    caloriesBurnedEstimate: 420,
    rating: 5,
    prsAchieved: ['Barbell Bench Press (100 kg x 10 reps)'],
    exercisesPerformed: [
      {
        exerciseId: 'ex-chest-01',
        exerciseName: 'Barbell Bench Press',
        primaryMuscle: 'chest',
        oneRmEstimatedKg: 133,
        sets: [
          { setNumber: 1, weightKg: 80, reps: 10, rpe: 7, completed: true },
          { setNumber: 2, weightKg: 90, reps: 10, rpe: 8, completed: true },
          { setNumber: 3, weightKg: 95, reps: 10, rpe: 9, completed: true },
          { setNumber: 4, weightKg: 100, reps: 10, rpe: 9.5, completed: true },
        ],
      },
      {
        exerciseId: 'ex-chest-02',
        exerciseName: 'Incline Dumbbell Press',
        primaryMuscle: 'chest',
        sets: [
          { setNumber: 1, weightKg: 32, reps: 12, completed: true },
          { setNumber: 2, weightKg: 32, reps: 12, completed: true },
          { setNumber: 3, weightKg: 34, reps: 10, completed: true },
        ],
      },
    ],
  },
];

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  plans: DEFAULT_WORKOUT_TEMPLATES,
  activePlanId: 'plan-default-hypertrophy',
  selectedDayIndex: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1, // 0 = Mon
  activeSession: null,
  workoutLogs: SEED_WORKOUT_LOGS,
  exerciseLibrary: EXERCISES_DATABASE,

  setActivePlan: (planId: string) => {
    set({ activePlanId: planId });
  },

  setSelectedDayIndex: (index: number) => {
    set({ selectedDayIndex: index });
  },

  startWorkoutSession: (planId?: string, dayIndex?: number) => {
    const targetPlanId = planId || get().activePlanId;
    const plan = get().plans.find((p) => p.id === targetPlanId) || get().plans[0];
    const targetDayIndex = dayIndex !== undefined ? dayIndex : get().selectedDayIndex;
    const day = plan.days.find((d) => d.dayIndex === targetDayIndex) || plan.days[0];

    const exerciseLogs: ExerciseLog[] = day.exercises.map((we) => {
      const exerciseDef = get().exerciseLibrary.find((e) => e.id === we.exerciseId);
      const sets: SetLog[] = Array.from({ length: we.targetSets }, (_, i) => ({
        setNumber: i + 1,
        weightKg: 60,
        reps: parseInt(we.targetReps.split('-')[0], 10) || 10,
        completed: false,
        rpe: 8,
      }));

      return {
        exerciseId: we.exerciseId,
        exerciseName: we.customName || exerciseDef?.name || 'Exercise',
        primaryMuscle: exerciseDef?.primaryMuscle || 'chest',
        sets,
      };
    });

    const newSession: ActiveWorkoutSession = {
      planId: plan.id,
      planName: plan.name,
      dayName: day.name,
      startTime: new Date().toISOString(),
      exercises: exerciseLogs,
      currentExerciseIndex: 0,
      restTimer: {
        active: false,
        secondsRemaining: 0,
        totalDuration: 90,
      },
    };

    set({ activeSession: newSession });
  },

  startCustomWorkoutSession: (name: string, exercises: Exercise[]) => {
    const exerciseLogs: ExerciseLog[] = exercises.map((e) => ({
      exerciseId: e.id,
      exerciseName: e.name,
      primaryMuscle: e.primaryMuscle,
      sets: [
        { setNumber: 1, weightKg: 50, reps: 10, completed: false, rpe: 8 },
        { setNumber: 2, weightKg: 50, reps: 10, completed: false, rpe: 8 },
        { setNumber: 3, weightKg: 50, reps: 10, completed: false, rpe: 8 },
      ],
    }));

    set({
      activeSession: {
        planName: 'Custom Session',
        dayName: name,
        startTime: new Date().toISOString(),
        exercises: exerciseLogs,
        currentExerciseIndex: 0,
        restTimer: { active: false, secondsRemaining: 0, totalDuration: 90 },
      },
    });
  },

  logSet: (exerciseIndex, setIndex, weightKg, reps, rpe) => {
    const session = get().activeSession;
    if (!session) return;
    const updatedExercises = [...session.exercises];
    const targetEx = updatedExercises[exerciseIndex];
    if (!targetEx) return;

    targetEx.sets[setIndex] = {
      ...targetEx.sets[setIndex],
      weightKg,
      reps,
      rpe,
      completed: true,
    };

    targetEx.oneRmEstimatedKg = calculateEpley1RM(weightKg, reps);

    set({
      activeSession: {
        ...session,
        exercises: updatedExercises,
      },
    });
  },

  toggleSetCompleted: (exerciseIndex, setIndex) => {
    const session = get().activeSession;
    if (!session) return;
    const updatedExercises = [...session.exercises];
    const targetEx = updatedExercises[exerciseIndex];
    if (!targetEx) return;

    const currentCompleted = targetEx.sets[setIndex].completed;
    targetEx.sets[setIndex].completed = !currentCompleted;

    if (!currentCompleted) {
      targetEx.oneRmEstimatedKg = calculateEpley1RM(
        targetEx.sets[setIndex].weightKg,
        targetEx.sets[setIndex].reps
      );
      get().startRestTimer(90);
    }

    set({
      activeSession: {
        ...session,
        exercises: updatedExercises,
      },
    });
  },

  addSetToExercise: (exerciseIndex) => {
    const session = get().activeSession;
    if (!session) return;
    const updatedExercises = [...session.exercises];
    const targetEx = updatedExercises[exerciseIndex];
    if (!targetEx) return;

    const lastSet = targetEx.sets[targetEx.sets.length - 1];
    targetEx.sets.push({
      setNumber: targetEx.sets.length + 1,
      weightKg: lastSet ? lastSet.weightKg : 50,
      reps: lastSet ? lastSet.reps : 10,
      rpe: 8,
      completed: false,
    });

    set({ activeSession: { ...session, exercises: updatedExercises } });
  },

  removeSetFromExercise: (exerciseIndex, setIndex) => {
    const session = get().activeSession;
    if (!session) return;
    const updatedExercises = [...session.exercises];
    const targetEx = updatedExercises[exerciseIndex];
    if (!targetEx || targetEx.sets.length <= 1) return;

    targetEx.sets.splice(setIndex, 1);
    targetEx.sets.forEach((s, idx) => {
      s.setNumber = idx + 1;
    });

    set({ activeSession: { ...session, exercises: updatedExercises } });
  },

  addExerciseToSession: (exercise) => {
    const session = get().activeSession;
    if (!session) return;
    const newExLog: ExerciseLog = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      primaryMuscle: exercise.primaryMuscle,
      sets: [
        { setNumber: 1, weightKg: 50, reps: 10, completed: false, rpe: 8 },
        { setNumber: 2, weightKg: 50, reps: 10, completed: false, rpe: 8 },
        { setNumber: 3, weightKg: 50, reps: 10, completed: false, rpe: 8 },
      ],
    };

    set({
      activeSession: {
        ...session,
        exercises: [...session.exercises, newExLog],
      },
    });
  },

  removeExerciseFromSession: (exerciseIndex) => {
    const session = get().activeSession;
    if (!session) return;
    const updatedExercises = [...session.exercises];
    updatedExercises.splice(exerciseIndex, 1);
    set({
      activeSession: {
        ...session,
        exercises: updatedExercises,
        currentExerciseIndex: Math.max(0, exerciseIndex - 1),
      },
    });
  },

  setCurrentExerciseIndex: (index: number) => {
    const session = get().activeSession;
    if (!session) return;
    set({ activeSession: { ...session, currentExerciseIndex: index } });
  },

  startRestTimer: (seconds: number) => {
    const session = get().activeSession;
    if (!session) return;
    set({
      activeSession: {
        ...session,
        restTimer: {
          active: true,
          secondsRemaining: seconds,
          totalDuration: seconds,
        },
      },
    });
  },

  tickRestTimer: () => {
    const session = get().activeSession;
    if (!session || !session.restTimer.active) return;
    const current = session.restTimer.secondsRemaining;
    if (current <= 1) {
      set({
        activeSession: {
          ...session,
          restTimer: { ...session.restTimer, active: false, secondsRemaining: 0 },
        },
      });
    } else {
      set({
        activeSession: {
          ...session,
          restTimer: { ...session.restTimer, secondsRemaining: current - 1 },
        },
      });
    }
  },

  adjustRestTimer: (deltaSeconds: number) => {
    const session = get().activeSession;
    if (!session || !session.restTimer.active) return;
    const newRemaining = Math.max(0, session.restTimer.secondsRemaining + deltaSeconds);
    set({
      activeSession: {
        ...session,
        restTimer: {
          ...session.restTimer,
          secondsRemaining: newRemaining,
          totalDuration: Math.max(session.restTimer.totalDuration, newRemaining),
        },
      },
    });
  },

  cancelRestTimer: () => {
    const session = get().activeSession;
    if (!session) return;
    set({
      activeSession: {
        ...session,
        restTimer: { ...session.restTimer, active: false, secondsRemaining: 0 },
      },
    });
  },

  finishWorkoutSession: (notes, rating = 5) => {
    const session = get().activeSession;
    if (!session) return null;

    const endTime = new Date().toISOString();
    const startTime = new Date(session.startTime);
    const durationSeconds = Math.max(60, Math.round((new Date().getTime() - startTime.getTime()) / 1000));
    
    let totalSets = 0;
    let totalReps = 0;
    session.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          totalSets++;
          totalReps += s.reps;
        }
      });
    });

    const totalVolumeKg = calculateTotalVolumeKg(session.exercises);
    const caloriesBurnedEstimate = Math.round((durationSeconds / 60) * 7.5);

    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      planId: session.planId,
      planName: session.planName,
      dayName: session.dayName,
      date: getTodayDateString(),
      startTime: session.startTime,
      endTime,
      durationSeconds,
      exercisesPerformed: session.exercises,
      totalVolumeKg,
      totalSets,
      totalReps,
      caloriesBurnedEstimate,
      notes,
      rating,
    };

    const updatedLogs = [newLog, ...get().workoutLogs];
    set({
      workoutLogs: updatedLogs,
      activeSession: null,
    });
    storageService.setItem('fittrack_workout_logs', updatedLogs);
    return newLog;
  },

  cancelWorkoutSession: () => {
    set({ activeSession: null });
  },

  // ================= WORKOUT CUSTOMIZATION FEATURES =================
  swapExerciseInDay: (planId, dayIndex, exerciseIndex, newExercise) => {
    const plans = [...get().plans];
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const day = plan.days.find((d) => d.dayIndex === dayIndex);
    if (!day || !day.exercises[exerciseIndex]) return;

    day.exercises[exerciseIndex] = {
      ...day.exercises[exerciseIndex],
      exerciseId: newExercise.id,
      customName: newExercise.name,
    };

    set({ plans });
    storageService.setItem('fittrack_custom_plans', plans);
  },

  addExerciseToDay: (planId, dayIndex, exercise) => {
    const plans = [...get().plans];
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const day = plan.days.find((d) => d.dayIndex === dayIndex);
    if (!day) return;

    const newExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      customName: exercise.name,
      targetSets: 3,
      targetReps: '10-12',
      restSeconds: 60,
      notes: 'Added from Exercise Library',
    };

    day.exercises.push(newExercise);
    set({ plans });
    storageService.setItem('fittrack_custom_plans', plans);
  },

  removeExerciseFromDay: (planId, dayIndex, exerciseIndex) => {
    const plans = [...get().plans];
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const day = plan.days.find((d) => d.dayIndex === dayIndex);
    if (!day || day.exercises.length <= 1) return;

    day.exercises.splice(exerciseIndex, 1);
    set({ plans });
    storageService.setItem('fittrack_custom_plans', plans);
  },

  updateExerciseInDay: (planId, dayIndex, exerciseIndex, updates) => {
    const plans = [...get().plans];
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const day = plan.days.find((d) => d.dayIndex === dayIndex);
    if (!day || !day.exercises[exerciseIndex]) return;

    day.exercises[exerciseIndex] = {
      ...day.exercises[exerciseIndex],
      ...updates,
    };

    set({ plans });
    storageService.setItem('fittrack_custom_plans', plans);
  },

  reorderDaysInPlan: (planId, fromIndex, toIndex) => {
    const plans = [...get().plans];
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const [movedDay] = plan.days.splice(fromIndex, 1);
    plan.days.splice(toIndex, 0, movedDay);

    // Re-index days 0..6
    plan.days.forEach((d, idx) => {
      d.dayIndex = idx;
    });

    set({ plans });
    storageService.setItem('fittrack_custom_plans', plans);
  },

  saveCustomPlan: (plan) => {
    const existing = get().plans;
    const index = existing.findIndex((p) => p.id === plan.id);
    let updated: WorkoutPlan[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = plan;
    } else {
      updated = [...existing, { ...plan, isCustom: true }];
    }
    set({ plans: updated, activePlanId: plan.id });
    storageService.setItem('fittrack_custom_plans', updated);
  },

  deleteCustomPlan: (planId) => {
    const updated = get().plans.filter((p) => p.id !== planId);
    const fallbackId = updated[0]?.id || 'plan-default-hypertrophy';
    set({ plans: updated, activePlanId: fallbackId });
    storageService.setItem('fittrack_custom_plans', updated);
  },

  resetPlanToDefault: (planId) => {
    const targetId = planId || get().activePlanId;
    const defaultTemplate = DEFAULT_WORKOUT_TEMPLATES.find((t) => t.id === targetId) || DEFAULT_WORKOUT_TEMPLATES[0];
    
    const updatedPlans = get().plans.map((p) => (p.id === targetId ? JSON.parse(JSON.stringify(defaultTemplate)) : p));
    set({ plans: updatedPlans });
    storageService.setItem('fittrack_custom_plans', updatedPlans);
  },

  // Progressive Overload Engine: Analyzes recent session logs to calculate recommended weight/rep jump
  getProgressiveOverloadAdvice: (exerciseId: string) => {
    const logs = get().workoutLogs;
    for (const log of logs) {
      const exercisePerf = log.exercisesPerformed.find((e) => e.exerciseId === exerciseId);
      if (exercisePerf && exercisePerf.sets.length > 0) {
        const allCompleted = exercisePerf.sets.every((s) => s.completed);
        const topWeight = Math.max(...exercisePerf.sets.map((s) => s.weightKg));
        if (allCompleted) {
          const newTargetWeight = Math.round((topWeight * 1.035) * 2) / 2; // +3.5% rounded to nearest 0.5/1kg
          return {
            shouldIncrease: true,
            recommendation: `⚡ Overload Prompt: Hit all target reps at ${topWeight}kg last session! Increase to ${newTargetWeight}kg (+2.5-5%) or push for +1 rep today!`,
            targetWeight: newTargetWeight,
          };
        }
      }
    }

    return {
      shouldIncrease: false,
      recommendation: `Aim to hit your target rep range with clean form and controlled 3-second eccentric tempo.`,
    };
  },
}));
