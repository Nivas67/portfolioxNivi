import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Utensils, BookOpen, ChevronLeft, ChevronRight, X, Check } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useDietStore } from '../../store/useDietStore';
import { useAuthStore } from '../../store/useAuthStore';
import { MealCard } from '../../components/diet/MealCard';
import { WaterTrackerCard } from '../../components/diet/WaterTrackerCard';
import { MacroRingChart } from '../../components/dashboard/MacroRingChart';
import { DIET_TEMPLATES } from '../../data/dietTemplates';
import { formatDateDisplay, getTodayDateString } from '../../utils/dateUtils';
import { MealType } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';

interface DietScreenProps {
  onOpenFoodSearch: (mealType: MealType) => void;
}

export const DietScreen: React.FC<DietScreenProps> = ({ onOpenFoodSearch }) => {
  const todayStr = getTodayDateString();
  const { dailyLogs, selectedDate, setSelectedDate, removeFoodFromMeal, getDailySummary } = useDietStore();
  const targets = useAuthStore((s) => s.nutritionTargets);

  const [showDietTemplatesModal, setShowDietTemplatesModal] = useState(false);

  const currentDayLog = dailyLogs[selectedDate] || {
    date: selectedDate,
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
    waterIntakeMl: 0,
  };

  const summary = getDailySummary(selectedDate);

  const handlePrevDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() - 1);
    const newStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(newStr);
  };

  const handleNextDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 1);
    const newStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(newStr);
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Diet & Nutrition Plan</Text>
            <Text style={styles.subtitle}>Track macros & hit your calorie goals</Text>
          </View>

          <TouchableOpacity
            style={styles.templatesBtn}
            onPress={() => setShowDietTemplatesModal(true)}
            activeOpacity={0.7}
          >
            <BookOpen size={16} color={colors.primary} />
            <Text style={styles.templatesBtnText}>Templates</Text>
          </TouchableOpacity>
        </View>

        {/* Date Switcher Bar */}
        <View style={styles.dateBar}>
          <TouchableOpacity style={styles.dateNavBtn} onPress={handlePrevDay}>
            <ChevronLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.dateText}>{formatDateDisplay(selectedDate)}</Text>
          <TouchableOpacity
            style={[styles.dateNavBtn, selectedDate === todayStr && styles.disabledBtn]}
            disabled={selectedDate === todayStr}
            onPress={handleNextDay}
          >
            <ChevronRight size={20} color={selectedDate === todayStr ? colors.textMuted : colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Macro Gauge Card */}
          <MacroRingChart
            caloriesConsumed={summary.calories}
            calorieTarget={targets?.targetCalories || 2200}
            proteinConsumed={summary.protein}
            proteinTarget={targets?.proteinGrams || 180}
            carbsConsumed={summary.carbs}
            carbsTarget={targets?.carbsGrams || 220}
            fatConsumed={summary.fat}
            fatTarget={targets?.fatGrams || 65}
          />

          {/* Water Intake Card */}
          <WaterTrackerCard />

          {/* 4 Meal Cards */}
          <MealCard
            mealType="breakfast"
            title="Breakfast"
            items={currentDayLog.breakfast}
            onAddFood={() => onOpenFoodSearch('breakfast')}
            onRemoveItem={(index) => removeFoodFromMeal(selectedDate, 'breakfast', index)}
          />

          <MealCard
            mealType="lunch"
            title="Lunch"
            items={currentDayLog.lunch}
            onAddFood={() => onOpenFoodSearch('lunch')}
            onRemoveItem={(index) => removeFoodFromMeal(selectedDate, 'lunch', index)}
          />

          <MealCard
            mealType="dinner"
            title="Dinner"
            items={currentDayLog.dinner}
            onAddFood={() => onOpenFoodSearch('dinner')}
            onRemoveItem={(index) => removeFoodFromMeal(selectedDate, 'dinner', index)}
          />

          <MealCard
            mealType="snack"
            title="Snacks & Supplements"
            items={currentDayLog.snack}
            onAddFood={() => onOpenFoodSearch('snack')}
            onRemoveItem={(index) => removeFoodFromMeal(selectedDate, 'snack', index)}
          />
        </ScrollView>

        {/* Diet Plan Templates Modal */}
        <Modal visible={showDietTemplatesModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.templatesModalCard} glow glowColor={colors.primary}>
              <View style={styles.modalTop}>
                <Text style={styles.modalTitle}>Weekly Diet Templates</Text>
                <TouchableOpacity onPress={() => setShowDietTemplatesModal(false)}>
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.templateListScroll} showsVerticalScrollIndicator={false}>
                {DIET_TEMPLATES.map((template) => (
                  <View key={template.id} style={styles.templateCard}>
                    <View style={styles.templateHeader}>
                      <Text style={styles.templateName}>{template.name}</Text>
                      <StatBadge label={template.category} color={colors.primary} size="sm" />
                    </View>
                    <Text style={styles.templateDesc}>{template.description}</Text>

                    <View style={styles.templateMacros}>
                      <Text style={styles.templateCal}>{template.targetCalories} kcal</Text>
                      <Text style={styles.templateMacroSplit}>
                        P: {template.macros.protein}g · C: {template.macros.carbs}g · F: {template.macros.fat}g
                      </Text>
                    </View>

                    <View style={styles.sampleMealsBox}>
                      <Text style={styles.sampleMealTitle}>Sample Meals:</Text>
                      <Text style={styles.sampleMealItem}>• Breakfast: {template.sampleMeals.breakfast[0]}</Text>
                      <Text style={styles.sampleMealItem}>• Lunch: {template.sampleMeals.lunch[0]}</Text>
                      <Text style={styles.sampleMealItem}>• Dinner: {template.sampleMeals.dinner[0]}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.closeModalBtn}
                onPress={() => setShowDietTemplatesModal(false)}
              >
                <Text style={styles.closeModalBtnText}>Close Templates</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  templatesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  templatesBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  dateNavBtn: {
    padding: 6,
  },
  disabledBtn: {
    opacity: 0.3,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  templatesModalCard: {
    maxHeight: '85%',
    padding: theme.spacing.md,
    gap: 12,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  templateListScroll: {
    maxHeight: 400,
  },
  templateCard: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  templateDesc: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  templateMacros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 2,
  },
  templateCal: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  templateMacroSplit: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sampleMealsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.sm,
    padding: 8,
    gap: 2,
  },
  sampleMealTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  sampleMealItem: {
    fontSize: 11,
    color: colors.textPrimary,
  },
  closeModalBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.glowMint,
  },
  closeModalBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textDark,
  },
});
