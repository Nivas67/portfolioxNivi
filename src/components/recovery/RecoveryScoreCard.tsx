import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { BatteryCharging, Heart, Moon, Zap, Activity } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { StatBadge } from '../common/StatBadge';

interface RecoveryScoreCardProps {
  score?: number; // 0 - 100
  hrvMs?: number; // e.g. 68ms
  restingHr?: number; // e.g. 52 bpm
  sleepScore?: number; // e.g. 88%
}

export const RecoveryScoreCard: React.FC<RecoveryScoreCardProps> = ({
  score = 92,
  hrvMs = 74,
  restingHr = 54,
  sleepScore = 89,
}) => {
  const getStatusColor = (val: number) => {
    if (val >= 80) return colors.primary; // Electric Green
    if (val >= 50) return colors.accentOrange; // Neon Orange
    return colors.accentRed; // Red
  };

  const getStatusTitle = (val: number) => {
    if (val >= 80) return 'Peak Readiness';
    if (val >= 50) return 'Moderate Strain';
    return 'Recovery Day Needed';
  };

  const statusColor = getStatusColor(score);
  const statusTitle = getStatusTitle(score);

  // SVG Gauge calculations
  const size = 84;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <GlassCard style={styles.card} glow glowColor={statusColor}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BatteryCharging size={16} color={statusColor} />
          <Text style={styles.cardTitle}>CNS Recovery & Readiness</Text>
        </View>
        <StatBadge label={statusTitle} color={statusColor} size="sm" />
      </View>

      <View style={styles.contentRow}>
        {/* SVG Circular Score Dial (Crash-Proof G rotation wrapper) */}
        <View style={styles.dialContainer}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background ring */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Value ring wrapped in G element */}
            <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={statusColor}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </G>
          </Svg>
          <View style={styles.dialTextCenter}>
            <Text style={[styles.dialNumber, { color: statusColor }]}>{score}%</Text>
          </View>
        </View>

        {/* Breakdown Telemetry Grid */}
        <View style={styles.telemetryCol}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconWrap}>
                <Activity size={12} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.metricValue}>{hrvMs} ms</Text>
                <Text style={styles.metricLabel}>HRV (RMSSD)</Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconWrap}>
                <Heart size={12} color={colors.accentRed} />
              </View>
              <View>
                <Text style={styles.metricValue}>{restingHr} bpm</Text>
                <Text style={styles.metricLabel}>Resting HR</Text>
              </View>
            </View>
          </View>

          <View style={styles.recommendationBox}>
            <Zap size={12} color={statusColor} />
            <Text style={styles.recommendationText}>
              {score >= 80
                ? 'High CNS capacity. Ideal day for heavy compound PRs & top working sets.'
                : 'Moderate recovery. Keep training intensity within RPE 7-8.'}
            </Text>
          </View>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dialContainer: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dialTextCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialNumber: {
    fontSize: 19,
    fontWeight: '900',
  },
  telemetryCol: {
    flex: 1,
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    backgroundColor: colors.inputBg,
    padding: 6,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricIconWrap: {
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.sm,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 6,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  recommendationText: {
    fontSize: 10,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 14,
  },
});
