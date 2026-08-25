import { ActivityLevel, Gender, NutritionTargets, UserGoal } from '../types';

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  if (gender === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
  } else {
    // female / other
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  }
}

export function getActivityMultiplier(level: ActivityLevel): number {
  switch (level) {
    case 'sedentary':
      return 1.2;
    case 'light':
      return 1.375;
    case 'moderate':
      return 1.55;
    case 'very_active':
      return 1.725;
    case 'extra_active':
      return 1.9;
    default:
      return 1.4;
  }
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * getActivityMultiplier(activityLevel));
}

export function calculateNutritionTargets(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  goal: UserGoal
): NutritionTargets {
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);

  let targetCalories = tdee;
  let proteinMultiplier = 2.0; // g per kg

  switch (goal) {
    case 'cut':
      targetCalories = Math.round(tdee * 0.80); // 20% deficit
      proteinMultiplier = 2.2; // higher protein to preserve lean mass in cut
      break;
    case 'bulk':
      targetCalories = Math.round(tdee * 1.12); // 12% surplus
      proteinMultiplier = 2.0;
      break;
    case 'recomp':
      targetCalories = Math.round(tdee * 0.92); // slight deficit
      proteinMultiplier = 2.3;
      break;
    case 'endurance':
      targetCalories = Math.round(tdee * 1.05);
      proteinMultiplier = 1.8;
      break;
    case 'maintain':
    default:
      targetCalories = tdee;
      proteinMultiplier = 2.0;
      break;
  }

  // Protein grams
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinKcal = proteinGrams * 4;

  // Fat grams (~25% of calories or ~0.9g per kg)
  const fatCalories = Math.round(targetCalories * 0.25);
  const fatGrams = Math.round(fatCalories / 9);
  const actualFatKcal = fatGrams * 9;

  // Carbs remainder
  const remainingKcal = Math.max(0, targetCalories - proteinKcal - actualFatKcal);
  const carbsGrams = Math.round(remainingKcal / 4);

  // Water intake: ~38 ml per kg + 500ml for training
  const waterMl = Math.round(weightKg * 38 + 500);

  return {
    bmr,
    tdee,
    targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    waterMl,
  };
}
