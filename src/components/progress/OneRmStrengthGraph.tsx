import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, TrendingUp } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { useProgressStore } from '../../store/useProgressStore';

export const OneRmStrengthGraph: React.FC = () => {
  const { oneRmRecords } = useProgressStore();

  const records = Object.values(oneRmRecords);

  const mainLifts = [
    { name: 'Bench Press', id: 'ex-chest-01', color: colors.protein },
    { name: 'Squat', id: 'ex-leg-01', color: colors.primary },
    { name: 'Deadlift', id: 'ex-back-01', color: colors.accentOrange },
    { name: 'Overhead Press', id: 'ex-sh-01', color: colors.accentPurple },
  ];

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Trophy size={18} color={colors.accentYellow} />
          <Text style={styles.title}>1RM Strength Estimates (Epley)</Text>
        </View>
        <Text style={styles.formulaTag}>1RM = w × (1 + r/30)</Text>
      </View>

      <View style={styles.liftsList}>
        {mainLifts.map((lift) => {
          const record = oneRmRecords[lift.id];
          const oneRm = record ? (record.oneRmKg || record.estimatedOneRmKg || 0) : 0;
          const maxBenchEstimate = 200; // scaling cap for bar
          const barWidthPercent = Math.min(100, Math.round((oneRm / maxBenchEstimate) * 100));

          return (
            <View key={lift.id} style={styles.liftItem}>
              <View style={styles.liftHeader}>
                <Text style={styles.liftName}>{lift.name}</Text>
                <View style={styles.liftStats}>
                  <Text style={[styles.oneRmValue, { color: lift.color }]}>
                    {oneRm > 0 ? `${oneRm} kg` : '—'}
                  </Text>
                  {record && record.weightUsedKg && (
                    <Text style={styles.liftFormulaDetail}>
                      ({record.weightUsedKg}kg × {record.repsAchieved || 1})
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barProgress,
                    {
                      width: `${barWidthPercent}%`,
                      backgroundColor: lift.color,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  formulaTag: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  liftsList: {
    gap: 12,
  },
  liftItem: {
    gap: 4,
  },
  liftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liftName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  liftStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  oneRmValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  liftFormulaDetail: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  barTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barProgress: {
    height: '100%',
    borderRadius: 3,
  },
});
