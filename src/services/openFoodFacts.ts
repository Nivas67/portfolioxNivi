import { FoodItem } from '../types';
import { POPULAR_FOODS_SEED } from '../data/dietTemplates';

export const openFoodFactsService = {
  /**
   * Search Open Food Facts free database
   */
  async searchFoods(query: string): Promise<FoodItem[]> {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return POPULAR_FOODS_SEED;
    }

    // Filter local seed foods first for instant response
    const localMatches = POPULAR_FOODS_SEED.filter(
      (f) =>
        f.name.toLowerCase().includes(trimmed) ||
        (f.brand && f.brand.toLowerCase().includes(trimmed))
    );

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        trimmed
      )}&search_simple=1&action=process&json=1&page_size=20`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'FitTrackGymPlannerApp/1.0 (fitness-planner@example.com)',
        },
      });

      if (!response.ok) {
        return localMatches.length > 0 ? localMatches : POPULAR_FOODS_SEED;
      }

      const data = await response.json();
      if (!data.products || !Array.isArray(data.products)) {
        return localMatches;
      }

      const remoteItems: FoodItem[] = data.products
        .filter((p: any) => p.product_name && p.nutriments)
        .map((p: any) => {
          const nut = p.nutriments || {};
          const calories = Math.round(
            nut['energy-kcal_100g'] || nut['energy-kcal'] || (nut.energy_100g ? nut.energy_100g / 4.184 : 0) || 0
          );
          const protein = Math.round((nut.proteins_100g || nut.proteins || 0) * 10) / 10;
          const carbs = Math.round((nut.carbohydrates_100g || nut.carbohydrates || 0) * 10) / 10;
          const fat = Math.round((nut.fat_100g || nut.fat || 0) * 10) / 10;
          const fiber = nut.fiber_100g ? Math.round(nut.fiber_100g * 10) / 10 : undefined;

          return {
            id: `off-${p.id || p.code || Math.random().toString(36).substring(7)}`,
            name: p.product_name || 'Unknown Food Item',
            brand: p.brands || p.brand_owner || 'Generic',
            servingSize: 100,
            servingUnit: 'g',
            calories,
            protein,
            carbs,
            fat,
            fiber,
            barcode: p.code,
          };
        })
        .filter((item: FoodItem) => item.calories > 0 || (item.proteinGrams || item.protein || 0) > 0);

      // Combine local + remote, deduplicating by name
      const combined = [...localMatches];
      for (const remote of remoteItems) {
        if (!combined.some((c) => c.name.toLowerCase() === remote.name.toLowerCase())) {
          combined.push(remote);
        }
      }

      return combined.length > 0 ? combined : POPULAR_FOODS_SEED;
    } catch (e) {
      console.warn('[OpenFoodFacts] Network search error, returning fallback:', e);
      return localMatches.length > 0 ? localMatches : POPULAR_FOODS_SEED;
    }
  },

  /**
   * Lookup food item by Barcode
   */
  async getByBarcode(barcode: string): Promise<FoodItem | null> {
    try {
      const url = `https://world.openfoodfacts.org/api/v0/product/${barcode.trim()}.json`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'FitTrackGymPlannerApp/1.0',
        },
      });

      if (!response.ok) return null;

      const data = await response.json();
      if (data.status !== 1 || !data.product) {
        return null;
      }

      const p = data.product;
      const nut = p.nutriments || {};
      const calories = Math.round(nut['energy-kcal_100g'] || nut['energy-kcal'] || 0);
      const protein = Math.round((nut.proteins_100g || nut.proteins || 0) * 10) / 10;
      const carbs = Math.round((nut.carbohydrates_100g || nut.carbohydrates || 0) * 10) / 10;
      const fat = Math.round((nut.fat_100g || nut.fat || 0) * 10) / 10;
      const fiber = nut.fiber_100g ? Math.round(nut.fiber_100g * 10) / 10 : undefined;

      return {
        id: `off-barcode-${p.code}`,
        name: p.product_name || 'Scanned Food',
        brand: p.brands || 'Brand',
        servingSize: 100,
        servingUnit: 'g',
        calories,
        protein,
        carbs,
        fat,
        fiber,
        barcode: p.code,
      };
    } catch (e) {
      console.warn('[OpenFoodFacts] Barcode fetch failed:', e);
      return null;
    }
  },
};
