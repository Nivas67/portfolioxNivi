import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Dumbbell, Clock, Flame, ChevronRight, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { useWorkoutStore } from '../../store/useWorkoutStore';

interface TodayWorkoutCardProps {
  onStartSession: () => void;
  onViewPlan: () => void;
}

export const TodayWorkoutCard: React.FC<TodayWorkoutCardProps> = ({
  onStartSession,
  onViewPlan,
}) => {
  const { plans, activePlanId, selectedDayIndex, activeSession } = useWorkoutStore();
  const currentPlan = plans.find((p) => p.id === activePlanId) || plans[0];
  const todayDay = currentPlan?.days.find((d) => d.dayIndex === selectedDayIndex) || currentPlan?.days[0];

  const isRestDay = todayDay?.isRestDay;

  return (
    <GlassCard style={styles.card} glow={!isRestDay} glowColor={colors.primary}>
      <View style={styles.topRow}>
        <View style={styles.planInfo}>
          <View style={styles.badgeRow}>
            <Text style={styles.planBadgeText}>TODAY'S SPLIT</Text>
            <View style={styles.dot} />
            <Text style={styles.planName}>{currentPlan?.name || 'Workout Split'}</Text>
          </View>
          <Text style={styles.dayName}>{todayDay?.name || 'Training Session'}</Text>
        </View>

        <TouchableOpacity style={styles.calendarLink} onPress={onViewPlan} activeOpacity={0.7}>
          <Text style={styles.calendarLinkText}>Split</Text>
          <ChevronRight size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {isRestDay ? (
        <View style={styles.restDayContainer}>
          <Text style={styles.restDayTitle}>🛌 Planned Rest & Hypertrophy Recovery</Text>
          <Text style={styles.restDaySub}>
            Muscles rebuild during deep rest. Hit your daily protein targets, hydrate, and allow central nervous system recovery.
          </Text>
        </View>
      ) : (
        <>
          {/* Metadata */}
          <View style={styles.metaRow}>
            <View style={styles.protocolBadge}>
              <Text style={styles.protocolBadgeText}>TODAY'S PROTOCOL</Text>
            </View>
            <Text style={styles.metaText}>
              {todayDay?.exercises.length || 0} Exercises • 52 min
            </Text>
          </View>

          {/* Numbered Exercise Rows from Stitch */}
          <View style={styles.exerciseRows}>
            {todayDay?.exercises.slice(0, 3).map((ex, idx) => (
              <View key={idx} style={styles.exerciseRow}>
                <View style={styles.exerciseLeft}>
                  <View style={styles.indexCircle}>
                    <Text style={styles.indexText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.exerciseNameText} numberOfLines={1}>
                    {ex.customName || `Exercise ${idx + 1}`}
                  </Text>
                </View>
                <Text style={styles.exerciseSetsText}>
                  {ex.targetSets}x{ex.targetReps || '8-10'}
                </Text>
              </View>
            ))}
          </View>

          {/* Stitch Primary CTA Button */}
          <TouchableOpacity
            onPress={onStartSession}
            activeOpacity={0.88}
            style={styles.ctaButtonWrapper}
          >
            <View style={styles.solidPrimaryBtn}>
              <Play size={18} color="#081009" fill="#081009" />
              <Text style={styles.startButtonText}>
                {activeSession ? 'Resume Workout' : 'Start Workout'}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  planInfo: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
  },
  planName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dayName: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 2,
    letterSpacing: -0.4,
  },
  calendarLink: {
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
  calendarLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  protocolBadge: {
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  protocolBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  exerciseRows: {
    gap: 6,
    marginVertical: 10,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  indexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  exerciseNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  exerciseSetsText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  ctaButtonWrapper: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginTop: 4,
    ...theme.shadows.glowMint,
  },
  solidPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF88',
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    gap: 8,
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#081009',
    letterSpacing: -0.2,
  },
  restDayContainer: {
    paddingVertical: theme.spacing.md,
  },
  restDayTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  restDaySub: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
  },
});
