import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Barcode, Plus, Check, X, Sparkles, Filter } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { FoodItem, MealType } from '../../types';
import { openFoodFactsService } from '../../services/openFoodFacts';
import { useDietStore } from '../../store/useDietStore';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';

interface FoodSearchScreenProps {
  initialMealType: MealType;
  onBack: () => void;
  onFoodAdded: () => void;
}

export const FoodSearchScreen: React.FC<FoodSearchScreenProps> = ({
  initialMealType = 'lunch',
  onBack,
  onFoodAdded,
}) => {
  const { selectedDate, addFoodToMeal, createCustomFood } = useDietStore();

  const [query, setQuery] = useState('');
  const [mealType, setMealType] = useState<MealType>(initialMealType);
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Active Food Logging Modal
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState('1');

  // Barcode Scanner Simulator Modal
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('3017620422003'); // Nutella demo barcode

  // Custom Food Modal
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [customServing, setCustomServing] = useState('100');
  const [customUnit, setCustomUnit] = useState('g');
  const [customCal, setCustomCal] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');

  // Initial search on mount
  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = async (text: string) => {
    setLoading(true);
    const foods = await openFoodFactsService.searchFoods(text);
    setResults(foods);
    setLoading(false);
  };

  const handleBarcodeLookup = async () => {
    if (!barcodeInput.trim()) return;
    setLoading(true);
    setShowBarcodeModal(false);
    const item = await openFoodFactsService.getByBarcode(barcodeInput);
    setLoading(false);
    if (item) {
      setSelectedFood(item);
    } else {
      // Fallback
      handleSearch('Protein Bar');
    }
  };

  const handleLogFood = () => {
    if (!selectedFood) return;
    const qty = parseFloat(quantity) || 1;
    addFoodToMeal(selectedDate, mealType, selectedFood, qty);
    setSelectedFood(null);
    onFoodAdded();
  };

  const handleSaveCustomFood = () => {
    if (!customName.trim() || !customCal.trim()) return;
    const food = createCustomFood({
      name: customName,
      brand: customBrand || 'Custom Recipe',
      servingSize: parseFloat(customServing) || 100,
      servingUnit: customUnit || 'g',
      calories: parseInt(customCal, 10) || 0,
      protein: parseFloat(customProtein) || 0,
      carbs: parseFloat(customCarbs) || 0,
      fat: parseFloat(customFat) || 0,
    });
    setShowCustomModal(false);
    setSelectedFood(food);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleArea}>
          <Text style={styles.headerTitle}>Add Food to {mealType.toUpperCase()}</Text>
          <Text style={styles.headerSub}>Open Food Facts Global Database</Text>
        </View>

        <TouchableOpacity
          style={styles.barcodeBtn}
          onPress={() => setShowBarcodeModal(true)}
          activeOpacity={0.7}
        >
          <Barcode size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Meal Slot Selector Pills */}
      <View style={styles.mealSelectorRow}>
        {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.mealPill, mealType === m && styles.mealPillActive]}
            onPress={() => setMealType(m)}
          >
            <Text style={[styles.mealPillText, mealType === m && styles.mealPillTextActive]}>
              {m.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchWrapper}>
          <Search size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search chicken, rice, eggs, protein, oats..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              handleSearch(text);
            }}
          />
          {query ? (
            <TouchableOpacity onPress={() => { setQuery(''); handleSearch(''); }}>
              <X size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.customAddBtn}
          onPress={() => setShowCustomModal(true)}
          activeOpacity={0.7}
        >
          <Plus size={16} color={colors.primary} />
          <Text style={styles.customAddText}>Custom</Text>
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Searching Open Food Facts...</Text>
          </View>
        )}

        {results.map((food) => (
          <TouchableOpacity
            key={food.id}
            style={styles.foodItemCard}
            onPress={() => setSelectedFood(food)}
            activeOpacity={0.7}
          >
            <View style={styles.foodItemLeft}>
              <Text style={styles.foodItemName} numberOfLines={1}>
                {food.name}
              </Text>
              <Text style={styles.foodItemBrand}>
                {food.brand || 'Generic'} · {food.servingSize}{food.servingUnit}
              </Text>
              <View style={styles.macrosBadgeRow}>
                <Text style={styles.macroTagP}>P: {food.protein}g</Text>
                <Text style={styles.macroTagC}>C: {food.carbs}g</Text>
                <Text style={styles.macroTagF}>F: {food.fat}g</Text>
              </View>
            </View>

            <View style={styles.foodItemRight}>
              <Text style={styles.foodCaloriesText}>{food.calories} kcal</Text>
              <View style={styles.addCircle}>
                <Plus size={16} color={colors.textDark} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Food Log Confirmation Modal */}
      {selectedFood && (
        <Modal visible={!!selectedFood} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.logModalCard} glow>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleArea}>
                  <Text style={styles.modalFoodName}>{selectedFood.name}</Text>
                  <Text style={styles.modalFoodBrand}>{selectedFood.brand || 'Generic'}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedFood(null)}>
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Quantity Input */}
              <View style={styles.quantityContainer}>
                <Text style={styles.qtyLabel}>Number of Servings ({selectedFood.servingSize}{selectedFood.servingUnit} each):</Text>
                <View style={styles.qtyRow}>
                  {['0.5', '1', '1.5', '2'].map((q) => (
                    <TouchableOpacity
                      key={q}
                      style={[styles.qtyQuickBtn, quantity === q && styles.qtyQuickBtnActive]}
                      onPress={() => setQuantity(q)}
                    >
                      <Text style={[styles.qtyQuickText, quantity === q && styles.qtyQuickTextActive]}>
                        {q}x
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TextInput
                    style={styles.customQtyInput}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                  />
                </View>
              </View>

              {/* Calculated Totals Preview */}
              <View style={styles.calculatedMacroCard}>
                <Text style={styles.calcCalText}>
                  {Math.round(selectedFood.calories * (parseFloat(quantity) || 1))} kcal
                </Text>
                <Text style={styles.calcMacroText}>
                  Protein: {Math.round(((selectedFood.proteinGrams || selectedFood.protein) || 0) * (parseFloat(quantity) || 1) * 10) / 10}g · Carbs: {Math.round(((selectedFood.carbsGrams || selectedFood.carbs) || 0) * (parseFloat(quantity) || 1) * 10) / 10}g · Fat: {Math.round(((selectedFood.fatGrams || selectedFood.fat) || 0) * (parseFloat(quantity) || 1) * 10) / 10}g
                </Text>
              </View>

              <TouchableOpacity
                style={styles.confirmAddBtn}
                onPress={handleLogFood}
                activeOpacity={0.85}
              >
                <Check size={18} color={colors.textDark} strokeWidth={3} />
                <Text style={styles.confirmAddText}>Add to {mealType.toUpperCase()}</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>
      )}

      {/* Barcode Scanner Modal Simulator */}
      <Modal visible={showBarcodeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.barcodeModalCard} glow>
            <View style={styles.modalHeader}>
              <View style={styles.barcodeTitleRow}>
                <Barcode size={24} color={colors.primary} />
                <Text style={styles.modalFoodName}>Barcode Scanner</Text>
              </View>
              <TouchableOpacity onPress={() => setShowBarcodeModal(false)}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.barcodeDesc}>
              Scan or enter the food item's 12-13 digit UPC/EAN barcode to fetch live nutrition data from Open Food Facts.
            </Text>

            <TextInput
              style={styles.barcodeInput}
              placeholder="e.g. 3017620422003, 737628064502"
              placeholderTextColor={colors.textMuted}
              value={barcodeInput}
              onChangeText={setBarcodeInput}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.confirmAddBtn}
              onPress={handleBarcodeLookup}
            >
              <Search size={16} color={colors.textDark} />
              <Text style={styles.confirmAddText}>Lookup Barcode Nutrition</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </Modal>

      {/* Custom Food Creation Modal */}
      <Modal visible={showCustomModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.customModalCard} glow>
            <View style={styles.modalHeader}>
              <Text style={styles.modalFoodName}>Create Custom Food / Recipe</Text>
              <TouchableOpacity onPress={() => setShowCustomModal(false)}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.customFormScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.formLabel}>Food Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g. Grandma's Protein Pancakes"
                placeholderTextColor={colors.textMuted}
                value={customName}
                onChangeText={setCustomName}
              />

              <Text style={styles.formLabel}>Brand / Source (Optional)</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g. Homemade"
                placeholderTextColor={colors.textMuted}
                value={customBrand}
                onChangeText={setCustomBrand}
              />

              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <Text style={styles.formLabel}>Calories (kcal)</Text>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    placeholder="250"
                    placeholderTextColor={colors.textMuted}
                    value={customCal}
                    onChangeText={setCustomCal}
                  />
                </View>
                <View style={styles.formCol}>
                  <Text style={styles.formLabel}>Protein (g)</Text>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    placeholder="20"
                    placeholderTextColor={colors.textMuted}
                    value={customProtein}
                    onChangeText={setCustomProtein}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <Text style={styles.formLabel}>Carbs (g)</Text>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    placeholder="30"
                    placeholderTextColor={colors.textMuted}
                    value={customCarbs}
                    onChangeText={setCustomCarbs}
                  />
                </View>
                <View style={styles.formCol}>
                  <Text style={styles.formLabel}>Fat (g)</Text>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    placeholder="5"
                    placeholderTextColor={colors.textMuted}
                    value={customFat}
                    onChangeText={setCustomFat}
                  />
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.confirmAddBtn}
              onPress={handleSaveCustomFood}
            >
              <Check size={18} color={colors.textDark} strokeWidth={3} />
              <Text style={styles.confirmAddText}>Save & Log Food</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  headerTitleArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  barcodeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.3)',
  },
  mealSelectorRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    gap: 6,
    marginVertical: 8,
  },
  mealPill: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  mealPillActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: colors.protein,
  },
  mealPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  mealPillTextActive: {
    color: colors.protein,
  },
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    gap: 8,
    marginBottom: theme.spacing.sm,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
  },
  customAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.3)',
    gap: 4,
  },
  customAddText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: 8,
    paddingBottom: theme.spacing.xxl,
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  foodItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  foodItemLeft: {
    flex: 1,
    paddingRight: 8,
  },
  foodItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  foodItemBrand: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  macrosBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  macroTagP: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.protein,
  },
  macroTagC: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.carbs,
  },
  macroTagF: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.fat,
  },
  foodItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  foodCaloriesText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  addCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  logModalCard: {
    padding: theme.spacing.lg,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalTitleArea: {
    flex: 1,
    paddingRight: 8,
  },
  modalFoodName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  modalFoodBrand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quantityContainer: {
    gap: 8,
  },
  qtyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  qtyRow: {
    flexDirection: 'row',
    gap: 6,
  },
  qtyQuickBtn: {
    flex: 1,
    backgroundColor: colors.inputBg,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  qtyQuickBtnActive: {
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
    borderColor: colors.primary,
  },
  qtyQuickText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  qtyQuickTextActive: {
    color: colors.primary,
  },
  customQtyInput: {
    width: 50,
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  calculatedMacroCard: {
    backgroundColor: colors.inputBg,
    padding: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  calcCalText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  calcMacroText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  confirmAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    gap: 6,
  },
  confirmAddText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDark,
  },
  barcodeModalCard: {
    padding: theme.spacing.lg,
    gap: 12,
  },
  barcodeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barcodeDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  barcodeInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    padding: 12,
    textAlign: 'center',
  },
  customModalCard: {
    maxHeight: '85%',
    padding: theme.spacing.lg,
    gap: 12,
  },
  customFormScroll: {
    maxHeight: 300,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  formInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 13,
    padding: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 8,
  },
  formCol: {
    flex: 1,
  },
});
