import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Dumbbell, Trophy, Utensils, Heart, Scale, ShieldCheck, Flame, ChevronRight, Zap } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import { useDietStore } from '../../store/useDietStore';
import { useWearableStore } from '../../store/useWearableStore';
import { useAICoachStore } from '../../store/useAICoachStore';
import { getTodayDateString } from '../../utils/dateUtils';
import { Header } from '../../components/common/Header';
import { MacroRingChart } from '../../components/dashboard/MacroRingChart';
import { TodayWorkoutCard } from '../../components/dashboard/TodayWorkoutCard';
import { DailyChecklist } from '../../components/dashboard/DailyChecklist';
import { WearableWidget } from '../../components/dashboard/WearableWidget';
import { RecoveryScoreCard } from '../../components/recovery/RecoveryScoreCard';
import { GlassCard } from '../../components/common/GlassCard';
import { ScreenGradient } from '../../components/common/ScreenGradient';

interface HomeScreenProps {
  onStartWorkout: () => void;
  onNavigateTab: (tabName: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartWorkout, onNavigateTab }) => {
  const { nutritionTargets: targets, user } = useAuthStore();
  const { getDailySummary } = useDietStore();
  const { getTodayWearableData } = useWearableStore();
  const { dailyTrainerNote } = useAICoachStore();
  const todayStr = getTodayDateString();
  const summary = getDailySummary(todayStr);
  const wearableData = getTodayWearableData();
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  const getGreeting = () => {
    const hr = now.getHours();
    if (hr < 12) return 'morning';
    if (hr < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        <Header
          onPressWearable={() => onNavigateTab('Wearables')}
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Command Center Greeting Bar */}
          <View style={styles.commandHeader}>
            <View>
              <Text style={styles.commandSub}>Command Center</Text>
              <Text style={styles.commandGreeting}>
                Good {getGreeting()}, {user?.name ? user.name.split(' ')[0] : 'Athlete'}
              </Text>
            </View>
            <View style={styles.datePill}>
              <Zap size={13} color={colors.primary} />
              <Text style={styles.datePillText}>{dateFormatted}</Text>
            </View>
          </View>

          {/* Daily Readiness & CNS Recovery Bento Card */}
          <RecoveryScoreCard score={91} hrvMs={62} restingHr={52} />

          {/* Humanized Trainer Daily Mindset Note from Coach Nivi */}
          <GlassCard style={styles.trainerNoteCard} glow glowColor={colors.primary}>
            <View style={styles.trainerNoteHeader}>
              <View style={styles.trainerAvatarCircle}>
                <Text style={styles.trainerAvatarEmoji}>🏋️‍♀️</Text>
              </View>
              <View style={styles.trainerNoteTitleArea}>
                <Text style={styles.trainerPreTitle}>DAILY TRAINER'S MINDSET</Text>
                <Text style={styles.trainerName}>Coach Nivi (Personal Trainer & Biomechanist)</Text>
              </View>
              <TouchableOpacity
                style={styles.chatCoachBtn}
                onPress={() => onNavigateTab('AICoach')}
                activeOpacity={0.7}
              >
                <Sparkles size={12} color={colors.primary} />
                <Text style={styles.chatCoachBtnText}>Ask Nivi</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.trainerNoteBody}>
              "Control your 3-second negative eccentric on flat bench today. That time-under-tension is where 70% of muscle fibers tear for growth!"
            </Text>
          </GlassCard>

          {/* Quick Power Tools Dock (Coach Nivi, Plate Math, Arena Leaderboards) */}
          <View style={styles.quickToolsRow}>
            <TouchableOpacity
              style={styles.quickToolPill}
              onPress={() => onNavigateTab('AICoach')}
              activeOpacity={0.8}
            >
              <View style={styles.toolIconMint}>
                <Sparkles size={14} color={colors.primary} />
              </View>
              <Text style={styles.quickToolLabel}>Coach Nivi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickToolPill}
              onPress={() => onNavigateTab('PlateMath')}
              activeOpacity={0.8}
            >
              <View style={styles.toolIconCyan}>
                <Dumbbell size={14} color={colors.secondary} />
              </View>
              <Text style={styles.quickToolLabel}>Plate Math</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickToolPill}
              onPress={() => onNavigateTab('Arena')}
              activeOpacity={0.8}
            >
              <View style={styles.toolIconGold}>
                <Trophy size={14} color={colors.accentYellow} />
              </View>
              <Text style={styles.quickToolLabel}>Iron Arena</Text>
            </TouchableOpacity>
          </View>

          {/* Apple concentric Macro Activity Rings */}
          <MacroRingChart
            caloriesConsumed={summary.calories}
            calorieTarget={targets?.targetCalories || 2200}
            proteinConsumed={summary.protein}
            proteinTarget={targets?.proteinGrams || 180}
            carbsConsumed={summary.carbs}
            carbsTarget={targets?.carbsGrams || 220}
            fatConsumed={summary.fat}
            fatTarget={targets?.fatGrams || 65}
            activeCaloriesBurned={wearableData.activeCalories}
          />

          {/* Today Scheduled Gym Workout Target */}
          <TodayWorkoutCard
            onStartSession={onStartWorkout}
            onViewPlan={() => onNavigateTab('Workouts')}
          />

          {/* Smartwatch / Apple Health Live Widget */}
          <WearableWidget
            onPressDetails={() => onNavigateTab('Wearables')}
          />

          {/* Daily Discipline Checklist */}
          <DailyChecklist />
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  commandHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  commandSub: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.55)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  commandGreeting: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginTop: 2,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  datePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  trainerNoteCard: {
    padding: theme.spacing.md,
    gap: 8,
  },
  trainerNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trainerAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainerAvatarEmoji: {
    fontSize: 18,
  },
  trainerNoteTitleArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  trainerPreTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  trainerName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  chatCoachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    gap: 4,
  },
  chatCoachBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  trainerNoteBody: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  quickToolsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickToolPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 8,
  },
  toolIconMint: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolIconCyan: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolIconGold: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickToolLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
