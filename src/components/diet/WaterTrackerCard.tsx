import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Droplets, Plus, RotateCcw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../common/GlassCard';
import { useDietStore } from '../../store/useDietStore';
import { getTodayDateString } from '../../utils/dateUtils';

export const WaterTrackerCard: React.FC = () => {
  const { dailyLogs, selectedDate, addWater, setWater } = useDietStore();
  const todayStr = selectedDate || getTodayDateString();
  const dayLog = dailyLogs[todayStr];
  const consumed = dayLog?.waterIntakeMl || 0;
  const target = 3000;
  const progressPercent = Math.min(100, Math.round((consumed / target) * 100));

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <View style={styles.iconCircle}>
            <Droplets size={16} color={colors.water} />
          </View>
          <View>
            <Text style={styles.preTitle}>HYDRATION ENGINE</Text>
            <Text style={styles.title}>Water Intake</Text>
          </View>
        </View>

        <View style={styles.progressPill}>
          <Text style={styles.progressPercentText}>{progressPercent}% Goal</Text>
        </View>
      </View>

      {/* Main Volume Display */}
      <View style={styles.volumeRow}>
        <View style={styles.volumeNumbers}>
          <Text style={styles.currentVolume}>{consumed.toLocaleString()}</Text>
          <Text style={styles.targetVolume}> / {target.toLocaleString()} ml</Text>
        </View>

        {consumed > 0 && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => setWater(todayStr, 0)}
            activeOpacity={0.7}
          >
            <RotateCcw size={13} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Glowing Aqua Water Progress Bar */}
      <View style={styles.barBackground}>
        <LinearGradient
          colors={['#06B6D4', '#0891B2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width: `${progressPercent}%` }]}
        />
      </View>

      {/* Quick Add Tactile Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addWater(todayStr, 250)}
          activeOpacity={0.75}
        >
          <Plus size={14} color={colors.water} />
          <Text style={styles.addBtnText}>+250 ml</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addWater(todayStr, 500)}
          activeOpacity={0.75}
        >
          <Plus size={14} color={colors.water} />
          <Text style={styles.addBtnText}>+500 ml</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addWater(todayStr, 750)}
          activeOpacity={0.75}
        >
          <Plus size={14} color={colors.water} />
          <Text style={styles.addBtnText}>+750 ml</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.water,
    letterSpacing: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  progressPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  progressPercentText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.water,
  },
  volumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  volumeNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentVolume: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  targetVolume: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  resetBtn: {
    padding: 6,
  },
  barBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.22)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    gap: 4,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.water,
  },
});
