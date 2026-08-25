export type Gender = 'male' | 'female' | 'other';
export type UserGoal = 'cut' | 'bulk' | 'maintain' | 'recomp' | 'endurance';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'master';
export type TrainingTier = 'beginner' | 'intermediate' | 'advanced' | 'master';
export type EquipmentAccess = 'full_gym' | 'home_dumbbells' | 'calisthenics' | 'minimal';
export type UnitSystem = 'metric' | 'imperial';
export type ThemeMode = 'dark' | 'light' | 'system';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isPhoneVerified?: boolean;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  bodyType?: 'ectomorph' | 'mesomorph' | 'endomorph';
  activityLevel: ActivityLevel;
  goal: UserGoal;
  experience: ExperienceLevel;
  trainingTier?: TrainingTier;
  equipmentAccess: EquipmentAccess;
  daysAvailable: number;
  unitSystem: UnitSystem;
  themePreference?: ThemeMode;
  defaultMusicService?: MusicService;
  onboarded: boolean;
  avatarUrl?: string;
  joinedAt: string;
}

export interface NutritionTargets {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  waterMl: number;
}

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'quads' 
  | 'hamstrings' 
  | 'calves' 
  | 'glutes' 
  | 'abs' 
  | 'cardio' 
  | 'full_body';

export type EquipmentType = 
  | 'barbell' 
  | 'dumbbell' 
  | 'cable' 
  | 'machine' 
  | 'bodyweight' 
  | 'smith_machine' 
  | 'band' 
  | 'kettlebell' 
  | 'cardio';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'master';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  instructions: string[];
  tips?: string[];
  videoUrl?: string;
  thumbnail?: string;
  category: 'strength' | 'hypertrophy' | 'cardio' | 'mobility';
}

export interface WorkoutExercise {
  exerciseId: string;
  customName?: string;
  targetSets: number;
  targetReps: string; // e.g. "8-10" or "5"
  restSeconds: number;
  intensityTechnique?: 'straight_set' | 'drop_set' | 'rest_pause' | 'superset';
  notes?: string;
}

export interface WorkoutDay {
  id: string;
  dayIndex: number; // 0-6 (Mon-Sun)
  name: string; // "Monday — Chest & Triceps", "Rest Day", etc.
  isRestDay: boolean;
  targetMuscleGroups: MuscleGroup[];
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  tier?: TrainingTier;
  difficulty?: DifficultyLevel;
  splitType: 'ppl' | 'upper_lower' | 'full_body' | 'arnold' | 'body_part_hypertrophy' | 'custom' | 'bro_split';
  daysPerWeek: number;
  isCustom?: boolean;
  days: WorkoutDay[];
  currentBlockWeek?: number;
  totalBlockWeeks?: number;
  isDeloadWeek?: boolean;
}

export interface SetLog {
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe?: number;
  completed: boolean;
  targetReps?: number;
  previousBest?: { weight?: number; weightKg?: number; reps: number };
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  primaryMuscle: MuscleGroup;
  sets: SetLog[];
  oneRmEstimatedKg?: number;
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  planId?: string;
  planName: string;
  dayName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // ISO
  endTime: string; // ISO
  durationSeconds: number;
  exercisesPerformed: ExerciseLog[];
  totalVolumeKg: number;
  totalSets: number;
  totalReps: number;
  caloriesBurnedEstimate: number;
  notes?: string;
  rating?: number; // 1-5
  prsAchieved?: string[];
}

// ---------------- MUSIC INTEGRATION ----------------
export type MusicService = 'spotify' | 'apple_music' | 'amazon_music';

export interface WorkoutPlaylist {
  id: string;
  title: string;
  subtitle: string;
  bpm: number;
  genre: string;
  workoutFocus: 'chest' | 'heavy_compound' | 'cardio' | 'arm_pump' | 'recovery' | 'high_intensity';
  coverEmoji: string;
  gradientColors: [string, string];
  deepLinks: {
    spotify: string;
    spotifyWeb: string;
    appleMusic: string;
    amazonMusic: string;
  };
}

// ---------------- PROGRESS PHOTOS & METRICS ----------------
export interface PhotoLog {
  id: string;
  date: string; // YYYY-MM-DD
  photoUri: string;
  weightKgAtTime?: number;
  caption?: string;
  bodyFatPercent?: number;
  type?: 'front' | 'side' | 'back';
  hasSilhouetteAlignment?: boolean;
}

export type ProgressPhotoEntry = PhotoLog;

export interface BodyMeasurementLog {
  id: string;
  date: string;
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  leftArmCm?: number;
  rightArmCm?: number;
  leftThighCm?: number;
  rightThighCm?: number;
  calvesCm?: number;
}

export type BodyMeasurementsEntry = BodyMeasurementLog;

export interface WeightLog {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  bodyFatPercentage?: number;
  notes?: string;
  note?: string;
}

export type BodyWeightEntry = WeightLog;

export interface OneRmRecord {
  id?: string;
  exerciseId: string;
  exerciseName: string;
  oneRmKg?: number;
  estimatedOneRmKg?: number;
  weightUsedKg?: number;
  repsAchieved?: number;
  date: string;
  bodyweightKg?: number;
}

// ---------------- DIET & NUTRITION ----------------
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  servingSize?: number;
  servingUnit?: string;
  calories: number;
  proteinGrams?: number;
  protein?: number;
  carbsGrams?: number;
  carbs?: number;
  fatGrams?: number;
  fat?: number;
  fiberGrams?: number;
  fiber?: number;
  barcode?: string;
  isCustom?: boolean;
}

export interface LoggedFoodItem {
  id: string;
  foodId?: string;
  foodName?: string;
  name?: string;
  brand?: string;
  servings?: number;
  quantity?: number;
  servingUnit?: string;
  servingSize?: number;
  calories: number;
  proteinGrams?: number;
  protein?: number;
  carbsGrams?: number;
  carbs?: number;
  fatGrams?: number;
  fat?: number;
  fiberGrams?: number;
  fiber?: number;
  loggedAt?: string;
}

export interface DailyDietLog {
  date: string;
  breakfast: LoggedFoodItem[];
  lunch: LoggedFoodItem[];
  dinner: LoggedFoodItem[];
  snack: LoggedFoodItem[];
  waterIntakeMl: number;
}

export type DailyMealLogs = DailyDietLog;

// ---------------- PRECISION WEARABLES & HEALTH CONNECT ----------------
export type WearableSource = 'health_connect' | 'healthkit' | 'fitbit';

export interface WearableDailyData {
  date: string; // YYYY-MM-DD
  source: WearableSource;
  steps: number;
  activeCalories: number;
  totalCalories?: number;
  totalCaloriesBurned?: number;
  restingCalories?: number;
  distanceKm?: number;
  restingHeartRate: number;
  heartRateResting?: number;
  heartRateAvg?: number;
  currentHeartRate?: number;
  hrvMs?: number;
  sleepMinutes: number;
  deepSleepMinutes?: number;
  recoveryScore?: number;
  isConnected?: boolean;
  lastSyncedAt: string;
}

export interface WearableDeviceState {
  isConnected: boolean;
  isSyncing: boolean;
  batteryPercent?: number;
  lastSyncTime?: string;
  source: WearableSource;
}

// ---------------- AI COACH & TOOL CALLING ----------------
export interface AICoachMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionExecuted?: {
    type: 'swap_exercise' | 'reorder_days' | 'update_plan' | 'adjust_macros' | 'log_injury' | 'tier_level_up';
    summary: string;
  };
  quickActions?: { label: string; action: string }[];
}

// ---------------- GAMIFICATION ----------------
export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalWorkoutsLogged?: number;
  weeklyAdherencePercentage?: number;
}

export type StreakInfo = StreakState;

export interface DailyDisciplineChecklist {
  date?: string;
  workoutLogged?: boolean;
  workoutCompleted?: boolean;
  proteinTargetMet?: boolean;
  dietLogged?: boolean;
  caloriesTargetMet?: boolean;
  waterTargetMet?: boolean;
  waterGoalMet?: boolean;
  stepsTargetMet?: boolean;
  stepsGoalMet?: boolean;
  sleepTargetMet?: boolean;
  sleepGoalMet?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  name?: string;
  description?: string;
  requirementText?: string;
  category?: 'streak' | 'strength' | 'volume' | 'nutrition' | 'workouts' | 'discipline' | 'milestones' | 'wearable' | 'workout';
  icon?: string;
  iconName?: string;
  unlockedAt?: string;
  unlocked?: boolean;
  progress: number; // 0 to 1
}

export type Badge = AchievementBadge;
