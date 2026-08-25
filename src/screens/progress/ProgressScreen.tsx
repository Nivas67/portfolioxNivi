import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Trophy, Ruler, Camera, Flame, Award, X, Check, TrendingUp } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { WeightTrendGraph } from '../../components/progress/WeightTrendGraph';
import { OneRmStrengthGraph } from '../../components/progress/OneRmStrengthGraph';
import { useProgressStore } from '../../store/useProgressStore';
import { useGamificationStore } from '../../store/useGamificationStore';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { getTodayDateString } from '../../utils/dateUtils';

export const ProgressScreen: React.FC = () => {
  const {
    weightLogs,
    measurementLogs,
    photoLogs,
    logWeight,
    logMeasurements,
    addPhoto,
  } = useProgressStore();

  const { streak, badges } = useGamificationStore();

  // Modals
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [newWeight, setNewWeight] = useState('82.5');
  const [newBodyFat, setNewBodyFat] = useState('15.0');
  const [weightNote, setWeightNote] = useState('');

  const [showMeasureModal, setShowMeasureModal] = useState(false);
  const [chest, setChest] = useState('108');
  const [waist, setWaist] = useState('81');
  const [arms, setArms] = useState('40.5');
  const [thighs, setThighs] = useState('61.5');

  const latestMeasurement = measurementLogs[measurementLogs.length - 1];

  const handleSaveWeight = () => {
    const w = parseFloat(newWeight);
    if (!isNaN(w)) {
      logWeight(w, parseFloat(newBodyFat) || undefined, weightNote);
      setShowWeightModal(false);
    }
  };

  const handleSaveMeasurements = () => {
    logMeasurements({
      chestCm: parseFloat(chest) || undefined,
      waistCm: parseFloat(waist) || undefined,
      leftArmCm: parseFloat(arms) || undefined,
      rightArmCm: parseFloat(arms) || undefined,
      leftThighCm: parseFloat(thighs) || undefined,
      rightThighCm: parseFloat(thighs) || undefined,
    });
    setShowMeasureModal(false);
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Progress & Analytics</Text>
            <Text style={styles.subtitle}>Weight trend, strength PRs, and body metrics</Text>
          </View>

          <TouchableOpacity
            style={styles.logWeightBtn}
            onPress={() => setShowWeightModal(true)}
            activeOpacity={0.7}
          >
            <Plus size={16} color={colors.textDark} strokeWidth={3} />
            <Text style={styles.logWeightBtnText}>Log Weight</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* 1. Body Weight Trend Graph */}
          <WeightTrendGraph entries={weightLogs} />

          {/* 2. 1RM Strength Progression */}
          <OneRmStrengthGraph />

          {/* 3. Body Measurements Card */}
          <GlassCard style={styles.measureCard} glow glowColor={colors.secondary}>
            <View style={styles.measureHeader}>
              <View style={styles.measureTitleRow}>
                <Ruler size={18} color={colors.secondary} />
                <Text style={styles.cardTitle}>Circumference Metrics</Text>
              </View>
              <TouchableOpacity
                style={styles.logMeasureBtn}
                onPress={() => setShowMeasureModal(true)}
              >
                <Plus size={12} color={colors.secondary} />
                <Text style={styles.logMeasureText}>Update</Text>
              </TouchableOpacity>
            </View>

            {latestMeasurement ? (
              <View style={styles.measureGrid}>
                <View style={styles.measureBox}>
                  <Text style={styles.measureVal}>{latestMeasurement.chestCm || '—'} cm</Text>
                  <Text style={styles.measureLbl}>Chest</Text>
                </View>
                <View style={styles.measureBox}>
                  <Text style={styles.measureVal}>{latestMeasurement.waistCm || '—'} cm</Text>
                  <Text style={styles.measureLbl}>Waist</Text>
                </View>
                <View style={styles.measureBox}>
                  <Text style={styles.measureVal}>{latestMeasurement.leftArmCm || '—'} cm</Text>
                  <Text style={styles.measureLbl}>Arms</Text>
                </View>
                <View style={styles.measureBox}>
                  <Text style={styles.measureVal}>{latestMeasurement.leftThighCm || '—'} cm</Text>
                  <Text style={styles.measureLbl}>Thighs</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.emptyText}>No measurements recorded yet.</Text>
            )}
          </GlassCard>

          {/* 4. Progress Photos Gallery */}
          <GlassCard style={styles.photoCard} glow glowColor={colors.primary}>
            <View style={styles.photoHeader}>
              <View style={styles.photoTitleRow}>
                <Camera size={18} color={colors.primary} />
                <Text style={styles.cardTitle}>Transformation Photos</Text>
              </View>
              <Text style={styles.photoCountText}>{photoLogs.length} photos</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoRow}>
              {photoLogs.map((p) => (
                <View key={p.id} style={styles.photoItem}>
                  <Image source={{ uri: p.photoUri }} style={styles.photoThumb} />
                  <View style={styles.photoOverlay}>
                    <Text style={styles.photoCaption}>{p.caption || 'Progress'}</Text>
                    <Text style={styles.photoWeight}>{p.weightKgAtTime} kg</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </GlassCard>

          {/* 5. Achievement Badges & Milestones */}
          <GlassCard style={styles.badgesCard} glow glowColor={colors.accentYellow}>
            <View style={styles.badgesHeader}>
              <View style={styles.badgeTitleRow}>
                <Award size={18} color={colors.accentYellow} />
                <Text style={styles.cardTitle}>Discipline Badges & PRs</Text>
              </View>
              <Text style={styles.streakStatus}>🔥 {streak.currentStreak} Day Streak</Text>
            </View>

            <View style={styles.badgesGrid}>
              {badges.map((badge) => {
                const isUnlocked = !!badge.unlockedAt;
                return (
                  <View
                    key={badge.id}
                    style={[styles.badgeCard, isUnlocked && styles.badgeCardUnlocked]}
                  >
                    <View
                      style={[
                        styles.badgeIconBox,
                        isUnlocked ? styles.badgeIconUnlocked : styles.badgeIconLocked,
                      ]}
                    >
                      <Trophy
                        size={20}
                        color={isUnlocked ? colors.accentYellow : colors.textMuted}
                      />
                    </View>
                    <Text
                      style={[styles.badgeTitle, isUnlocked && styles.badgeTitleUnlocked]}
                      numberOfLines={1}
                    >
                      {badge.title}
                    </Text>
                    <Text style={styles.badgeReq} numberOfLines={2}>
                      {badge.requirementText}
                    </Text>
                    {!isUnlocked && (
                      <View style={styles.badgeProgressBar}>
                        <View
                          style={[
                            styles.badgeProgressFill,
                            { width: `${badge.progress * 100}%` },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </GlassCard>
        </ScrollView>

        {/* Modal 1: Log Weight */}
        <Modal visible={showWeightModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.primary}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Log Morning Weight</Text>
                <TouchableOpacity onPress={() => setShowWeightModal(false)}>
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.modalLabel}>Scale Weight (kg)</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={newWeight}
                  onChangeText={setNewWeight}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.modalLabel}>Body Fat Estimate (%) [Optional]</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={newBodyFat}
                  onChangeText={setNewBodyFat}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.modalLabel}>Condition Notes (e.g. Fasted)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g. Morning fasted, post-water"
                  placeholderTextColor={colors.textMuted}
                  value={weightNote}
                  onChangeText={setWeightNote}
                />
              </View>

              <TouchableOpacity style={styles.saveModalBtn} onPress={handleSaveWeight} activeOpacity={0.88}>
                <Check size={18} color={colors.textDark} strokeWidth={3} />
                <Text style={styles.saveModalBtnText}>Save Scale Log</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>

        {/* Modal 2: Log Circumference */}
        <Modal visible={showMeasureModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.secondary}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Update Tape Measurements</Text>
                <TouchableOpacity onPress={() => setShowMeasureModal(false)}>
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.measureRowInputs}>
                <View style={styles.measureInputItem}>
                  <Text style={styles.modalLabel}>Chest (cm)</Text>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={chest}
                    onChangeText={setChest}
                  />
                </View>
                <View style={styles.measureInputItem}>
                  <Text style={styles.modalLabel}>Waist (cm)</Text>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={waist}
                    onChangeText={setWaist}
                  />
                </View>
              </View>

              <View style={styles.measureRowInputs}>
                <View style={styles.measureInputItem}>
                  <Text style={styles.modalLabel}>Arms (cm)</Text>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={arms}
                    onChangeText={setArms}
                  />
                </View>
                <View style={styles.measureInputItem}>
                  <Text style={styles.modalLabel}>Thighs (cm)</Text>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={thighs}
                    onChangeText={setThighs}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveModalBtn} onPress={handleSaveMeasurements} activeOpacity={0.88}>
                <Check size={18} color={colors.textDark} strokeWidth={3} />
                <Text style={styles.saveModalBtnText}>Save Measurements</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>
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
  logWeightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    gap: 4,
    ...theme.shadows.glowMint,
  },
  logWeightBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textDark,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  measureCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  measureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  measureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  logMeasureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  logMeasureText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.secondary,
  },
  measureGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  measureBox: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  measureVal: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  measureLbl: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  photoCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoCountText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  photoRow: {
    gap: 10,
  },
  photoItem: {
    width: 110,
    height: 140,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  photoThumb: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    padding: 4,
    alignItems: 'center',
  },
  photoCaption: {
    fontSize: 10,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  photoWeight: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: '800',
  },
  badgesCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  badgesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakStatus: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.accentYellow,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgeCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    gap: 4,
  },
  badgeCardUnlocked: {
    borderColor: 'rgba(251, 191, 36, 0.35)',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
  },
  badgeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  badgeIconUnlocked: {
    backgroundColor: 'rgba(251, 191, 36, 0.18)',
  },
  badgeIconLocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  badgeTitleUnlocked: {
    color: colors.textPrimary,
  },
  badgeReq: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },
  badgeProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  badgeProgressFill: {
    height: '100%',
    backgroundColor: colors.accentYellow,
  },
  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalCard: {
    padding: theme.spacing.lg,
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  inputGroup: {
    gap: 4,
  },
  modalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  modalInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    padding: 10,
  },
  measureRowInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  measureInputItem: {
    flex: 1,
    gap: 4,
  },
  saveModalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    gap: 6,
    marginTop: 4,
    ...theme.shadows.glowMint,
  },
  saveModalBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textDark,
  },
});
