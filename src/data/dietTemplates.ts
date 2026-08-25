import { FoodItem } from '../types';

export interface DietTemplate {
  id: string;
  name: string;
  description: string;
  category: 'cut' | 'bulk' | 'maintain' | 'vegan' | 'keto';
  targetCalories: number;
  macros: { protein: number; carbs: number; fat: number };
  sampleMeals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snack: string[];
  };
}

export const DIET_TEMPLATES: DietTemplate[] = [
  {
    id: 'diet-high-protein-cut',
    name: 'High-Protein Shred (Fat Loss)',
    description: 'Aggressive fat reduction while protecting and preserving lean muscle mass.',
    category: 'cut',
    targetCalories: 2000,
    macros: { protein: 190, carbs: 160, fat: 50 },
    sampleMeals: {
      breakfast: ['3 Whole Eggs + 3 Egg Whites Scramble', '1 Cup Rolled Oats with Berries', 'Black Coffee'],
      lunch: ['200g Grilled Chicken Breast', '150g Jasmine Rice', 'Steamed Broccoli & Green Beans'],
      dinner: ['200g Lean Sirloin Steak or Salmon', '200g Roasted Sweet Potato', 'Large Leafy Green Salad'],
      snack: ['1 Scoop Whey Isolate with Almond Milk', '150g 0% Greek Yogurt with Blueberries']
    }
  },
  {
    id: 'diet-lean-bulk',
    name: 'Clean Hypertrophy (Lean Bulk)',
    description: 'Controlled caloric surplus designed for maximum muscle hypertrophy with minimal fat gain.',
    category: 'bulk',
    targetCalories: 2850,
    macros: { protein: 195, carbs: 340, fat: 75 },
    sampleMeals: {
      breakfast: ['4 Eggs + 2 slices Sourdough Toast', '1 Banana with 2 tbsp Natural Peanut Butter', 'Whole Milk'],
      lunch: ['220g Ground Turkey 93/7', '250g Brown Rice', 'Roasted Zucchini & Bell Peppers'],
      dinner: ['250g Chicken Breast', '300g White Potatoes', 'Avocado Oil dressing over asparagus'],
      snack: ['Mass Gain Shake (Whey, Oats, Banana, Peanut Butter)', 'Handful of Raw Almonds']
    }
  },
  {
    id: 'diet-maintenance-recomp',
    name: 'Metabolic Recomp & Maintenance',
    description: 'Fuel steady gym performance, recovery, and body recomposition.',
    category: 'maintain',
    targetCalories: 2400,
    macros: { protein: 175, carbs: 250, fat: 65 },
    sampleMeals: {
      breakfast: ['Greek Yogurt Parfait with Granola, Chia Seeds, and Honey', '2 Boiled Eggs'],
      lunch: ['Tuna or Salmon Poke Bowl with Quinoa, Edamame, and Cucumber'],
      dinner: ['Grilled Chicken Fajitas with Corn Tortillas, Pico de Gallo & Guacamole'],
      snack: ['Protein Bar (20g protein)', 'Apple with Peanut Butter']
    }
  },
  {
    id: 'diet-plant-based',
    name: 'Plant-Based Muscle',
    description: 'High-protein 100% vegetarian / vegan meal plan with complete amino acid profiles.',
    category: 'vegan',
    targetCalories: 2300,
    macros: { protein: 160, carbs: 270, fat: 60 },
    sampleMeals: {
      breakfast: ['Tofu Scramble with Spinach & Turmeric', '2 Slices Multigrain Toast + Avocado'],
      lunch: ['Lentil & Chickpea Curry with Basmati Rice and Steamed Greens'],
      dinner: ['Tempeh Stir-fry with Soba Noodles, Edamame, and Peanut Sauce'],
      snack: ['Plant Protein Shake (Pea/Rice Blend)', 'Pumpkin Seeds & Dried Cranberries']
    }
  }
];

export const POPULAR_FOODS_SEED: FoodItem[] = [
  { id: 'f-01', name: 'Chicken Breast (Boneless, Skinless)', brand: 'Generic', servingSize: 100, servingUnit: 'g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'f-02', name: 'Eggs (Large Whole)', brand: 'Generic', servingSize: 1, servingUnit: 'piece', calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
  { id: 'f-03', name: 'Egg Whites', brand: 'Generic', servingSize: 100, servingUnit: 'g', calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
  { id: 'f-04', name: 'Greek Yogurt 0% Fat', brand: 'Chobani / Fage', servingSize: 150, servingUnit: 'g', calories: 90, protein: 16, carbs: 5, fat: 0 },
  { id: 'f-05', name: 'Rolled Oats (Raw)', brand: 'Quaker', servingSize: 50, servingUnit: 'g', calories: 190, protein: 6.5, carbs: 34, fat: 3.5, fiber: 5 },
  { id: 'f-06', name: 'Jasmine White Rice (Cooked)', brand: 'Generic', servingSize: 150, servingUnit: 'g', calories: 195, protein: 4, carbs: 43, fat: 0.4 },
  { id: 'f-07', name: 'Sweet Potato (Cooked)', brand: 'Generic', servingSize: 150, servingUnit: 'g', calories: 135, protein: 3, carbs: 31, fat: 0.2, fiber: 4.5 },
  { id: 'f-08', name: 'Whey Protein Isolate (100%)', brand: 'Optimum Nutrition', servingSize: 30, servingUnit: 'g', calories: 120, protein: 24, carbs: 2, fat: 1 },
  { id: 'f-09', name: 'Peanut Butter (Natural)', brand: 'Generic', servingSize: 32, servingUnit: 'g', calories: 190, protein: 8, carbs: 7, fat: 16 },
  { id: 'f-10', name: 'Atlantic Salmon Fillet', brand: 'Generic', servingSize: 150, servingUnit: 'g', calories: 310, protein: 34, carbs: 0, fat: 18 },
  { id: 'f-11', name: 'Banana (Medium)', brand: 'Generic', servingSize: 118, servingUnit: 'g', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, fiber: 3.1 },
  { id: 'f-12', name: 'Lean Ground Beef 90/10', brand: 'Generic', servingSize: 150, servingUnit: 'g', calories: 260, protein: 30, carbs: 0, fat: 15 },
  { id: 'f-13', name: 'Avocado', brand: 'Generic', servingSize: 100, servingUnit: 'g', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7 },
  { id: 'f-14', name: 'Almond Milk (Unsweetened)', brand: 'Almond Breeze', servingSize: 240, servingUnit: 'ml', calories: 30, protein: 1, carbs: 1, fat: 2.5 },
  { id: 'f-15', name: 'Broccoli (Steamed)', brand: 'Generic', servingSize: 100, servingUnit: 'g', calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 2.6 },
];
