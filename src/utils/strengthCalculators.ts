/**
 * Strength and Volume Calculation Utilities
 */

// Epley Formula for 1RM: 1RM = Weight * (1 + Reps / 30)
export function calculateEpley1RM(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  return Math.round(weightKg * (1 + reps / 30));
}

// Brzycki Formula: 1RM = Weight * (36 / (37 - Reps))
export function calculateBrzycki1RM(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  if (reps >= 37) return weightKg * 2.5;
  return Math.round(weightKg * (36 / (37 - reps)));
}

// Calculate target weight percentage for given rep target based on 1RM
export function getWeightForReps(oneRmKg: number, targetReps: number): number {
  if (targetReps <= 0 || oneRmKg <= 0) return 0;
  if (targetReps === 1) return oneRmKg;
  const estimated = oneRmKg / (1 + targetReps / 30);
  // Round to nearest 2.5kg (standard gym plate increment)
  return Math.round(estimated / 2.5) * 2.5;
}

// Calculate Total Workout Volume (Tonnage) = Sum of (Weight * Reps) for completed sets
export function calculateTotalVolumeKg(
  exercises: { sets: { weightKg: number; reps: number; completed: boolean; isWarmup?: boolean }[] }[]
): number {
  return exercises.reduce((total, ex) => {
    const exerciseVol = ex.sets.reduce((setTotal, set) => {
      if (set.completed && !set.isWarmup) {
        return setTotal + set.weightKg * set.reps;
      }
      return setTotal;
    }, 0);
    return total + exerciseVol;
  }, 0);
}

// Suggest next weight progression
export function getProgressionSuggestion(
  currentWeightKg: number,
  completedReps: number,
  targetRepRangeMax: number,
  exerciseType: 'compound' | 'isolation' = 'compound'
): { shouldIncrease: boolean; suggestedWeightKg: number; message: string } {
  if (completedReps >= targetRepRangeMax) {
    const increment = exerciseType === 'compound' ? 2.5 : 1.25;
    const newWeight = Math.round((currentWeightKg + increment) * 10) / 10;
    return {
      shouldIncrease: true,
      suggestedWeightKg: newWeight,
      message: `Great job hitting ${completedReps} reps! Increase weight to ${newWeight} kg next session.`,
    };
  }
  return {
    shouldIncrease: false,
    suggestedWeightKg: currentWeightKg,
    message: `Stay at ${currentWeightKg} kg until you hit ${targetRepRangeMax} reps with good form.`,
  };
}
