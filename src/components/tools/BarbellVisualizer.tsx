import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Line, G } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface PlateConfig {
  weight: number;
  color: string;
  height: number;
  count: number;
}

interface BarbellVisualizerProps {
  targetWeightKg: number;
  barWeightKg?: number;
}

export const BarbellVisualizer: React.FC<BarbellVisualizerProps> = ({
  targetWeightKg,
  barWeightKg = 20,
}) => {
  const plateWeightPerSide = Math.max(0, (targetWeightKg - barWeightKg) / 2);

  // Available Olympic Plates (kg)
  const plateTypes = [
    { weight: 25, color: '#EF4444', height: 110, width: 14, name: '25kg' }, // Red
    { weight: 20, color: '#3B82F6', height: 100, width: 14, name: '20kg' }, // Blue
    { weight: 15, color: '#EAB308', height: 90, width: 12, name: '15kg' },  // Yellow
    { weight: 10, color: '#22C55E', height: 80, width: 12, name: '10kg' },  // Green
    { weight: 5, color: '#FFFFFF', height: 65, width: 10, name: '5kg' },    // White
    { weight: 2.5, color: '#94A3B8', height: 50, width: 8, name: '2.5kg' },  // Silver
    { weight: 1.25, color: '#64748B', height: 40, width: 7, name: '1.25kg' },// Grey
  ];

  let remaining = plateWeightPerSide;
  const loadedPlates: { weight: number; color: string; height: number; width: number; name: string }[] = [];

  for (const p of plateTypes) {
    while (remaining >= p.weight - 0.001) {
      loadedPlates.push(p);
      remaining -= p.weight;
      remaining = Math.round(remaining * 100) / 100;
    }
  }

  return (
    <View style={styles.container}>
      {/* SVG Barbell & Sleeve */}
      <View style={styles.svgWrapper}>
        <Svg width="320" height="130" viewBox="0 0 320 130">
          {/* Main Bar Shaft */}
          <Rect x="0" y="60" width="80" height="10" rx="3" fill="#64748B" />
          {/* Bar Collar Stop */}
          <Rect x="80" y="48" width="12" height="34" rx="2" fill="#94A3B8" />
          {/* Sleeve Shaft */}
          <Rect x="92" y="58" width="220" height="14" rx="2" fill="#475569" />

          {/* Render Loaded Plates on Sleeve */}
          {(() => {
            let currentX = 96;
            return loadedPlates.map((plate, index) => {
              const plateY = 65 - plate.height / 2;
              const xPos = currentX;
              currentX += plate.width + 4;

              return (
                <G key={index}>
                  <Rect
                    x={xPos}
                    y={plateY}
                    width={plate.width}
                    height={plate.height}
                    rx="3"
                    fill={plate.color}
                    stroke="#000000"
                    strokeWidth="1"
                  />
                  {/* Subtle specular sheen stripe */}
                  <Line
                    x1={xPos + 2}
                    y1={plateY + 4}
                    x2={xPos + 2}
                    y2={plateY + plate.height - 4}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                  />
                </G>
              );
            });
          })()}
        </Svg>
      </View>

      {/* Plate Count Badges */}
      <View style={styles.platesListRow}>
        <Text style={styles.perSideLabel}>
          Per Side ({plateWeightPerSide} kg):
        </Text>
        <View style={styles.badgeWrap}>
          {loadedPlates.length === 0 ? (
            <Text style={styles.emptyBarText}>Empty Bar (20 kg)</Text>
          ) : (
            loadedPlates.map((p, idx) => (
              <View key={idx} style={[styles.platePill, { borderColor: p.color }]}>
                <View style={[styles.plateDot, { backgroundColor: p.color }]} />
                <Text style={styles.platePillText}>{p.name}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 10, 20, 0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 4,
    width: '100%',
  },
  platesListRow: {
    width: '100%',
    gap: 6,
  },
  perSideLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  platePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  plateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  platePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  emptyBarText: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
