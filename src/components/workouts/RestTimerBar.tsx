import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Plus, Minus, SkipForward } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '../../theme/colors';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { formatSecondsToTimer } from '../../utils/dateUtils';

export const RestTimerBar: React.FC = () => {
  const { activeSession, adjustRestTimer, cancelRestTimer } = useWorkoutStore();

  if (!activeSession || !activeSession.restTimer.active) {
    return null;
  }

  const { secondsRemaining, totalDuration } = activeSession.restTimer;

  const progressPercent = Math.min(
    100,
    Math.max(0, ((totalDuration - secondsRemaining) / (totalDuration || 1)) * 100)
  );

  return (
    <View style={styles.floatingContainer}>
      <LinearGradient
        colors={['rgba(24, 32, 50, 0.95)', 'rgba(10, 14, 24, 0.98)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientDock}
      >
        {/* Specular Highlight Line */}
        <View style={styles.specular} />

        {/* Progress Fill Bar along the bottom of the card */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <View style={styles.contentRow}>
          {/* Left Timer Label & Countdown */}
          <View style={styles.timerDisplay}>
            <View style={styles.timerIconPulse}>
              <Clock size={16} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.timerLabel}>REST TIMER</Text>
              <Text style={styles.countdownText}>
                {formatSecondsToTimer(secondsRemaining)}
              </Text>
            </View>
          </View>

          {/* Quick Adjustment Tactile Pills */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.adjustPill}
              onPress={() => adjustRestTimer(-15)}
              activeOpacity={0.7}
            >
              <Minus size={12} color={colors.textPrimary} />
              <Text style={styles.adjustText}>15s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.adjustPill}
              onPress={() => adjustRestTimer(15)}
              activeOpacity={0.7}
            >
              <Plus size={12} color={colors.primary} />
              <Text style={[styles.adjustText, { color: colors.primary }]}>15s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={cancelRestTimer}
              activeOpacity={0.7}
            >
              <SkipForward size={14} color={colors.textDark} />
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 1000,
    ...theme.shadows.glowMint,
  },
  gradientDock: {
    borderRadius: theme.borderRadius.xl,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.4)',
    overflow: 'hidden',
    position: 'relative',
  },
  specular: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timerIconPulse: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  countdownText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  adjustPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 2,
  },
  adjustText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 4,
  },
  skipText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.textDark,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
});
