import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, X, Info, ArrowLeft, Dumbbell, Play, CheckCircle2 } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { ExerciseItemCard } from '../../components/workouts/ExerciseItemCard';
import { MUSCLE_GROUPS_LIST, EQUIPMENT_LIST } from '../../data/exercisesData';
import { Exercise, MuscleGroup } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';

interface ExerciseLibraryScreenProps {
  onBack: () => void;
  onSelectExercise?: (exercise: Exercise) => void;
  isPickingMode?: boolean;
}

export const ExerciseLibraryScreen: React.FC<ExerciseLibraryScreenProps> = ({
  onBack,
  onSelectExercise,
  isPickingMode = false,
}) => {
  const { exerciseLibrary } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [activeDetailExercise, setActiveDetailExercise] = useState<Exercise | null>(null);

  const filteredExercises = exerciseLibrary.filter((ex) => {
    const matchQuery =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchMuscle = selectedMuscle === 'all' || ex.primaryMuscle === selectedMuscle;
    const matchEquip = selectedEquipment === 'all' || ex.equipment === selectedEquipment;

    return matchQuery && matchMuscle && matchEquip;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.topTitleArea}>
          <Text style={styles.topTitle}>100+ Exercise Library</Text>
          <Text style={styles.topSubtitle}>{filteredExercises.length} Movements Available</Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises (e.g. Bench, Squat, Cable)..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Muscle Group Filter Chips */}
      <View style={styles.filterScrollWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {MUSCLE_GROUPS_LIST.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.filterChip,
                selectedMuscle === m.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedMuscle(m.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedMuscle === m.id && styles.filterChipTextActive,
                ]}
              >
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercise List */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredExercises.map((exercise) => (
          <ExerciseItemCard
            key={exercise.id}
            exercise={exercise}
            onPress={() => {
              if (isPickingMode && onSelectExercise) {
                onSelectExercise(exercise);
              } else {
                setActiveDetailExercise(exercise);
              }
            }}
            showAddButton={isPickingMode}
            onAdd={() => onSelectExercise && onSelectExercise(exercise)}
          />
        ))}

        {filteredExercises.length === 0 && (
          <View style={styles.emptyState}>
            <Dumbbell size={40} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No exercises found</Text>
            <Text style={styles.emptySub}>Try adjusting your search query or filters</Text>
          </View>
        )}
      </ScrollView>

      {/* Exercise Details Modal */}
      {activeDetailExercise && (
        <Modal visible={!!activeDetailExercise} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.detailCard} glow>
              <View style={styles.detailHeader}>
                <View style={styles.detailTitleArea}>
                  <Text style={styles.detailName}>{activeDetailExercise.name}</Text>
                  <View style={styles.detailTags}>
                    <StatBadge label={activeDetailExercise.primaryMuscle} color={colors.primary} size="sm" />
                    <StatBadge label={activeDetailExercise.equipment} color={colors.secondaryLight} size="sm" />
                    <StatBadge label={activeDetailExercise.difficulty} color={colors.warning} size="sm" />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.closeDetailBtn}
                  onPress={() => setActiveDetailExercise(null)}
                >
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.instructionsScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionHeader}>Execution Instructions</Text>
                <View style={styles.stepsList}>
                  {activeDetailExercise.instructions.map((step, idx) => (
                    <View key={idx} style={styles.stepRow}>
                      <View style={styles.stepNumCircle}>
                        <Text style={styles.stepNumText}>{idx + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>

                {activeDetailExercise.tips && activeDetailExercise.tips.length > 0 && (
                  <View style={styles.tipsBox}>
                    <Text style={styles.tipsHeader}>💡 Form & Safety Tips</Text>
                    {activeDetailExercise.tips.map((tip, idx) => (
                      <Text key={idx} style={styles.tipText}>• {tip}</Text>
                    ))}
                  </View>
                )}
              </ScrollView>

              <TouchableOpacity
                style={styles.gotItBtn}
                onPress={() => setActiveDetailExercise(null)}
              >
                <Text style={styles.gotItBtnText}>Close Instructions</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  topTitleArea: {
    flex: 1,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  topSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  filterScrollWrapper: {
    marginBottom: theme.spacing.sm,
  },
  filterRow: {
    paddingHorizontal: theme.spacing.md,
    gap: 8,
  },
  filterChip: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  filterChipActive: {
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.primary,
  },
  scroll: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  detailCard: {
    maxHeight: '80%',
    padding: theme.spacing.lg,
    gap: 12,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
    paddingBottom: 10,
  },
  detailTitleArea: {
    flex: 1,
    paddingRight: 8,
  },
  detailName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  detailTags: {
    flexDirection: 'row',
    gap: 6,
  },
  closeDetailBtn: {
    padding: 4,
  },
  instructionsScroll: {
    maxHeight: 320,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stepsList: {
    gap: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepNumCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  tipsBox: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: theme.borderRadius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    marginTop: 14,
    gap: 4,
  },
  tipsHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.carbs,
  },
  tipText: {
    fontSize: 11,
    color: colors.textPrimary,
    lineHeight: 16,
  },
  gotItBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 6,
  },
  gotItBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDark,
  },
});
