import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Footprints, Flame, Heart, Moon, ChevronRight, Watch } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { useWearableStore } from '../../store/useWearableStore';

interface WearableWidgetProps {
  onPressDetails?: () => void;
}

export const WearableWidget: React.FC<WearableWidgetProps> = ({ onPressDetails }) => {
  const { getTodayWearableData, activePrimarySource } = useWearableStore();
  const data = getTodayWearableData();

  const stepTarget = 10000;
  const stepProgress = Math.min(100, Math.round((data.steps / stepTarget) * 100));

  const sleepHours = Math.floor(data.sleepMinutes / 60);
  const sleepMins = data.sleepMinutes % 60;

  const sourceFormatted = activePrimarySource.replace('_', ' ').toUpperCase();

  return (
    <GlassCard style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleSection}>
          <View style={styles.watchIconPill}>
            <Watch size={14} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.preTitle}>TELEMETRY SYNC</Text>
            <Text style={styles.cardTitle}>Smartwatch Metrics</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={onPressDetails}
          activeOpacity={0.7}
        >
          <Text style={styles.moreText}>Manage</Text>
          <ChevronRight size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Grid of 4 key telemetry stats */}
      <View style={styles.grid}>
        {/* Steps */}
        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(0, 245, 155, 0.12)' }]}>
              <Footprints size={15} color={colors.primary} />
            </View>
            <Text style={styles.metricPercent}>{stepProgress}%</Text>
          </View>
          <Text style={styles.metricValue}>{data.steps.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>Daily Steps</Text>
          <View style={styles.stepBarBg}>
            <View style={[styles.stepBarFill, { width: `${stepProgress}%` }]} />
          </View>
        </View>

        {/* Active Calories */}
        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(255, 107, 0, 0.12)' }]}>
              <Flame size={15} color={colors.accentOrange} />
            </View>
            <Text style={[styles.metricPercent, { color: colors.accentOrange }]}>Active</Text>
          </View>
          <Text style={styles.metricValue}>{data.activeCalories} kcal</Text>
          <Text style={styles.metricLabel}>Active Burn</Text>
          <Text style={styles.metricSub}>{data.distanceKm} km walked</Text>
        </View>

        {/* Heart Rate */}
        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(255, 59, 48, 0.12)' }]}>
              <Heart size={15} color={colors.accentRed} />
            </View>
            <View style={styles.liveHrBadge}>
              <View style={styles.livePulseDot} />
              <Text style={styles.liveHrText}>Live</Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{data.heartRateResting} bpm</Text>
          <Text style={styles.metricLabel}>Resting Heart Rate</Text>
          <Text style={styles.metricSub}>Avg {data.heartRateAvg} bpm</Text>
        </View>

        {/* Sleep */}
        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(168, 85, 247, 0.12)' }]}>
              <Moon size={15} color={colors.accentPurple} />
            </View>
            <Text style={[styles.metricPercent, { color: colors.accentPurple }]}>Optimal</Text>
          </View>
          <Text style={styles.metricValue}>
            {sleepHours}h {sleepMins}m
          </Text>
          <Text style={styles.metricLabel}>Sleep Logged</Text>
          <Text style={styles.metricSub}>{data.deepSleepMinutes || 90}m Deep</Text>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  watchIconPill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 245, 155, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.25)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 2,
  },
  moreText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: theme.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  metricIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricPercent: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  liveHrBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  livePulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.accentRed,
  },
  liveHrText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentRed,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  metricSub: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  stepBarBg: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  stepBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
