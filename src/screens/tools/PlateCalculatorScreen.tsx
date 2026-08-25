import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, Plus, Minus, Flame, Sparkles, Zap, ChevronRight } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { BarbellVisualizer } from '../../components/tools/BarbellVisualizer';
import { ScreenGradient } from '../../components/common/ScreenGradient';

export const PlateCalculatorScreen: React.FC = () => {
  const [targetWeight, setTargetWeight] = useState<number>(100);
  const barWeight = 20;

  const handleBump = (delta: number) => {
    setTargetWeight((prev) => Math.max(barWeight, Math.round((prev + delta) * 2) / 2));
  };

  const presets = [
    { label: '60 kg OHP', weight: 60 },
    { label: '100 kg Bench', weight: 100 },
    { label: '140 kg Squat', weight: 140 },
    { label: '180 kg Deadlift', weight: 180 },
  ];

  // Warmup Sets Generator
  const warmupSteps = [
    { stage: 'Stage 1: Joint & Groove', percent: 0, weight: barWeight, reps: '10-12 reps', rest: '45s', note: 'Focus on bar path & breathing' },
    { stage: 'Stage 2: Moderate Load', percent: 40, weight: Math.max(barWeight, Math.round((targetWeight * 0.4) / 2.5) * 2.5), reps: '8 reps', rest: '60s', note: 'Smooth cadence' },
    { stage: 'Stage 3: Explosive Speed', percent: 60, weight: Math.max(barWeight, Math.round((targetWeight * 0.6) / 2.5) * 2.5), reps: '5 reps', rest: '90s', note: 'Max concentric power' },
    { stage: 'Stage 4: CNS Priming', percent: 80, weight: Math.max(barWeight, Math.round((targetWeight * 0.8) / 2.5) * 2.5), reps: '3 reps', rest: '120s', note: 'Zero fatigue, feel load' },
    { stage: 'Stage 5: Top Working Set', percent: 100, weight: targetWeight, reps: '5-8 reps', rest: '180s', note: 'Target intensity (RPE 8.5)' },
  ];

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Barbell Plate Math & Warmup</Text>
            <Text style={styles.subtitle}>Instant Olympic sleeve visualizer & loading sets</Text>
          </View>
          <StatBadge label="20kg Bar" color={colors.primary} size="sm" />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Main Weight Input Card */}
          <GlassCard style={styles.weightCard} glow glowColor={colors.primary}>
            <Text style={styles.targetHeading}>Target Working Weight</Text>
            <View style={styles.weightDisplayRow}>
              <TouchableOpacity style={styles.bumpBtn} onPress={() => handleBump(-5)} activeOpacity={0.7}>
                <Minus size={20} color={colors.textPrimary} />
              </TouchableOpacity>

              <View style={styles.weightNumberBox}>
                <Text style={styles.weightNumber}>{targetWeight}</Text>
                <Text style={styles.weightUnit}>KG</Text>
              </View>

              <TouchableOpacity style={styles.bumpBtn} onPress={() => handleBump(5)} activeOpacity={0.7}>
                <Plus size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Quick Micro Adjusters */}
            <View style={styles.microButtonsRow}>
              <TouchableOpacity style={styles.microBtn} onPress={() => handleBump(-2.5)}>
                <Text style={styles.microText}>-2.5 kg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.microBtn} onPress={() => handleBump(-1.25)}>
                <Text style={styles.microText}>-1.25 kg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.microBtn} onPress={() => handleBump(1.25)}>
                <Text style={styles.microText}>+1.25 kg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.microBtn} onPress={() => handleBump(2.5)}>
                <Text style={styles.microText}>+2.5 kg</Text>
              </TouchableOpacity>
            </View>

            {/* Preset Buttons */}
            <View style={styles.presetsRow}>
              {presets.map((p) => (
                <TouchableOpacity
                  key={p.label}
                  style={[styles.presetChip, targetWeight === p.weight && styles.presetChipActive]}
                  onPress={() => setTargetWeight(p.weight)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.presetText, targetWeight === p.weight && styles.presetTextActive]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>

          {/* Barbell Olympic Visualizer Sleeve */}
          <BarbellVisualizer targetWeightKg={targetWeight} barWeightKg={barWeight} />

          {/* Biomechanical Warmup Ramp Protocol */}
          <GlassCard style={styles.warmupCard}>
            <View style={styles.warmupHeader}>
              <View style={styles.warmupTitleRow}>
                <Zap size={18} color={colors.primary} />
                <Text style={styles.cardTitle}>CNS Warm-up Ramp Protocol</Text>
              </View>
              <StatBadge label="5 Stage Ramp" color={colors.primary} size="sm" />
            </View>

            <View style={styles.warmupStepsList}>
              {warmupSteps.map((s, idx) => (
                <View key={idx} style={styles.warmupStepRow}>
                  <View style={styles.stageIndicator}>
                    <Text style={styles.stageNumber}>{idx + 1}</Text>
                  </View>
                  <View style={styles.stageInfo}>
                    <View style={styles.stageTop}>
                      <Text style={styles.stageName}>{s.stage}</Text>
                      <Text style={styles.stageWeightBadge}>{s.weight} kg</Text>
                    </View>
                    <Text style={styles.stageMeta}>
                      {s.reps} · Rest {s.rest} · {s.note}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  weightCard: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: 14,
  },
  targetHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  weightDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  bumpBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  weightNumberBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  weightNumber: {
    fontSize: 44,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  weightUnit: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  microButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  microBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  microText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginTop: 4,
  },
  presetChip: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  presetChipActive: {
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderColor: colors.primary,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  presetTextActive: {
    color: colors.primary,
    fontWeight: '900',
  },
  warmupCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  warmupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warmupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  warmupStepsList: {
    gap: 8,
  },
  warmupStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 10,
  },
  stageIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageNumber: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.primary,
  },
  stageInfo: {
    flex: 1,
  },
  stageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  stageWeightBadge: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  stageMeta: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
