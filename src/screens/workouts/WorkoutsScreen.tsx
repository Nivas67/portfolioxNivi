import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Play,
  Dumbbell,
  Plus,
  BookOpen,
  Layers,
  Check,
  ChevronRight,
  Edit3,
  Repeat,
  Trash2,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  X,
  Zap,
  Save,
  Clock,
  Flame,
  Award,
  Crown,
  Scale,
} from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useAuthStore } from '../../store/useAuthStore';
import { WorkoutCalendarWeek } from '../../components/workouts/WorkoutCalendarWeek';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { Exercise, WorkoutExercise, TrainingTier } from '../../types';
import {
  calculatePersonalizedStartingWeights,
  checkTierGraduationNudge,
} from '../../data/workoutTemplates';

interface WorkoutsScreenProps {
  onStartSession: () => void;
  onOpenLibrary: () => void;
  onOpenBuilder: () => void;
}

export const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  onStartSession,
  onOpenLibrary,
  onOpenBuilder,
}) => {
  const { user } = useAuthStore();
  const {
    plans,
    activePlanId,
    setActivePlan,
    selectedDayIndex,
    setSelectedDayIndex,
    exerciseLibrary,
    swapExerciseInDay,
    addExerciseToDay,
    removeExerciseFromDay,
    updateExerciseInDay,
    reorderDaysInPlan,
    resetPlanToDefault,
    saveCustomPlan,
    getProgressiveOverloadAdvice,
  } = useWorkoutStore();

  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [showEditDayModal, setShowEditDayModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTargetIndex, setSwapTargetIndex] = useState<number | null>(null);
  const [swapMuscleFilter, setSwapMuscleFilter] = useState<string>('chest');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentPlan = plans.find((p) => p.id === activePlanId) || plans[0];
  const selectedDay = currentPlan?.days.find((d) => d.dayIndex === selectedDayIndex) || currentPlan?.days[0];

  // Progressive overload advice for lead exercise
  const leadExercise = selectedDay?.exercises[0];
  const overloadAdvice = leadExercise ? getProgressiveOverloadAdvice(leadExercise.exerciseId) : null;

  // Personalized Starting Weights based on Bodyweight & Body Type
  const startingWeights = calculatePersonalizedStartingWeights(
    user?.weightKg || 82,
    user?.bodyType || 'mesomorph',
    currentPlan?.tier || 'intermediate'
  );

  // Auto-Suggest Level-Up Nudge
  const graduationNudge = checkTierGraduationNudge(
    currentPlan?.tier || 'intermediate',
    user?.weightKg || 82,
    100, // estimated Bench 1RM
    130, // estimated Squat 1RM
    160  // estimated Deadlift 1RM
  );

  const handleOpenSwap = (exIndex: number, currentMuscle: string) => {
    setSwapTargetIndex(exIndex);
    setSwapMuscleFilter(currentMuscle || 'chest');
    setShowSwapModal(true);
  };

  const handleSelectSwapExercise = (newEx: Exercise) => {
    if (swapTargetIndex !== null && currentPlan) {
      swapExerciseInDay(currentPlan.id, selectedDayIndex, swapTargetIndex, newEx);
      setShowSwapModal(false);
      setSwapTargetIndex(null);
      Alert.alert('Exercise Swapped', `Replaced with ${newEx.name}`);
    }
  };

  const handleAddExerciseToCurrentDay = (ex: Exercise) => {
    if (currentPlan) {
      addExerciseToDay(currentPlan.id, selectedDayIndex, ex);
      setShowAddModal(false);
      Alert.alert('Added', `${ex.name} added to ${selectedDay?.name}`);
    }
  };

  const handleSaveAsMyPlan = () => {
    if (!currentPlan) return;
    const customPlanName = currentPlan.name.includes('(Custom)') ? currentPlan.name : `${currentPlan.name} (My Plan)`;
    const newPlan = {
      ...currentPlan,
      id: `plan-custom-${Date.now()}`,
      name: customPlanName,
      isCustom: true,
    };
    saveCustomPlan(newPlan);
    Alert.alert('Saved to My Plans', `Saved "${customPlanName}"! You can switch back anytime.`);
  };

  const handleResetCurrentPlan = () => {
    Alert.alert(
      'Reset to Default Split',
      'Are you sure you want to restore the original split template for this tier?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Plan',
          style: 'destructive',
          onPress: () => {
            resetPlanToDefault(currentPlan.id);
            Alert.alert('Reset Complete', 'Default split template restored.');
          },
        },
      ]
    );
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Workout Split & Tiers</Text>
            <TouchableOpacity
              style={styles.planPickerBtn}
              onPress={() => setShowPlanSelector(!showPlanSelector)}
              activeOpacity={0.7}
            >
              <Text style={styles.currentPlanName}>{currentPlan?.name}</Text>
              <Layers size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerButtonsRow}>
            <TouchableOpacity
              style={styles.customizeTopBtn}
              onPress={() => setShowEditDayModal(true)}
              activeOpacity={0.75}
            >
              <Edit3 size={14} color={colors.primary} />
              <Text style={styles.customizeTopBtnText}>Customize</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.libraryBtn}
              onPress={onOpenLibrary}
              activeOpacity={0.75}
            >
              <BookOpen size={15} color={colors.secondary} />
              <Text style={styles.libraryBtnText}>Library</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plan Switcher Dropdown with 4 Tiers */}
        {showPlanSelector && (
          <GlassCard style={styles.planSelectorDropdown} glow glowColor={colors.primary}>
            <Text style={styles.selectorTitle}>Select Training Tier & Split</Text>
            {plans.map((p) => {
              const tierBadgeColor =
                p.tier === 'beginner'
                  ? colors.secondary
                  : p.tier === 'intermediate'
                  ? colors.primary
                  : p.tier === 'advanced'
                  ? colors.accentOrange
                  : colors.accentPurple;

              return (
                <TouchableOpacity
                  key={p.id}
                  style={[
                    styles.planOptionItem,
                    p.id === activePlanId && styles.planOptionActive,
                  ]}
                  onPress={() => {
                    setActivePlan(p.id);
                    setShowPlanSelector(false);
                  }}
                >
                  <View style={styles.planOptionLeft}>
                    <View style={styles.planOptionHeader}>
                      <Text style={[styles.planOptionName, p.id === activePlanId && styles.textPrimaryColor]}>
                        {p.name}
                      </Text>
                      {p.tier && <StatBadge label={p.tier.toUpperCase()} color={tierBadgeColor} size="sm" />}
                    </View>
                    <Text style={styles.planOptionDesc}>{p.description}</Text>
                  </View>
                  {p.id === activePlanId && <Check size={18} color={colors.primary} />}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.createPlanBtn}
              onPress={() => {
                setShowPlanSelector(false);
                onOpenBuilder();
              }}
            >
              <Plus size={16} color={colors.primary} />
              <Text style={styles.createPlanText}>Create Brand New Custom Split</Text>
            </TouchableOpacity>
          </GlassCard>
        )}

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Strength Standards Graduation Nudge */}
          {graduationNudge.shouldNudge && (
            <GlassCard style={styles.graduationCard} glow glowColor={colors.accentYellow}>
              <View style={styles.graduationHeader}>
                <Award size={18} color={colors.accentYellow} />
                <Text style={styles.graduationTitle}>Strength Milestone Achieved!</Text>
              </View>
              <Text style={styles.graduationBody}>{graduationNudge.message}</Text>
              <TouchableOpacity
                style={styles.graduateActionBtn}
                onPress={() => {
                  const targetPlan = plans.find((p) => p.tier === graduationNudge.recommendedTier);
                  if (targetPlan) {
                    setActivePlan(targetPlan.id);
                    Alert.alert('Tier Upgraded!', `Switched to ${targetPlan.name}`);
                  }
                }}
              >
                <Crown size={14} color={colors.textDark} />
                <Text style={styles.graduateActionText}>
                  Upgrade to {graduationNudge.recommendedTier.toUpperCase()} Split
                </Text>
              </TouchableOpacity>
            </GlassCard>
          )}

          {/* 7-Day Week Calendar */}
          <WorkoutCalendarWeek
            plan={currentPlan}
            selectedDayIndex={selectedDayIndex}
            onSelectDayIndex={setSelectedDayIndex}
          />

          {/* Periodization Block Indicator (For Master Tier) */}
          {currentPlan.currentBlockWeek && (
            <GlassCard style={styles.periodizationCard}>
              <View style={styles.periodizationTop}>
                <Flame size={16} color={colors.accentOrange} />
                <Text style={styles.periodizationTitle}>
                  PERIODIZATION WAVE · WEEK {currentPlan.currentBlockWeek} OF {currentPlan.totalBlockWeeks}
                </Text>
              </View>
              <Text style={styles.periodizationSub}>
                Hypertrophy Volume Accumulation Phase (Target RPE 8.5–9.0). Deload scheduled on Week 5.
              </Text>
            </GlassCard>
          )}

          {/* Progressive Overload Coach Banner */}
          {overloadAdvice && overloadAdvice.shouldIncrease && (
            <GlassCard style={styles.overloadBanner} glow glowColor={colors.primary}>
              <View style={styles.overloadHeader}>
                <Zap size={18} color={colors.primary} fill={colors.primary} />
                <Text style={styles.overloadTitle}>Coach Nivi's Progressive Overload Cue</Text>
              </View>
              <Text style={styles.overloadBody}>{overloadAdvice.recommendation}</Text>
            </GlassCard>
          )}

          {/* Selected Day Overview */}
          {selectedDay?.isRestDay ? (
            <GlassCard style={styles.restCard}>
              <Text style={styles.restDayBigTitle}>🛌 Scheduled Rest & Muscle Recovery</Text>
              <Text style={styles.restDayText}>
                No heavy lifting programmed today. Hydrate well, hit your daily protein target ({user?.weightKg ? Math.round(user.weightKg * 2.2) : 180}g), and allow muscle fibers to repair.
              </Text>
            </GlassCard>
          ) : (
            <View style={styles.dayDetailsContainer}>
              <GlassCard style={styles.dayHeaderCard} glow glowColor={colors.primary}>
                <View style={styles.dayHeaderTop}>
                  <View>
                    <Text style={styles.daySubLabel}>Day {selectedDayIndex + 1} of Split · {currentPlan.tier?.toUpperCase()} TIER</Text>
                    <Text style={styles.dayTitle}>{selectedDay?.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editPencilBadge}
                    onPress={() => setShowEditDayModal(true)}
                  >
                    <Edit3 size={13} color={colors.primary} />
                    <Text style={styles.editPencilText}>Edit Day</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.muscleTagsRow}>
                  {selectedDay?.targetMuscleGroups.map((m) => (
                    <StatBadge key={m} label={m} color={colors.secondary} size="sm" />
                  ))}
                  <StatBadge
                    label={`${selectedDay?.exercises.length || 0} Exercises`}
                    color={colors.primary}
                    size="sm"
                  />
                </View>

                {/* Primary Action Button */}
                <TouchableOpacity
                  style={styles.startSessionBtn}
                  onPress={onStartSession}
                  activeOpacity={0.88}
                >
                  <Play size={18} color={colors.textDark} fill={colors.textDark} />
                  <Text style={styles.startSessionBtnText}>Start Live Workout Session</Text>
                </TouchableOpacity>
              </GlassCard>

              {/* Planned Exercises List */}
              <View style={styles.exerciseSectionHeader}>
                <Text style={styles.exerciseSectionTitle}>Planned Exercises ({selectedDay?.exercises.length})</Text>
                <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addExQuickBtn}>
                  <Plus size={14} color={colors.primary} />
                  <Text style={styles.addExQuickText}>Add Exercise</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exercisesList}>
                {selectedDay?.exercises.map((ex, index) => {
                  const def = exerciseLibrary.find((e) => e.id === ex.exerciseId);
                  return (
                    <GlassCard key={index} style={styles.exerciseCard}>
                      <View style={styles.exerciseCardNumber}>
                        <Text style={styles.exIndexText}>{index + 1}</Text>
                      </View>
                      <View style={styles.exCardContent}>
                        <View style={styles.exCardNameRow}>
                          <Text style={styles.exCardName}>
                            {ex.customName || def?.name || 'Exercise'}
                          </Text>
                          {ex.intensityTechnique && ex.intensityTechnique !== 'straight_set' && (
                            <StatBadge
                              label={ex.intensityTechnique.replace('_', ' ').toUpperCase()}
                              color={colors.accentOrange}
                              size="sm"
                            />
                          )}
                        </View>

                        <Text style={styles.exCardDetails}>
                          {ex.targetSets} Sets × {ex.targetReps} reps · {ex.restSeconds}s rest
                        </Text>
                        {ex.notes && (
                          <Text style={styles.exCardNotes}>💡 {ex.notes}</Text>
                        )}
                      </View>

                      {/* Quick Swap Button */}
                      <TouchableOpacity
                        style={styles.swapActionBtn}
                        onPress={() => handleOpenSwap(index, def?.primaryMuscle || 'chest')}
                        activeOpacity={0.75}
                      >
                        <Repeat size={13} color={colors.primary} />
                        <Text style={styles.swapActionText}>Swap</Text>
                      </TouchableOpacity>
                    </GlassCard>
                  );
                })}
              </View>

              {/* Body-Relative Personalized Starting Weights Guide */}
              <GlassCard style={styles.startingWeightsCard}>
                <View style={styles.startingWeightsHeader}>
                  <Scale size={16} color={colors.primary} />
                  <Text style={styles.startingWeightsTitle}>Personalized Starting Weights (Bodyweight {user?.weightKg || 82}kg)</Text>
                </View>
                <View style={styles.startingWeightsGrid}>
                  <View style={styles.weightPill}>
                    <Text style={styles.weightPillVal}>{startingWeights.barbellBenchPressKg} kg</Text>
                    <Text style={styles.weightPillLbl}>Bench Press</Text>
                  </View>
                  <View style={styles.weightPill}>
                    <Text style={styles.weightPillVal}>{startingWeights.barbellBackSquatKg} kg</Text>
                    <Text style={styles.weightPillLbl}>Squat</Text>
                  </View>
                  <View style={styles.weightPill}>
                    <Text style={styles.weightPillVal}>{startingWeights.barbellDeadliftKg} kg</Text>
                    <Text style={styles.weightPillLbl}>Deadlift</Text>
                  </View>
                  <View style={styles.weightPill}>
                    <Text style={styles.weightPillVal}>{startingWeights.overheadPressKg} kg</Text>
                    <Text style={styles.weightPillLbl}>OHP</Text>
                  </View>
                </View>
              </GlassCard>

              {/* Plan Customization Toolbar */}
              <View style={styles.planActionsRow}>
                <TouchableOpacity
                  style={styles.saveMyPlanBtn}
                  onPress={handleSaveAsMyPlan}
                  activeOpacity={0.8}
                >
                  <Save size={14} color={colors.primary} />
                  <Text style={styles.saveMyPlanText}>Save as "My Plan"</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resetPlanBtn}
                  onPress={handleResetCurrentPlan}
                  activeOpacity={0.8}
                >
                  <RotateCcw size={14} color={colors.textSecondary} />
                  <Text style={styles.resetPlanText}>Reset to Default</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Modal 1: Edit Day & Customize Sets/Reps/Rest */}
        <Modal visible={showEditDayModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.primary}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Customize Day {selectedDayIndex + 1}</Text>
                  <Text style={styles.modalSub}>{selectedDay?.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowEditDayModal(false)}>
                  <X size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                <View style={styles.editExerciseList}>
                  {selectedDay?.exercises.map((ex, index) => {
                    const def = exerciseLibrary.find((e) => e.id === ex.exerciseId);
                    return (
                      <View key={index} style={styles.editExerciseRow}>
                        <View style={styles.editExerciseInfo}>
                          <Text style={styles.editExName}>{ex.customName || def?.name}</Text>
                          
                          {/* Sets, Reps & Rest Steppers */}
                          <View style={styles.steppersRow}>
                            <View style={styles.stepperPill}>
                              <Text style={styles.stepperLabel}>Sets:</Text>
                              <TouchableOpacity
                                onPress={() => updateExerciseInDay(currentPlan.id, selectedDayIndex, index, { targetSets: Math.max(1, ex.targetSets - 1) })}
                              >
                                <Text style={styles.stepperMinus}>-</Text>
                              </TouchableOpacity>
                              <Text style={styles.stepperValue}>{ex.targetSets}</Text>
                              <TouchableOpacity
                                onPress={() => updateExerciseInDay(currentPlan.id, selectedDayIndex, index, { targetSets: ex.targetSets + 1 })}
                              >
                                <Text style={styles.stepperPlus}>+</Text>
                              </TouchableOpacity>
                            </View>

                            <View style={styles.stepperPill}>
                              <Text style={styles.stepperLabel}>Rest:</Text>
                              <Text style={styles.stepperValue}>{ex.restSeconds}s</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.editRowActions}>
                          <TouchableOpacity
                            style={styles.iconActionSwap}
                            onPress={() => {
                              setShowEditDayModal(false);
                              handleOpenSwap(index, def?.primaryMuscle || 'chest');
                            }}
                          >
                            <Repeat size={14} color={colors.primary} />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionDelete}
                            onPress={() => removeExerciseFromDay(currentPlan.id, selectedDayIndex, index)}
                          >
                            <Trash2 size={14} color={colors.accentRed} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.addExerciseInModalBtn}
                onPress={() => {
                  setShowEditDayModal(false);
                  setShowAddModal(true);
                }}
              >
                <Plus size={16} color={colors.primary} />
                <Text style={styles.addExerciseInModalText}>Add Exercise from Library</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => setShowEditDayModal(false)}
              >
                <Text style={styles.doneBtnText}>Done Customizing</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>

        {/* Modal 2: Swap Exercise with Muscle Match */}
        <Modal visible={showSwapModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.primary}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Swap Exercise</Text>
                  <Text style={styles.modalSub}>Select alternative for {swapMuscleFilter.toUpperCase()}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowSwapModal(false)}>
                  <X size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
                <View style={styles.swapList}>
                  {exerciseLibrary
                    .filter((e) => e.primaryMuscle === swapMuscleFilter || swapMuscleFilter === 'all')
                    .slice(0, 15)
                    .map((ex) => (
                      <TouchableOpacity
                        key={ex.id}
                        style={styles.swapOptionItem}
                        onPress={() => handleSelectSwapExercise(ex)}
                        activeOpacity={0.75}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.swapOptionName}>{ex.name}</Text>
                          <Text style={styles.swapOptionEquipment}>{ex.equipment} · {ex.difficulty}</Text>
                        </View>
                        <Check size={16} color={colors.primary} />
                      </TouchableOpacity>
                    ))}
                </View>
              </ScrollView>
            </GlassCard>
          </View>
        </Modal>

        {/* Modal 3: Add Exercise from Library */}
        <Modal visible={showAddModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.primary}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Add to {selectedDay?.name}</Text>
                  <Text style={styles.modalSub}>Pick from 80+ Hypertrophy Exercises</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <X size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                <View style={styles.swapList}>
                  {exerciseLibrary.slice(0, 25).map((ex) => (
                    <TouchableOpacity
                      key={ex.id}
                      style={styles.swapOptionItem}
                      onPress={() => handleAddExerciseToCurrentDay(ex)}
                      activeOpacity={0.75}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.swapOptionName}>{ex.name}</Text>
                        <Text style={styles.swapOptionEquipment}>
                          {ex.primaryMuscle} · {ex.equipment}
                        </Text>
                      </View>
                      <Plus size={16} color={colors.primary} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
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
  planPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  currentPlanName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  headerButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customizeTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.35)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  customizeTopBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  libraryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  libraryBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.secondary,
  },
  planSelectorDropdown: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    gap: 8,
  },
  selectorTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  planOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    padding: 10,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  planOptionActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
  },
  planOptionLeft: {
    flex: 1,
    paddingRight: 8,
    gap: 2,
  },
  planOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  planOptionName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  textPrimaryColor: {
    color: colors.primary,
  },
  planOptionDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  createPlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
    borderTopWidth: 1,
    borderColor: colors.cardBorder,
    marginTop: 4,
  },
  createPlanText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  scroll: {
    padding: theme.spacing.md,
    paddingBottom: 95,
  },
  graduationCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    gap: 8,
  },
  graduationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  graduationTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.accentYellow,
    textTransform: 'uppercase',
  },
  graduationBody: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
  },
  graduateActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentYellow,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    gap: 6,
    marginTop: 2,
  },
  graduateActionText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.textDark,
  },
  periodizationCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    gap: 4,
  },
  periodizationTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  periodizationTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.accentOrange,
    letterSpacing: 0.8,
  },
  periodizationSub: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  overloadBanner: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  overloadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  overloadTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  overloadBody: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
    fontWeight: '600',
  },
  restCard: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  restDayBigTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  restDayText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  dayDetailsContainer: {
    gap: theme.spacing.md,
  },
  dayHeaderCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  dayHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  daySubLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 2,
  },
  editPencilBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    gap: 4,
  },
  editPencilText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  muscleTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  startSessionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    gap: 8,
    ...theme.shadows.glowMint,
  },
  startSessionBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textDark,
  },
  exerciseSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  exerciseSectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  addExQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(57, 255, 136, 0.10)',
    borderRadius: theme.borderRadius.full,
  },
  addExQuickText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  exercisesList: {
    gap: 8,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  exerciseCardNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exIndexText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  exCardContent: {
    flex: 1,
  },
  exCardNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  exCardName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  exCardDetails: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  exCardNotes: {
    fontSize: 10,
    color: colors.primaryLight,
    marginTop: 3,
  },
  swapActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.25)',
  },
  swapActionText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  startingWeightsCard: {
    padding: theme.spacing.md,
    gap: 10,
  },
  startingWeightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  startingWeightsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  startingWeightsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  weightPill: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  weightPillVal: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  weightPillLbl: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  planActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  saveMyPlanBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    gap: 6,
  },
  saveMyPlanText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  resetPlanBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  resetPlanText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  modalCard: {
    padding: theme.spacing.lg,
    gap: 12,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  modalSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editExerciseList: {
    gap: 8,
  },
  editExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  editExerciseInfo: {
    flex: 1,
  },
  editExName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  steppersRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  stepperPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 6,
  },
  stepperLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  stepperMinus: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
    paddingHorizontal: 4,
  },
  stepperPlus: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
    paddingHorizontal: 4,
  },
  stepperValue: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  editRowActions: {
    flexDirection: 'row',
    gap: 6,
  },
  iconActionSwap: {
    padding: 8,
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderRadius: theme.borderRadius.full,
  },
  iconActionDelete: {
    padding: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.12)',
    borderRadius: theme.borderRadius.full,
  },
  addExerciseInModalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(57, 255, 136, 0.10)',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.25)',
    gap: 6,
  },
  addExerciseInModalText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  doneBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 4,
  },
  doneBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textDark,
  },
  swapList: {
    gap: 8,
  },
  swapOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBg,
    padding: 10,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  swapOptionName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  swapOptionEquipment: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
});
