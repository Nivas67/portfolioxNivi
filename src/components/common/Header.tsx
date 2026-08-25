import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flame, Watch, RefreshCw, Sparkles } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import { useGamificationStore } from '../../store/useGamificationStore';
import { useWearableStore } from '../../store/useWearableStore';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showStreak?: boolean;
  showWearableSync?: boolean;
  onPressWearable?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showStreak = true,
  showWearableSync = true,
  onPressWearable,
}) => {
  const user = useAuthStore((s) => s.user);
  const streak = useGamificationStore((s) => s.streak);
  const { isSyncing, syncTodayData, activePrimarySource } = useWearableStore();

  const displayName = user?.name ? user.name.split(' ')[0] : 'Athlete';
  const headerTitle = title || `Hey, ${displayName}`;
  const headerSubtitle = subtitle || 'Stay consistent with your habits';

  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateFormatted = today.toLocaleDateString('en-US', dateOptions).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>⚡</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>FITTRACK</Text>
          <Text style={styles.planTag}>{user?.goal ? user.goal.toUpperCase() : 'PERFORMANCE OS'}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {showStreak && (
          <View style={styles.streakBadge}>
            <Flame size={14} color={colors.accentOrange} fill={colors.accentOrange} />
            <Text style={styles.streakCount}>{streak.currentStreak}d</Text>
          </View>
        )}

        {showWearableSync && (
          <TouchableOpacity
            style={[styles.syncButton, isSyncing && styles.syncingButton]}
            onPress={() => (onPressWearable ? onPressWearable() : syncTodayData())}
            activeOpacity={0.7}
          >
            <Watch size={15} color={colors.primary} />
            {isSyncing && <RefreshCw size={12} color={colors.primary} style={styles.spinIcon} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(57, 255, 136, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  planTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 0, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.3)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    ...theme.shadows.glowOrange,
  },
  streakCount: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.accentOrange,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: theme.borderRadius.full,
    padding: 8,
    gap: 4,
  },
  syncingButton: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
  },
  spinIcon: {
    marginLeft: 2,
  },
});
