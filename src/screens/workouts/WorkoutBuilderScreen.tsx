import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Trash2, Check, Dumbbell } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { Exercise, WorkoutDay, WorkoutExercise, WorkoutPlan } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { ExerciseLibraryScreen } from './ExerciseLibraryScreen';

interface WorkoutBuilderScreenProps {
  onBack: () => void;
  onSaved: () => void;
}

export const WorkoutBuilderScreen: React.FC<WorkoutBuilderScreenProps> = ({ onBack, onSaved }) => {
  const { saveCustomPlan, exerciseLibrary } = useWorkoutStore();

  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [isPickingExercise, setIsPickingExercise] = useState(false);

  const handleAddExercise = (exercise: Exercise) => {
    const newEx: WorkoutExercise = {
      exerciseId: exercise.id,
      customName: exercise.name,
      targetSets: 3,
      targetReps: '8-12',
      restSeconds: 90,
    };
    setSelectedExercises([...selectedExercises, newEx]);
    setIsPickingExercise(false);
  };

  const handleRemoveExercise = (index: number) => {
    const updated = [...selectedExercises];
    updated.splice(index, 1);
    setSelectedExercises(updated);
  };

  const handleSaveRoutine = () => {
    if (!routineName.trim()) {
      Alert.alert('Missing Name', 'Please enter a name for your custom routine.');
      return;
    }
    if (selectedExercises.length === 0) {
      Alert.alert('No Exercises', 'Please add at least 1 exercise from the library.');
      return;
    }

    const newPlan: WorkoutPlan = {
      id: `custom-plan-${Date.now()}`,
      name: routineName,
      description: description || 'Custom User Workout Routine',
      splitType: 'custom',
      daysPerWeek: 3,
      difficulty: 'intermediate',
      isCustom: true,
      days: [
        {
          id: `custom-d1-${Date.now()}`,
          dayIndex: 0,
          name: `${routineName} Workout`,
          isRestDay: false,
          targetMuscleGroups: ['chest', 'back', 'shoulders'],
          exercises: selectedExercises,
        },
        { id: `custom-d2-${Date.now()}`, dayIndex: 1, name: 'Rest Day', isRestDay: true, targetMuscleGroups: [], exercises: [] },
        { id: `custom-d3-${Date.now()}`, dayIndex: 2, name: `${routineName} Session B`, isRestDay: false, targetMuscleGroups: ['quads', 'hamstrings'], exercises: selectedExercises },
      ],
    };

    saveCustomPlan(newPlan);
    onSaved();
  };

  if (isPickingExercise) {
    return (
      <ExerciseLibraryScreen
        onBack={() => setIsPickingExercise(false)}
        isPickingMode
        onSelectExercise={handleAddExercise}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Custom Routine Builder</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveRoutine}>
          <Check size={16} color={colors.textDark} strokeWidth={3} />
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Name & Description */}
        <GlassCard style={styles.infoCard}>
          <Text style={styles.inputLabel}>Routine / Split Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Heavy Upper Body Blast"
            placeholderTextColor={colors.textMuted}
            value={routineName}
            onChangeText={setRoutineName}
          />

          <Text style={[styles.inputLabel, { marginTop: 10 }]}>Description (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Focus on progressive overload on compound lifts"
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
          />
        </GlassCard>

        {/* Exercises List */}
        <View style={styles.exercisesSection}>
          <View style={styles.exSectionHeader}>
            <Text style={styles.sectionTitle}>
              Exercises ({selectedExercises.length})
            </Text>
            <TouchableOpacity
              style={styles.addExBtn}
              onPress={() => setIsPickingExercise(true)}
            >
              <Plus size={14} color={colors.primary} />
              <Text style={styles.addExBtnText}>Add from Library</Text>
            </TouchableOpacity>
          </View>

          {selectedExercises.map((item, index) => {
            const def = exerciseLibrary.find((e) => e.id === item.exerciseId);
            return (
              <GlassCard key={index} style={styles.exCard}>
                <View style={styles.exCardTop}>
                  <View style={styles.exCardLeft}>
                    <Text style={styles.exIndexBadge}>{index + 1}</Text>
                    <Text style={styles.exName}>{item.customName || def?.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteExBtn}
                    onPress={() => handleRemoveExercise(index)}
                  >
                    <Trash2 size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                {/* Target Sets / Reps / Rest Config */}
                <View style={styles.configRow}>
                  <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Sets</Text>
                    <TextInput
                      style={styles.configInput}
                      keyboardType="numeric"
                      value={String(item.targetSets)}
                      onChangeText={(val) => {
                        const updated = [...selectedExercises];
                        updated[index].targetSets = parseInt(val, 10) || 3;
                        setSelectedExercises(updated);
                      }}
                    />
                  </View>

                  <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Reps</Text>
                    <TextInput
                      style={styles.configInput}
                      value={item.targetReps}
                      onChangeText={(val) => {
                        const updated = [...selectedExercises];
                        updated[index].targetReps = val;
                        setSelectedExercises(updated);
                      }}
                    />
                  </View>

                  <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Rest (s)</Text>
                    <TextInput
                      style={styles.configInput}
                      keyboardType="numeric"
                      value={String(item.restSeconds)}
                      onChangeText={(val) => {
                        const updated = [...selectedExercises];
                        updated[index].restSeconds = parseInt(val, 10) || 60;
                        setSelectedExercises(updated);
                      }}
                    />
                  </View>
                </View>
              </GlassCard>
            );
          })}

          {selectedExercises.length === 0 && (
            <TouchableOpacity
              style={styles.emptyAddBox}
              onPress={() => setIsPickingExercise(true)}
            >
              <Dumbbell size={32} color={colors.primary} />
              <Text style={styles.emptyAddTitle}>No exercises added yet</Text>
              <Text style={styles.emptyAddSub}>Tap to browse 100+ exercises and build your routine</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
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
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    gap: 4,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textDark,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  infoCard: {
    padding: theme.spacing.md,
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  textInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  exercisesSection: {
    gap: 10,
  },
  exSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  addExBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.3)',
    gap: 4,
  },
  addExBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  exCard: {
    padding: 12,
    gap: 10,
  },
  exCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  exIndexBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    width: 20,
  },
  exName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  deleteExBtn: {
    padding: 4,
  },
  configRow: {
    flexDirection: 'row',
    gap: 8,
  },
  configItem: {
    flex: 1,
    gap: 2,
  },
  configLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  configInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 4,
  },
  emptyAddBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderStyle: 'dashed',
    gap: 8,
    marginTop: 8,
  },
  emptyAddTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyAddSub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
