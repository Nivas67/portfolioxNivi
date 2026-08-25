import { create } from 'zustand';
import { UserProfile, NutritionTargets, UserGoal, ActivityLevel, Gender, UnitSystem, EquipmentAccess, ExperienceLevel, TrainingTier } from '../types';
import { calculateNutritionTargets } from '../utils/bmrCalculator';
import { storageService } from '../services/storageService';

interface AuthState {
  user: UserProfile | null;
  nutritionTargets: NutritionTargets | null;
  isLoading: boolean;
  
  // Actions
  loginDemoUser: () => void;
  login: (email: string, name: string, phone?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  calculateAndSetTargets: () => void;
  recalculateNutritionTargets: (customParams?: {
    weightKg: number;
    heightCm: number;
    age: number;
    gender: Gender;
    activityLevel: ActivityLevel;
    goal: UserGoal;
  }) => void;
  completeOnboarding: (data: {
    name: string;
    age: number;
    gender: Gender;
    heightCm: number;
    weightKg: number;
    activityLevel: ActivityLevel;
    goal: UserGoal;
    experience: ExperienceLevel;
    equipmentAccess: EquipmentAccess;
    daysAvailable: number;
  }) => void;
  toggleUnitSystem: () => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'user-demo-1',
  name: 'Alex Hunter',
  email: 'alex.hunter@example.com',
  phone: '+91 98765 43210',
  isPhoneVerified: true,
  age: 26,
  gender: 'male',
  heightCm: 180,
  weightKg: 82.5,
  activityLevel: 'very_active',
  goal: 'cut',
  experience: 'intermediate',
  trainingTier: 'intermediate',
  equipmentAccess: 'full_gym',
  daysAvailable: 5,
  unitSystem: 'metric',
  onboarded: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  joinedAt: '2026-08-01T00:00:00Z',
};

const DEFAULT_TARGETS: NutritionTargets = calculateNutritionTargets(
  DEFAULT_DEMO_USER.weightKg,
  DEFAULT_DEMO_USER.heightCm,
  DEFAULT_DEMO_USER.age,
  DEFAULT_DEMO_USER.gender,
  DEFAULT_DEMO_USER.activityLevel,
  DEFAULT_DEMO_USER.goal
);

export const useAuthStore = create<AuthState>((set, get) => ({
  user: DEFAULT_DEMO_USER,
  nutritionTargets: DEFAULT_TARGETS,
  isLoading: false,

  loginDemoUser: () => {
    set({
      user: DEFAULT_DEMO_USER,
      nutritionTargets: DEFAULT_TARGETS,
    });
    storageService.setItem('fittrack_user', DEFAULT_DEMO_USER);
  },

  login: (email: string, name: string, phone?: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_DEMO_USER,
      id: `user-${Date.now()}`,
      email,
      phone: phone || (get().user?.phone || '+91 98765 43210'),
      isPhoneVerified: !!phone,
      name: name || (email.includes('@') ? email.split('@')[0] : 'Athlete'),
      onboarded: false,
    };
    set({ user: newUser });
    storageService.setItem('fittrack_user', newUser);
  },

  logout: () => {
    set({ user: null, nutritionTargets: null });
    storageService.removeItem('fittrack_user');
  },

  updateProfile: (updates: Partial<UserProfile>) => {
    const currentUser = get().user;
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    const targets = calculateNutritionTargets(
      updatedUser.weightKg,
      updatedUser.heightCm,
      updatedUser.age,
      updatedUser.gender,
      updatedUser.activityLevel,
      updatedUser.goal
    );
    set({ user: updatedUser, nutritionTargets: targets });
    storageService.setItem('fittrack_user', updatedUser);
  },

  calculateAndSetTargets: () => {
    const user = get().user;
    if (!user) return;
    const targets = calculateNutritionTargets(
      user.weightKg,
      user.heightCm,
      user.age,
      user.gender,
      user.activityLevel,
      user.goal
    );
    set({ nutritionTargets: targets });
  },

  recalculateNutritionTargets: (customParams) => {
    const user = get().user || DEFAULT_DEMO_USER;
    const params = customParams || user;
    const targets = calculateNutritionTargets(
      params.weightKg,
      params.heightCm,
      params.age,
      params.gender,
      params.activityLevel,
      params.goal
    );
    set({ nutritionTargets: targets });
  },

  completeOnboarding: (data) => {
    const currentUser = get().user || DEFAULT_DEMO_USER;
    const updatedUser: UserProfile = {
      ...currentUser,
      ...data,
      trainingTier: data.experience as TrainingTier,
      onboarded: true,
    };
    const targets = calculateNutritionTargets(
      data.weightKg,
      data.heightCm,
      data.age,
      data.gender,
      data.activityLevel,
      data.goal
    );
    set({ user: updatedUser, nutritionTargets: targets });
    storageService.setItem('fittrack_user', updatedUser);
  },

  toggleUnitSystem: () => {
    const currentUser = get().user;
    if (!currentUser) return;
    const newUnit: UnitSystem = currentUser.unitSystem === 'metric' ? 'imperial' : 'metric';
    const updated = { ...currentUser, unitSystem: newUnit };
    set({ user: updated });
    storageService.setItem('fittrack_user', updated);
  },
}));
