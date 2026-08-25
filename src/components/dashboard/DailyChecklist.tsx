import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, Dumbbell, Utensils, Droplets, Footprints, ShieldCheck } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { useGamificationStore } from '../../store/useGamificationStore';
import { getTodayDateString } from '../../utils/dateUtils';

export const DailyChecklist: React.FC = () => {
  const { getTodayChecklist, toggleChecklistItem, streak } = useGamificationStore();
  const checklist = getTodayChecklist();
  const todayStr = getTodayDateString();

  const items = [
    {
      key: 'workoutCompleted' as const,
      label: 'Daily Workout Session',
      sub: 'Crush planned sets & progressive overload',
      done: checklist.workoutCompleted,
      icon: <Dumbbell size={16} color={checklist.workoutCompleted ? colors.primary : colors.textMuted} />,
    },
    {
      key: 'dietLogged' as const,
      label: 'Log Meals & Hit Protein Goal',
      sub: 'Keep daily calorie surplus/deficit accurate',
      done: checklist.dietLogged,
      icon: <Utensils size={16} color={checklist.dietLogged ? colors.protein : colors.textMuted} />,
    },
    {
      key: 'waterGoalMet' as const,
      label: 'Meet Hydration Target',
      sub: 'Drink prescribed water volume',
      done: checklist.waterGoalMet,
      icon: <Droplets size={16} color={checklist.waterGoalMet ? colors.water : colors.textMuted} />,
    },
    {
      key: 'stepsGoalMet' as const,
      label: 'Smartwatch Step Goal (10k)',
      sub: 'Maintain active daily expenditure',
      done: checklist.stepsGoalMet,
      icon: <Footprints size={16} color={checklist.stepsGoalMet ? colors.accentOrange : colors.textMuted} />,
    },
  ];

  const completedCount = items.filter((i) => i.done).length;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.preTitle}>DISCIPLINE TRACKER</Text>
          <Text style={styles.title}>Daily Habits Protocol</Text>
        </View>
        <View style={styles.adherencePill}>
          <Text style={styles.adherenceText}>{streak.weeklyAdherencePercentage}% Adherence</Text>
        </View>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.itemRow, item.done && styles.itemRowDone]}
            onPress={() => toggleChecklistItem(todayStr, item.key)}
            activeOpacity={0.75}
          >
            <View style={styles.left}>
              <View style={[styles.iconBox, item.done && styles.iconBoxDone]}>
                {item.icon}
              </View>
              <View style={styles.textColumn}>
                <Text style={[styles.itemText, item.done && styles.itemTextDone]}>
                  {item.label}
                </Text>
                <Text style={styles.itemSubText}>{item.sub}</Text>
              </View>
            </View>

            {item.done ? (
              <View style={styles.checkCircleActive}>
                <CheckCircle2 size={22} color={colors.primary} />
              </View>
            ) : (
              <Circle size={20} color="rgba(255, 255, 255, 0.2)" />
            )}
          </TouchableOpacity>
        ))}
      </View>
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
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  preTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
    marginTop: 1,
  },
  adherencePill: {
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.3)',
  },
  adherenceText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  list: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  itemRowDone: {
    borderColor: 'rgba(0, 245, 155, 0.25)',
    backgroundColor: 'rgba(0, 245, 155, 0.05)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDone: {
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
  },
  textColumn: {
    flex: 1,
  },
  itemText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  itemTextDone: {
    color: colors.textSecondary,
  },
  itemSubText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  checkCircleActive: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});
