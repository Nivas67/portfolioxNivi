import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { LoggedFoodItem, MealType } from '../../types';

export interface MealCardProps {
  mealType: MealType;
  title: string;
  items: LoggedFoodItem[];
  onAddFood: () => void;
  onRemoveItem: (index: number) => void;
}

const mealEmojis: Record<MealType, string> = {
  breakfast: '🍳',
  lunch: '🥗',
  dinner: '🥩',
  snack: '⚡',
};

export const MealCard: React.FC<MealCardProps> = ({
  mealType,
  title,
  items = [],
  onAddFood,
  onRemoveItem,
}) => {
  const totalCals = items.reduce((sum, item) => sum + (item.calories || 0) * (item.quantity || 1), 0);
  const totalProt = items.reduce((sum, item) => sum + (item.protein || 0) * (item.quantity || 1), 0);
  const totalCarb = items.reduce((sum, item) => sum + (item.carbs || 0) * (item.quantity || 1), 0);
  const totalFat = items.reduce((sum, item) => sum + (item.fat || 0) * (item.quantity || 1), 0);

  const emoji = mealEmojis[mealType] || '🍽️';

  return (
    <GlassCard style={styles.card}>
      {/* Meal Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.iconEmoji}>{emoji}</Text>
          <View>
            <Text style={styles.mealTitle}>{title}</Text>
            <Text style={styles.mealSummary}>
              {Math.round(totalCals)} kcal • {Math.round(totalProt)}g P • {Math.round(totalCarb)}g C • {Math.round(totalFat)}g F
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addFoodBtn}
          onPress={onAddFood}
          activeOpacity={0.75}
        >
          <Plus size={14} color={colors.primary} />
          <Text style={styles.addFoodBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Logged Foods List */}
      {items.length === 0 ? (
        <TouchableOpacity
          style={styles.emptySlot}
          onPress={onAddFood}
          activeOpacity={0.65}
        >
          <Text style={styles.emptyText}>Tap to log food or scan barcode</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.foodList}>
          {items.map((item, idx) => (
            <View key={`${item.id}-${idx}`} style={styles.foodRow}>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName} numberOfLines={1}>
                  {item.name || item.foodName || 'Food Item'}
                </Text>
                <Text style={styles.foodMeta}>
                  {item.quantity || 1} serving ({Math.round((item.servingSize || 100) * (item.quantity || 1))}{item.servingUnit || 'g'}) • {Math.round(((item.proteinGrams || item.protein) || 0) * (item.quantity || 1))}g Protein
                </Text>
              </View>

              <View style={styles.foodRight}>
                <Text style={styles.foodCalories}>
                  {Math.round(item.calories * (item.quantity || 1))} kcal
                </Text>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => onRemoveItem(idx)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Trash2 size={13} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconEmoji: {
    fontSize: 20,
  },
  mealTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  mealSummary: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 1,
  },
  addFoodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 245, 155, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.25)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  addFoodBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  emptySlot: {
    marginTop: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  foodList: {
    marginTop: 10,
    gap: 6,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  foodInfo: {
    flex: 1,
    paddingRight: 8,
  },
  foodName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  foodMeta: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  foodRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  foodCalories: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  deleteBtn: {
    padding: 2,
  },
});
