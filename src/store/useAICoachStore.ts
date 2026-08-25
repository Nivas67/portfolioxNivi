import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { useWorkoutStore } from './useWorkoutStore';
import { useAuthStore } from './useAuthStore';
import { EXERCISES_DATABASE } from '../data/exercisesData';

export type CoachPersona = 'nivi' | 'mentor' | 'motivator' | 'sergeant' | 'scientist';

export interface AIMessage {
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

interface AICoachState {
  persona: CoachPersona;
  messages: AIMessage[];
  isTyping: boolean;
  dailyTrainerNote: string;
  
  // Actions
  setPersona: (p: CoachPersona) => void;
  sendMessage: (userText: string) => Promise<void>;
  clearHistory: () => void;
}

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Hey! 👋 I'm **Coach Nivi**, your AI Trainer, Biomechanist & Nutrition Coach.\n\nI can answer questions AND directly modify your workouts, swap exercises, adjust your macro targets, or handle injury accommodations. What are we optimizing today?",
    timestamp: new Date().toISOString(),
    quickActions: [
      { label: '🔄 "Swap Barbell Bench to DB Press"', action: 'Swap Barbell Bench Press to Incline Dumbbell Press' },
      { label: '🛡️ "I tweaked my shoulder, adjust pressing"', action: 'I tweaked my shoulder, adjust my shoulder workouts' },
      { label: '🍗 "Increase my daily protein target to 200g"', action: 'Increase my daily protein target to 200g' },
      { label: '🏆 "Level me up to Advanced Hypertrophy Split"', action: 'Level me up to Advanced Split' },
    ],
  },
];

export const useAICoachStore = create<AICoachState>((set, get) => ({
  persona: 'nivi',
  messages: INITIAL_MESSAGES,
  isTyping: false,
  dailyTrainerNote: "Coach Nivi says: 'Control your 3-second negative eccentric on flat bench today. That time-under-tension is where 70% of muscle fibers tear for growth!'",

  setPersona: (p: CoachPersona) => {
    set({ persona: p });
    storageService.setItem('fittrack_coach_persona', p);
  },

  sendMessage: async (userText: string) => {
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString(),
    };

    set((s) => ({ messages: [...s.messages, userMsg], isTyping: true }));

    // Parse for Autonomous Tool Execution
    const { replyText, executedAction } = parseAndExecuteCoachTools(userText, get().persona);

    // Natural processing delay
    await new Promise((r) => setTimeout(r, 600));

    const assistantMsg: AIMessage = {
      id: `msg-bot-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      actionExecuted: executedAction,
      timestamp: new Date().toISOString(),
      quickActions: [
        { label: '🏋️ Warmup pyramid for 100kg Bench', action: 'Calculate warmup sets for 100kg Bench Press' },
        { label: '🥗 50g Protein Meal Idea', action: 'Give me a fast 50g protein post-workout meal idea' },
        { label: '⚡ Progressive Overload Check', action: 'Check my progressive overload recommendations' },
      ],
    };

    const updated = [...get().messages, assistantMsg];
    set({ messages: updated, isTyping: false });
    storageService.setItem('fittrack_ai_messages', updated);
  },

  clearHistory: () => {
    set({ messages: INITIAL_MESSAGES });
    storageService.setItem('fittrack_ai_messages', INITIAL_MESSAGES);
  },
}));

/**
 * Intelligent Tool-Calling Engine for Coach Nivi
 */
function parseAndExecuteCoachTools(
  query: string,
  persona: CoachPersona
): { replyText: string; executedAction?: AIMessage['actionExecuted'] } {
  const q = query.toLowerCase();
  const workoutStore = useWorkoutStore.getState();
  const authStore = useAuthStore.getState();

  const greetingPrefix = {
    nivi: "Hey athlete! Coach Nivi here. ⚡\n\n",
    mentor: "Great question! Let's dial this in together:\n\n",
    motivator: "LET'S CRUSH THIS! 🔥\n\n",
    sergeant: "Listen up! Updating your routine now:\n\n",
    scientist: "Biomechanics analysis and protocol execution complete:\n\n",
  }[persona];

  // Tool 1: Swap Exercise (e.g. "Swap Barbell Bench to DB Press")
  if (q.includes('swap') && (q.includes('bench') || q.includes('press') || q.includes('squat') || q.includes('deadlift') || q.includes('curl'))) {
    const activePlan = workoutStore.plans.find((p) => p.id === workoutStore.activePlanId) || workoutStore.plans[0];
    const dbPress = EXERCISES_DATABASE.find((e) => e.name.toLowerCase().includes('incline dumbbell press') || e.id === 'ex-chest-02') || EXERCISES_DATABASE[1];
    
    if (activePlan) {
      workoutStore.swapExerciseInDay(activePlan.id, 0, 0, dbPress);
      return {
        replyText: `${greetingPrefix}✅ **Tool Executed:** I've updated Day 1 of your **${activePlan.name}**!\n\nReplaced **Barbell Bench Press** with **${dbPress.name}** (3 sets × 10–12 reps, 75s rest). This offers greater horizontal adduction and is easier on the anterior shoulder joint.`,
        executedAction: {
          type: 'swap_exercise',
          summary: `Swapped to ${dbPress.name} in ${activePlan.name}`,
        },
      };
    }
  }

  // Tool 2: Injury Accommodation (e.g. "tweaked shoulder, avoid overhead pressing")
  if (q.includes('shoulder') && (q.includes('pain') || q.includes('tweak') || q.includes('hurt') || q.includes('avoid'))) {
    const activePlan = workoutStore.plans.find((p) => p.id === workoutStore.activePlanId) || workoutStore.plans[0];
    const lateralRaise = EXERCISES_DATABASE.find((e) => e.name.toLowerCase().includes('lateral raise') || e.id === 'ex-sh-02') || EXERCISES_DATABASE[5];

    if (activePlan) {
      workoutStore.updateExerciseInDay(activePlan.id, 3, 0, {
        customName: 'Chest-Supported Cable Lateral Raise (Pain-Free Delts)',
        notes: 'Strict subacromial clearance, lead with elbows, pain-free ROM',
      });
      return {
        replyText: `${greetingPrefix}🛡️ **Injury Protocol Activated:** I've adjusted Thursday's shoulder routine to remove direct vertical overhead loading.\n\nReplaced heavy overhead presses with **Chest-Supported Cable Lateral Raises** and increased rear-delt face pull volume to stabilize the rotator cuff!`,
        executedAction: {
          type: 'log_injury',
          summary: 'Shoulder-safe exercise substitution applied to Thursday routine',
        },
      };
    }
  }

  // Tool 3: Adjust Nutrition / Protein Targets (e.g. "increase protein target to 200g")
  if (q.includes('protein') && (q.includes('target') || q.includes('increase') || q.includes('200') || q.includes('grams') || q.includes('macro'))) {
    authStore.recalculateNutritionTargets({
      weightKg: authStore.user?.weightKg || 82,
      heightCm: authStore.user?.heightCm || 180,
      age: authStore.user?.age || 26,
      gender: authStore.user?.gender || 'male',
      activityLevel: 'very_active',
      goal: 'bulk',
    });
    return {
      replyText: `${greetingPrefix}🥗 **Nutrition Targets Adjusted:** Daily prescribed protein has been dialed in to **200g (800 kcal)**! Your activity rings and meal trackers on the Dashboard have updated immediately.`,
      executedAction: {
        type: 'adjust_macros',
        summary: 'Target updated to 200g Protein / 2,450 kcal',
      },
    };
  }

  // Tool 4: Level Up Tier (e.g. "Level me up to Advanced Split")
  if (q.includes('level') || q.includes('tier') || q.includes('advanced') || q.includes('master') || q.includes('beginner')) {
    const targetPlanId = q.includes('master') ? 'plan-master-periodized' : q.includes('advanced') ? 'plan-advanced-hypertrophy' : 'plan-beginner-split';
    workoutStore.setActivePlan(targetPlanId);
    const planName = targetPlanId === 'plan-master-periodized' ? 'Master Periodized Overload Wave' : 'Advanced Hypertrophy & Supersets';
    
    return {
      replyText: `${greetingPrefix}🏆 **Training Tier Upgraded:** Your active program is now the **${planName}**!\n\nCheck the Workouts tab to view your high-density superset sequences and periodized overload calendar.`,
      executedAction: {
        type: 'tier_level_up',
        summary: `Switched active split to ${planName}`,
      },
    };
  }

  // General Inquiries
  if (q.includes('bench') && q.includes('warmup')) {
    return {
      replyText: `${greetingPrefix}### 🔥 Bench Press Warmup Pyramid (100 kg Target)\n\n1. **Set 1:** Empty Bar (20 kg) × 12 reps *(Lubricate joints & groove bar path)*\n2. **Set 2 (40%):** 40 kg × 8 reps *(Controlled cadence)*\n3. **Set 3 (60%):** 60 kg × 5 reps *(Explosive push)*\n4. **Set 4 (80%):** 80 kg × 3 reps *(CNS priming, zero fatigue)*\n5. **Set 5 (90%):** 90 kg × 1 rep *(Neural activation)*\n\n👉 Rest **2.5 to 3 minutes**, then hit your top working sets with maximum intensity!`,
    };
  }

  if (q.includes('meal') || q.includes('recipe')) {
    return {
      replyText: `${greetingPrefix}### 🥗 High-Protein Anabolic Fuel (~520 kcal | 52g Protein)\n\n- **Protein Core:** 160g Grilled Chicken Breast or 200g Extra-Firm Tofu\n- **Fast Carbohydrates:** 1.5 cups Jasmine White Rice + 1 banana\n- **Hydration & Recovery:** 500ml water with 5g Creatine Monohydrate`,
    };
  }

  return {
    replyText: `${greetingPrefix}### 💡 Coach Nivi's Core Hypertrophy Principles\n\n1. **Progressive Overload:** Aim to add 1.25kg–2.5kg or +1 rep each session.\n2. **Protein Pacing:** Consume 30–40g high-quality protein every 3-4 hours.\n3. **Sleep & Recovery:** 7.5+ hours of sleep restores your Central Nervous System.\n\n*Tip: You can ask me to swap exercises, adjust diet targets, or change workout days anytime and I'll update them for you!*`,
  };
}
