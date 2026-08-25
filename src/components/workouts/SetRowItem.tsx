import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { SetLog } from '../../types';

interface SetRowItemProps {
  set: SetLog;
  onToggleComplete: () => void;
  onChangeWeight: (weight: number) => void;
  onChangeReps: (reps: number) => void;
  onChangeRpe: (rpe: number) => void;
  onDelete?: () => void;
}

export const SetRowItem: React.FC<SetRowItemProps> = ({
  set,
  onToggleComplete,
  onChangeWeight,
  onChangeReps,
  onChangeRpe,
  onDelete,
}) => {
  return (
    <View style={[styles.row, set.completed && styles.rowCompleted]}>
      {/* Set Number */}
      <View style={styles.setCol}>
        <Text style={[styles.setNumText, set.completed && styles.textCompleted]}>
          {set.setNumber}
        </Text>
      </View>

      {/* Previous Performance */}
      <View style={styles.prevCol}>
        <Text style={styles.prevText} numberOfLines={1}>
          {set.previousBest ? `${set.previousBest.weightKg}kg × ${set.previousBest.reps}` : '—'}
        </Text>
      </View>

      {/* Weight Input Box */}
      <View style={styles.inputCol}>
        <TextInput
          style={[styles.input, set.completed && styles.inputCompleted]}
          keyboardType="numeric"
          defaultValue={set.weightKg ? String(set.weightKg) : ''}
          onChangeText={(val) => {
            const num = parseFloat(val);
            onChangeWeight(isNaN(num) ? 0 : num);
          }}
          placeholder="0"
          placeholderTextColor={colors.textMuted}
          selectTextOnFocus
        />
      </View>

      {/* Reps Input Box */}
      <View style={styles.inputCol}>
        <TextInput
          style={[styles.input, set.completed && styles.inputCompleted]}
          keyboardType="numeric"
          defaultValue={set.reps ? String(set.reps) : ''}
          onChangeText={(val) => {
            const num = parseInt(val, 10);
            onChangeReps(isNaN(num) ? 0 : num);
          }}
          placeholder="0"
          placeholderTextColor={colors.textMuted}
          selectTextOnFocus
        />
      </View>

      {/* RPE Input Box */}
      <View style={styles.rpeCol}>
        <TextInput
          style={[styles.rpeInput, set.completed && styles.inputCompleted]}
          keyboardType="numeric"
          defaultValue={set.rpe ? String(set.rpe) : ''}
          onChangeText={(val) => {
            const num = parseFloat(val);
            onChangeRpe(isNaN(num) ? 8 : num);
          }}
          placeholder="8"
          placeholderTextColor={colors.textMuted}
          selectTextOnFocus
        />
      </View>

      {/* Complete Checkbox Button */}
      <TouchableOpacity
        style={[styles.checkBtn, set.completed && styles.checkBtnCompleted]}
        onPress={onToggleComplete}
        activeOpacity={0.75}
      >
        <Check
          size={16}
          color={set.completed ? colors.textDark : 'rgba(255, 255, 255, 0.2)'}
          strokeWidth={set.completed ? 3.5 : 2}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  rowCompleted: {
    backgroundColor: 'rgba(0, 245, 155, 0.06)',
    borderColor: 'rgba(0, 245, 155, 0.2)',
  },
  setCol: {
    width: 28,
    alignItems: 'center',
  },
  setNumText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  textCompleted: {
    color: colors.primary,
  },
  prevCol: {
    flex: 1.1,
    paddingHorizontal: 4,
  },
  prevText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  inputCol: {
    flex: 1.2,
    paddingHorizontal: 3,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 6,
    paddingHorizontal: 8,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  rpeCol: {
    width: 38,
    paddingHorizontal: 3,
  },
  rpeInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 6,
    paddingHorizontal: 4,
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputCompleted: {
    backgroundColor: 'rgba(0, 245, 155, 0.12)',
    borderColor: 'rgba(0, 245, 155, 0.3)',
    color: colors.textPrimary,
  },
  checkBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  checkBtnCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});
