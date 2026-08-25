import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X, Plus, Clock, Dumbbell, Flame, Trophy, Star, ChevronLeft, ChevronRight, Zap } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { SetRowItem } from '../../components/workouts/SetRowItem';
import { RestTimerBar } from '../../components/workouts/RestTimerBar';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { formatSecondsToTimer } from '../../utils/dateUtils';
import { getProgressionSuggestion, calculateTotalVolumeKg } from '../../utils/strengthCalculators';

interface LiveWorkoutScreenProps {
  onClose: () => void;
  onOpenLibraryForAdd?: () => void;
}

export const LiveWorkoutScreen: React.FC<LiveWorkoutScreenProps> = ({
  onClose,
  onOpenLibraryForAdd,
}) => {
  const {
    activeSession,
    logSet,
    toggleSetCompleted,
    addSetToExercise,
    removeSetFromExercise,
    setCurrentExerciseIndex,
    finishWorkoutSession,
    cancelWorkoutSession,
    addExerciseToSession,
    startRestTimer,
  } = useWorkoutStore();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [workoutRating, setWorkoutRating] = useState(5);
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [finishedSummary, setFinishedSummary] = useState<any>(null);

  // Timer ticker for live session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeSession || activeSession.exercises.length === 0) {
    return (
      <ScreenGradient>
        <SafeAreaView style={styles.container}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active live workout session.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Return to Workouts</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScreenGradient>
    );
  }

  const activeIndex = activeSession.currentExerciseIndex || 0;
  const currentExercise = activeSession.exercises[activeIndex] || activeSession.exercises[0];

  // Auto-progression suggestion based on completed sets
  const completedSets = currentExercise.sets.filter((s) => s.completed);
  const lastCompletedSet = completedSets[completedSets.length - 1];
  const progression = lastCompletedSet
    ? getProgressionSuggestion(lastCompletedSet.weightKg, lastCompletedSet.reps, 10)
    : null;

  const handleFinishPrompt = () => {
    setShowFinishModal(true);
  };

  const handleConfirmFinish = () => {
    const log = finishWorkoutSession(workoutNotes, workoutRating);
    setShowFinishModal(false);
    if (log) {
      setFinishedSummary(log);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    cancelWorkoutSession();
    onClose();
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.discardBtn} onPress={handleDiscard} activeOpacity={0.7}>
            <X size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.sessionHeaderCenter}>
            <Text style={styles.sessionDayName} numberOfLines={1}>
              {activeSession.dayName}
            </Text>
            <View style={styles.durationRow}>
              <Clock size={12} color={colors.primary} />
              <Text style={styles.durationText}>{formatSecondsToTimer(elapsedSeconds)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.finishBtn} onPress={handleFinishPrompt} activeOpacity={0.85}>
            <Check size={16} color={colors.textDark} strokeWidth={3} />
            <Text style={styles.finishBtnText}>Finish</Text>
          </TouchableOpacity>
        </View>

        {/* Exercise Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {activeSession.exercises.map((ex, idx) => {
              const isCurrent = idx === activeIndex;
              const completedCount = ex.sets.filter((s) => s.completed).length;
              const allDone = completedCount === ex.sets.length && ex.sets.length > 0;

              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.tabItem,
                    isCurrent && styles.tabItemActive,
                    allDone && styles.tabItemDone,
                  ]}
                  onPress={() => setCurrentExerciseIndex(idx)}
                >
                  <Text style={[styles.tabIndex, isCurrent && styles.tabIndexActive]}>
                    {idx + 1}
                  </Text>
                  <Text
                    style={[styles.tabName, isCurrent && styles.tabNameActive]}
                    numberOfLines={1}
                  >
                    {ex.exerciseName}
                  </Text>
                  <Text style={styles.tabBadge}>
                    {completedCount}/{ex.sets.length}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Active Exercise Header Card */}
          <GlassCard style={styles.exerciseHeaderCard} glow glowColor={colors.primary}>
            <View style={styles.exTopRow}>
              <View style={styles.exTitleArea}>
                <Text style={styles.exNumberLabel}>Exercise {activeIndex + 1} of {activeSession.exercises.length}</Text>
                <Text style={styles.exName}>{currentExercise.exerciseName}</Text>
              </View>
              <StatBadge label={currentExercise.primaryMuscle} color={colors.primary} />
            </View>

            {/* Progressive Overload Suggestion */}
            {progression && progression.shouldIncrease && (
              <View style={styles.overloadBanner}>
                <Zap size={16} color={colors.primary} />
                <Text style={styles.overloadText}>{progression.message}</Text>
              </View>
            )}
          </GlassCard>

          {/* Set Logging Table */}
          <View style={styles.tableCard}>
            {/* Table Column Headers */}
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.colHeader, { width: 28 }]}>SET</Text>
              <Text style={[styles.colHeader, { flex: 1.1 }]}>PREVIOUS</Text>
              <Text style={[styles.colHeader, { flex: 1.2 }]}>WEIGHT</Text>
              <Text style={[styles.colHeader, { flex: 1.2 }]}>REPS</Text>
              <Text style={[styles.colHeader, { width: 38 }]}>RPE</Text>
              <Text style={[styles.colHeader, { width: 36, textAlign: 'center' }]}>✓</Text>
            </View>

            {/* Set Rows */}
            {currentExercise.sets.map((set, setIdx) => (
              <SetRowItem
                key={set.setNumber}
                set={set}
                onToggleComplete={() => toggleSetCompleted(activeIndex, setIdx)}
                onChangeWeight={(w) => logSet(activeIndex, setIdx, w, set.reps, set.rpe)}
                onChangeReps={(r) => logSet(activeIndex, setIdx, set.weightKg, r, set.rpe)}
                onChangeRpe={(rpe) => logSet(activeIndex, setIdx, set.weightKg, set.reps, rpe)}
                onDelete={() => removeSetFromExercise(activeIndex, setIdx)}
              />
            ))}

            {/* Add Set Button */}
            <TouchableOpacity
              style={styles.addSetBtn}
              onPress={() => addSetToExercise(activeIndex)}
              activeOpacity={0.7}
            >
              <Plus size={16} color={colors.primary} />
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>
          </View>

          {/* Exercise Quick Navigation Prev / Next */}
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navBtn, activeIndex === 0 && styles.navBtnDisabled]}
              disabled={activeIndex === 0}
              onPress={() => setCurrentExerciseIndex(Math.max(0, activeIndex - 1))}
            >
              <ChevronLeft size={18} color={activeIndex === 0 ? colors.textMuted : colors.textPrimary} />
              <Text style={[styles.navBtnText, activeIndex === 0 && styles.textMutedColor]}>
                Previous Exercise
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navBtn,
                activeIndex === activeSession.exercises.length - 1 && styles.navBtnDisabled,
              ]}
              disabled={activeIndex === activeSession.exercises.length - 1}
              onPress={() =>
                setCurrentExerciseIndex(
                  Math.min(activeSession.exercises.length - 1, activeIndex + 1)
                )
              }
            >
              <Text
                style={[
                  styles.navBtnText,
                  activeIndex === activeSession.exercises.length - 1 && styles.textMutedColor,
                ]}
              >
                Next Exercise
              </Text>
              <ChevronRight
                size={18}
                color={
                  activeIndex === activeSession.exercises.length - 1
                    ? colors.textMuted
                    : colors.textPrimary
                }
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Floating / Sticky Rest Timer Bar */}
        <RestTimerBar />

        {/* Finish Workout Confirmation & Summary Modal */}
        <Modal visible={showFinishModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.primary}>
              <View style={styles.modalHeader}>
                <Trophy size={28} color={colors.primary} />
                <Text style={styles.modalTitle}>Complete Workout Session?</Text>
              </View>

              <Text style={styles.modalSubtitle}>
                Great effort today! Rate your session and lock in your tonnage volume.
              </Text>

              {/* Rating Stars */}
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setWorkoutRating(star)}>
                    <Star
                      size={28}
                      color={star <= workoutRating ? colors.accentYellow : colors.cardBorder}
                      fill={star <= workoutRating ? colors.accentYellow : 'transparent'}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Session Notes */}
              <TextInput
                style={styles.notesInput}
                placeholder="Session notes (e.g. 'Felt great on bench, hit all top sets')"
                placeholderTextColor={colors.textMuted}
                multiline
                value={workoutNotes}
                onChangeText={setWorkoutNotes}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelModalBtn}
                  onPress={() => setShowFinishModal(false)}
                >
                  <Text style={styles.cancelModalText}>Keep Training</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveModalBtn}
                  onPress={handleConfirmFinish}
                >
                  <Text style={styles.saveModalText}>Lock & Save</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
        </Modal>

        {/* Post-Workout Trophy Celebration Card */}
        {finishedSummary && (
          <Modal visible={true} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <GlassCard style={styles.summaryCard} glow glowColor={colors.primary}>
                <View style={styles.summaryTop}>
                  <View style={styles.trophyCircle}>
                    <Trophy size={36} color={colors.accentYellow} />
                  </View>
                  <Text style={styles.summaryTitle}>Session Crushed!</Text>
                  <Text style={styles.summarySubtitle}>{finishedSummary.dayName}</Text>
                </View>

                <View style={styles.summaryStatsGrid}>
                  <View style={styles.sumStatBox}>
                    <Text style={styles.sumStatVal}>{finishedSummary.totalVolumeKg} kg</Text>
                    <Text style={styles.sumStatLabel}>Total Volume</Text>
                  </View>
                  <View style={styles.sumStatBox}>
                    <Text style={styles.sumStatVal}>{finishedSummary.totalSets} Sets</Text>
                    <Text style={styles.sumStatLabel}>Completed</Text>
                  </View>
                  <View style={styles.sumStatBox}>
                    <Text style={styles.sumStatVal}>{formatSecondsToTimer(finishedSummary.durationSeconds)}</Text>
                    <Text style={styles.sumStatLabel}>Duration</Text>
                  </View>
                  <View style={styles.sumStatBox}>
                    <Text style={[styles.sumStatVal, { color: colors.accentOrange }]}>
                      🔥 {finishedSummary.caloriesBurnedEstimate} kcal
                    </Text>
                    <Text style={styles.sumStatLabel}>Est. Burned</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.summaryDoneBtn}
                  onPress={() => {
                    setFinishedSummary(null);
                    onClose();
                  }}
                >
                  <Text style={styles.summaryDoneBtnText}>Done & Review Stats</Text>
                </TouchableOpacity>
              </GlassCard>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  closeBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDark,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  discardBtn: {
    padding: 8,
  },
  sessionHeaderCenter: {
    alignItems: 'center',
    maxWidth: 220,
  },
  sessionDayName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    gap: 4,
    ...theme.shadows.glowMint,
  },
  finishBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textDark,
  },
  tabsContainer: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  tabsScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: 6,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  tabItemActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
  },
  tabItemDone: {
    borderColor: 'rgba(57, 255, 136, 0.4)',
  },
  tabIndex: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  tabIndexActive: {
    color: colors.primary,
  },
  tabName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    maxWidth: 100,
  },
  tabNameActive: {
    color: colors.textPrimary,
  },
  tabBadge: {
    fontSize: 10,
    color: colors.textMuted,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 110,
  },
  exerciseHeaderCard: {
    padding: theme.spacing.md,
    gap: 10,
  },
  exTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exTitleArea: {
    flex: 1,
    paddingRight: 8,
  },
  exNumberLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  exName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 2,
  },
  overloadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    padding: 8,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    gap: 6,
  },
  overloadText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
    flex: 1,
  },
  tableCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 4,
  },
  colHeader: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(57, 255, 136, 0.08)',
    borderRadius: theme.borderRadius.sm,
    marginTop: 8,
    gap: 6,
  },
  addSetText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  textMutedColor: {
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    padding: theme.spacing.lg,
    gap: 14,
  },
  modalHeader: {
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  notesInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 13,
    padding: 10,
    minHeight: 60,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelModalBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cancelModalText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  saveModalBtn: {
    flex: 1.2,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.glowMint,
  },
  saveModalText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textDark,
  },
  summaryCard: {
    width: '100%',
    maxWidth: 380,
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: 16,
  },
  summaryTop: {
    alignItems: 'center',
    gap: 6,
  },
  trophyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderWidth: 2,
    borderColor: colors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  summarySubtitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  summaryStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  sumStatBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sumStatVal: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  sumStatLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summaryDoneBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.glowMint,
  },
  summaryDoneBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textDark,
  },
});
