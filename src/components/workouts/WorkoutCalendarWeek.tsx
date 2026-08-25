import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, theme } from '../../theme/colors';
import { WorkoutPlan } from '../../types';

interface WorkoutCalendarWeekProps {
  plan: WorkoutPlan;
  selectedDayIndex: number;
  onSelectDayIndex: (index: number) => void;
}

export const WorkoutCalendarWeek: React.FC<WorkoutCalendarWeekProps> = ({
  plan,
  selectedDayIndex,
  onSelectDayIndex,
}) => {
  const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      {daysShort.map((dayName, idx) => {
        const dayPlan = plan.days.find((d) => d.dayIndex === idx);
        const isSelected = selectedDayIndex === idx;
        const isRest = dayPlan?.isRestDay ?? false;
        const hasExercises = (dayPlan?.exercises.length || 0) > 0;

        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.dayCard,
              isSelected && styles.dayCardSelected,
              isRest && !isSelected && styles.dayCardRest,
            ]}
            onPress={() => onSelectDayIndex(idx)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>
              {dayName}
            </Text>

            <View style={styles.indicatorContainer}>
              {isRest ? (
                <Text style={[styles.restTag, isSelected && styles.restTagSelected]}>REST</Text>
              ) : (
                <View
                  style={[
                    styles.dot,
                    isSelected ? styles.dotSelected : styles.dotActive,
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginVertical: theme.spacing.sm,
  },
  dayCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  dayCardSelected: {
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    borderColor: colors.primary,
  },
  dayCardRest: {
    opacity: 0.6,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  dayLabelSelected: {
    color: colors.primary,
  },
  indicatorContainer: {
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotSelected: {
    backgroundColor: colors.primary,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  restTag: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.textMuted,
  },
  restTagSelected: {
    color: colors.primary,
  },
});
