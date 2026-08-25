import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop, Line } from 'react-native-svg';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { BodyWeightEntry } from '../../types';

interface WeightTrendGraphProps {
  entries: BodyWeightEntry[];
  targetWeightKg?: number;
}

export const WeightTrendGraph: React.FC<WeightTrendGraphProps> = ({
  entries,
  targetWeightKg = 75,
}) => {
  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const currentWeight = sorted[sorted.length - 1]?.weightKg || 78.5;
  const initialWeight = sorted[0]?.weightKg || 80.0;
  const delta = Math.round((currentWeight - initialWeight) * 10) / 10;
  const isLoss = delta <= 0;

  // SVG Chart Setup
  const width = 300;
  const height = 130;
  const padX = 20;
  const padY = 20;

  const weights = sorted.map((e) => e.weightKg);
  const minW = Math.min(...weights, targetWeightKg) - 1;
  const maxW = Math.max(...weights, targetWeightKg) + 1;

  const getX = (index: number) => {
    if (sorted.length <= 1) return width / 2;
    return padX + (index / (sorted.length - 1)) * (width - 2 * padX);
  };

  const getY = (w: number) => {
    return height - padY - ((w - minW) / (maxW - minW || 1)) * (height - 2 * padY);
  };

  // Build SVG Path
  const points = sorted.map((entry, idx) => ({
    x: getX(idx),
    y: getY(entry.weightKg),
  }));

  const linePath = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`
    : '';

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.preTitle}>BODY COMPOSITION</Text>
          <Text style={styles.title}>Weight Trend</Text>
        </View>

        <View style={[styles.deltaPill, isLoss ? styles.deltaLoss : styles.deltaGain]}>
          {isLoss ? (
            <TrendingDown size={14} color={colors.primary} />
          ) : (
            <TrendingUp size={14} color={colors.accentOrange} />
          )}
          <Text style={[styles.deltaText, isLoss ? { color: colors.primary } : { color: colors.accentOrange }]}>
            {delta > 0 ? `+${delta}` : delta} kg total
          </Text>
        </View>
      </View>

      {/* Main Stat & Target */}
      <View style={styles.statRow}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{currentWeight} kg</Text>
          <Text style={styles.statLbl}>Current Weight</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: colors.secondaryLight }]}>{targetWeightKg} kg</Text>
          <Text style={styles.statLbl}>Target Goal</Text>
        </View>
      </View>

      {/* Apple Health style SVG Chart */}
      <View style={styles.chartContainer}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <SvgGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#00F59B" stopOpacity="0.35" />
              <Stop offset="100%" stopColor="#00F59B" stopOpacity="0.0" />
            </SvgGradient>
          </Defs>

          {/* Grid Guideline for Target */}
          <Line
            x1={padX}
            y1={getY(targetWeightKg)}
            x2={width - padX}
            y2={getY(targetWeightKg)}
            stroke="rgba(56, 189, 248, 0.3)"
            strokeDasharray="4, 4"
            strokeWidth="1"
          />

          {/* Area Fill */}
          {areaPath ? <Path d={areaPath} fill="url(#weightAreaGrad)" /> : null}

          {/* Trend Line */}
          {linePath ? (
            <Path
              d={linePath}
              stroke="#00F59B"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          {/* Glowing Points */}
          {points.map((pt, idx) => (
            <Circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={idx === points.length - 1 ? 5 : 3.5}
              fill="#00F59B"
              stroke="#0E1320"
              strokeWidth="2"
            />
          ))}
        </Svg>
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
    marginBottom: theme.spacing.sm,
  },
  preTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    gap: 4,
  },
  deltaLoss: {
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    borderColor: 'rgba(0, 245, 155, 0.3)',
  },
  deltaGain: {
    backgroundColor: 'rgba(255, 107, 0, 0.12)',
    borderColor: 'rgba(255, 107, 0, 0.3)',
  },
  deltaText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: theme.borderRadius.sm,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  statLbl: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 4,
  },
});
