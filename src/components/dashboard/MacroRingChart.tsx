import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';

interface MacroRingChartProps {
  caloriesConsumed: number;
  calorieTarget: number;
  proteinConsumed: number;
  proteinTarget: number;
  carbsConsumed: number;
  carbsTarget: number;
  fatConsumed: number;
  fatTarget: number;
  activeCaloriesBurned?: number;
}

export const MacroRingChart: React.FC<MacroRingChartProps> = ({
  caloriesConsumed,
  calorieTarget,
  proteinConsumed,
  proteinTarget,
  carbsConsumed,
  carbsTarget,
  fatConsumed,
  fatTarget,
  activeCaloriesBurned = 0,
}) => {
  const size = 160;
  const strokeWidth = 9;
  const gap = 3;

  // Ring 1 (Outer): Calories
  const r1 = (size - strokeWidth) / 2;
  const c1 = 2 * Math.PI * r1;
  const p1 = Math.min(1, Math.max(0, caloriesConsumed / (calorieTarget || 2000)));
  const offset1 = c1 - p1 * c1;

  // Ring 2 (Middle): Protein
  const r2 = r1 - strokeWidth - gap;
  const c2 = 2 * Math.PI * r2;
  const p2 = Math.min(1, Math.max(0, proteinConsumed / (proteinTarget || 150)));
  const offset2 = c2 - p2 * c2;

  // Ring 3 (Inner): Carbs/Energy
  const r3 = r2 - strokeWidth - gap;
  const c3 = 2 * Math.PI * r3;
  const p3 = Math.min(1, Math.max(0, carbsConsumed / (carbsTarget || 200)));
  const offset3 = c3 - p3 * c3;

  const remaining = Math.max(0, calorieTarget - caloriesConsumed);

  return (
    <GlassCard style={styles.card} glow glowColor={colors.primary}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.cardPreTitle}>NUTRITION RINGS</Text>
          <Text style={styles.cardTitle}>Daily Macro Balance</Text>
        </View>
        <View style={styles.remainingPill}>
          <Text style={styles.remainingText}>{remaining} kcal left</Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        {/* Concentric SVG Gauge */}
        <View style={styles.chartWrapper}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Defs>
              {/* Outer Ring Gradient */}
              <SvgGradient id="calGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#70FFAB" />
                <Stop offset="100%" stopColor="#39FF88" />
              </SvgGradient>
              {/* Middle Ring Gradient */}
              <SvgGradient id="protGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#7DD3FC" />
                <Stop offset="100%" stopColor="#38BDF8" />
              </SvgGradient>
              {/* Inner Ring Gradient */}
              <SvgGradient id="carbGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FDE68A" />
                <Stop offset="100%" stopColor="#FBBF24" />
              </SvgGradient>
            </Defs>

            <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
              {/* Background Tracks */}
              <Circle cx={size / 2} cy={size / 2} r={r1} stroke="rgba(255, 255, 255, 0.08)" strokeWidth={strokeWidth} fill="transparent" />
              <Circle cx={size / 2} cy={size / 2} r={r2} stroke="rgba(255, 255, 255, 0.08)" strokeWidth={strokeWidth} fill="transparent" />
              <Circle cx={size / 2} cy={size / 2} r={r3} stroke="rgba(255, 255, 255, 0.08)" strokeWidth={strokeWidth} fill="transparent" />

              {/* Progress Rings */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={r1}
                stroke="url(#calGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={c1}
                strokeDashoffset={offset1}
                strokeLinecap="round"
                fill="transparent"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={r2}
                stroke="url(#protGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={c2}
                strokeDashoffset={offset2}
                strokeLinecap="round"
                fill="transparent"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={r3}
                stroke="url(#carbGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={c3}
                strokeDashoffset={offset3}
                strokeLinecap="round"
                fill="transparent"
              />
            </G>
          </Svg>

          {/* Center Glanceable Metric */}
          <View style={styles.centerTextContainer}>
            <Text style={styles.caloriesNumber}>{caloriesConsumed}</Text>
            <Text style={styles.caloriesLabel}>KCAL</Text>
            {activeCaloriesBurned > 0 && (
              <Text style={styles.netBurnText}>🔥 -{activeCaloriesBurned}</Text>
            )}
          </View>
        </View>

        {/* Glass Macro Rows */}
        <View style={styles.macrosList}>
          {/* Protein */}
          <View style={styles.macroCardGlass}>
            <View style={styles.macroHeader}>
              <View style={styles.macroDotTitle}>
                <View style={[styles.colorDot, { backgroundColor: colors.protein }]} />
                <Text style={styles.macroName}>Protein</Text>
              </View>
              <Text style={styles.macroValue}>
                {proteinConsumed} <Text style={styles.targetMuted}>/ {proteinTarget}g</Text>
              </Text>
            </View>
            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: colors.protein,
                    width: `${Math.min(100, (proteinConsumed / (proteinTarget || 1)) * 100)}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Carbs */}
          <View style={styles.macroCardGlass}>
            <View style={styles.macroHeader}>
              <View style={styles.macroDotTitle}>
                <View style={[styles.colorDot, { backgroundColor: colors.carbs }]} />
                <Text style={styles.macroName}>Carbs</Text>
              </View>
              <Text style={styles.macroValue}>
                {carbsConsumed} <Text style={styles.targetMuted}>/ {carbsTarget}g</Text>
              </Text>
            </View>
            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: colors.carbs,
                    width: `${Math.min(100, (carbsConsumed / (carbsTarget || 1)) * 100)}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Fat */}
          <View style={styles.macroCardGlass}>
            <View style={styles.macroHeader}>
              <View style={styles.macroDotTitle}>
                <View style={[styles.colorDot, { backgroundColor: colors.fat }]} />
                <Text style={styles.macroName}>Fat</Text>
              </View>
              <Text style={styles.macroValue}>
                {fatConsumed} <Text style={styles.targetMuted}>/ {fatTarget}g</Text>
              </Text>
            </View>
            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: colors.fat,
                    width: `${Math.min(100, (fatConsumed / (fatTarget || 1)) * 100)}%`,
                  },
                ]}
              />
            </View>
          </View>
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
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  cardPreTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
    marginTop: 1,
  },
  remainingPill: {
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  remainingText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  chartWrapper: {
    position: 'relative',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caloriesNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  caloriesLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  netBurnText: {
    fontSize: 10,
    color: colors.accentOrange,
    fontWeight: '800',
    marginTop: 2,
  },
  macrosList: {
    flex: 1,
    gap: 8,
  },
  macroCardGlass: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 5,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroDotTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  colorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  macroName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  macroValue: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  targetMuted: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 10,
  },
  barBg: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2.5,
  },
});
