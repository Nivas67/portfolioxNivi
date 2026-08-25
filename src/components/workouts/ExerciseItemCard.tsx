import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Info, Plus, ChevronRight } from 'lucide-react-native';
import { Exercise } from '../../types';
import { colors, theme } from '../../theme/colors';
import { StatBadge } from '../common/StatBadge';

interface ExerciseItemCardProps {
  exercise: Exercise;
  onPress: () => void;
  onAdd?: () => void;
  showAddButton?: boolean;
}

export const ExerciseItemCard: React.FC<ExerciseItemCardProps> = ({
  exercise,
  onPress,
  onAdd,
  showAddButton = false,
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.accentRed;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {exercise.name}
          </Text>
        </View>

        <View style={styles.tagsRow}>
          <StatBadge
            label={exercise.primaryMuscle}
            color={colors.primary}
            size="sm"
          />
          <StatBadge
            label={exercise.equipment}
            color={colors.secondaryLight}
            size="sm"
          />
          <StatBadge
            label={exercise.difficulty}
            color={getDifficultyColor(exercise.difficulty)}
            size="sm"
          />
        </View>
      </View>

      <View style={styles.actions}>
        {showAddButton ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              onAdd && onAdd();
            }}
          >
            <Plus size={18} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <ChevronRight size={18} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  content: {
    flex: 1,
    paddingRight: 8,
  },
  header: {
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 155, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
