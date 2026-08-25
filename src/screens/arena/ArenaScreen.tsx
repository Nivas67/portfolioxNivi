import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Flame, Medal, Award, ThumbsUp, Sparkles, TrendingUp, Users, Crown } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';

export const ArenaScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tonnage' | 'streaks' | 'feed'>('tonnage');

  const leaderboards = [
    { rank: 1, name: 'Marcus Vance', title: 'Powerlifting Master', tonnage: '48,250 kg', streak: 42, avatar: 'MV', badgeColor: '#FFD700', isUser: false },
    { rank: 2, name: 'Elena Rostova', title: 'Olympic Weightlifter', tonnage: '42,100 kg', streak: 35, avatar: 'ER', badgeColor: '#C0C0C0', isUser: false },
    { rank: 3, name: 'David Kim', title: 'Hypertrophy Athlete', tonnage: '39,800 kg', streak: 28, badgeColor: '#CD7F32', avatar: 'DK', isUser: false },
    { rank: 4, name: 'Alex Hunter (You)', title: 'Pro Athlete', tonnage: '34,600 kg', streak: 18, badgeColor: colors.primary, avatar: 'AH', isUser: true },
    { rank: 5, name: 'Sophie Miller', title: 'CrossFit Athlete', tonnage: '31,200 kg', streak: 14, badgeColor: colors.secondary, avatar: 'SM', isUser: false },
    { rank: 6, name: 'Liam Davies', title: 'Bodybuilding Pro', tonnage: '29,400 kg', streak: 12, badgeColor: colors.accentOrange, avatar: 'LD', isUser: false },
  ];

  const communityFeed = [
    { id: '1', name: 'Marcus Vance', action: 'hit a new Personal Record', metric: '180 kg Deadlift × 5 reps', time: '12m ago', likes: 24, avatar: 'MV' },
    { id: '2', name: 'Elena Rostova', action: 'completed workout', metric: 'Back & Biceps Savage Pull (6 exercises, 28 sets)', time: '45m ago', likes: 19, avatar: 'ER' },
    { id: '3', name: 'Alex Hunter (You)', action: 'logged new PR', metric: '100 kg Barbell Bench Press × 6 reps', time: '2h ago', likes: 31, avatar: 'AH' },
    { id: '4', name: 'David Kim', action: 'hit a 28-day discipline streak', metric: '100% Weekly Adherence', time: '4h ago', likes: 42, avatar: 'DK' },
  ];

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Crown size={22} color={colors.primary} />
            <View>
              <Text style={styles.title}>Iron Arena & Leaderboard</Text>
              <Text style={styles.subtitle}>Global rankings & athlete community PR feed</Text>
            </View>
          </View>
          <StatBadge label="GOLD LEAGUE" color={colors.primary} size="sm" />
        </View>

        {/* Segmented Controls */}
        <View style={styles.segmentRow}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'tonnage' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('tonnage')}
          >
            <Trophy size={14} color={activeTab === 'tonnage' ? colors.textDark : colors.textSecondary} />
            <Text style={[styles.segmentText, activeTab === 'tonnage' && styles.segmentTextActive]}>
              Tonnage Titans
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'streaks' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('streaks')}
          >
            <Flame size={14} color={activeTab === 'streaks' ? colors.textDark : colors.textSecondary} />
            <Text style={[styles.segmentText, activeTab === 'streaks' && styles.segmentTextActive]}>
              Streak Champions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'feed' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('feed')}
          >
            <Users size={14} color={activeTab === 'feed' ? colors.textDark : colors.textSecondary} />
            <Text style={[styles.segmentText, activeTab === 'feed' && styles.segmentTextActive]}>
              Live PR Feed
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {activeTab === 'tonnage' && (
            <View style={styles.leaderboardList}>
              {leaderboards.map((ath) => (
                <GlassCard
                  key={ath.rank}
                  style={[styles.athleteCard, ath.isUser && styles.athleteCardUser]}
                  glow={ath.isUser}
                  glowColor={colors.primary}
                >
                  <View style={styles.rankBadge}>
                    <Text style={[styles.rankNumber, { color: ath.badgeColor }]}>#{ath.rank}</Text>
                  </View>

                  <View style={styles.athleteAvatarCircle}>
                    <Text style={styles.avatarInitialsText}>{ath.avatar}</Text>
                  </View>

                  <View style={styles.athleteInfoCol}>
                    <View style={styles.nameRow}>
                      <Text style={[styles.athleteName, ath.isUser && styles.textPrimaryColor]}>
                        {ath.name}
                      </Text>
                    </View>
                    <Text style={styles.athleteTitleText}>{ath.title}</Text>
                  </View>

                  <View style={styles.tonnageBadge}>
                    <Text style={styles.tonnageNumber}>{ath.tonnage}</Text>
                    <Text style={styles.tonnageSub}>Weekly Tonnage</Text>
                  </View>
                </GlassCard>
              ))}
            </View>
          )}

          {activeTab === 'streaks' && (
            <View style={styles.leaderboardList}>
              {leaderboards
                .slice()
                .sort((a, b) => b.streak - a.streak)
                .map((ath, idx) => (
                  <GlassCard
                    key={ath.name}
                    style={[styles.athleteCard, ath.isUser && styles.athleteCardUser]}
                    glow={ath.isUser}
                    glowColor={colors.accentYellow}
                  >
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankNumber}>#{idx + 1}</Text>
                    </View>

                    <View style={styles.athleteAvatarCircle}>
                      <Text style={styles.avatarInitialsText}>{ath.avatar}</Text>
                    </View>

                    <View style={styles.athleteInfoCol}>
                      <Text style={[styles.athleteName, ath.isUser && styles.textPrimaryColor]}>
                        {ath.name}
                      </Text>
                      <Text style={styles.athleteTitleText}>{ath.title}</Text>
                    </View>

                    <View style={styles.streakBadge}>
                      <Flame size={14} color={colors.accentOrange} fill={colors.accentOrange} />
                      <Text style={styles.streakNumber}>{ath.streak} Days</Text>
                    </View>
                  </GlassCard>
                ))}
            </View>
          )}

          {activeTab === 'feed' && (
            <View style={styles.feedList}>
              {communityFeed.map((item) => (
                <GlassCard key={item.id} style={styles.feedCard}>
                  <View style={styles.feedTop}>
                    <View style={styles.athleteAvatarCircle}>
                      <Text style={styles.avatarInitialsText}>{item.avatar}</Text>
                    </View>
                    <View style={styles.feedUserCol}>
                      <Text style={styles.feedUserName}>{item.name}</Text>
                      <Text style={styles.feedAction}>{item.action} · {item.time}</Text>
                    </View>
                  </View>

                  <View style={styles.feedMetricBox}>
                    <Trophy size={16} color={colors.primary} />
                    <Text style={styles.feedMetricText}>{item.metric}</Text>
                  </View>

                  <View style={styles.feedActionsRow}>
                    <TouchableOpacity style={styles.fistBumpBtn} activeOpacity={0.7}>
                      <ThumbsUp size={14} color={colors.primary} />
                      <Text style={styles.fistBumpText}>{item.likes} Fist Bumps</Text>
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              ))}
            </View>
          )}
        </ScrollView>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  segmentRow: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: theme.borderRadius.full,
    padding: 4,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    gap: 6,
  },
  segmentBtnActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.textDark,
    fontWeight: '900',
  },
  scroll: {
    padding: theme.spacing.md,
    paddingBottom: 95,
  },
  leaderboardList: {
    gap: 8,
  },
  athleteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  athleteCardUser: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'rgba(57, 255, 136, 0.08)',
  },
  rankBadge: {
    width: 28,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  athleteAvatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitialsText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  athleteInfoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  athleteName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  textPrimaryColor: {
    color: colors.primary,
  },
  athleteTitleText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tonnageBadge: {
    alignItems: 'flex-end',
  },
  tonnageNumber: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  tonnageSub: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 107, 53, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  streakNumber: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.accentOrange,
  },
  feedList: {
    gap: 10,
  },
  feedCard: {
    padding: 12,
    gap: 8,
  },
  feedTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  feedUserCol: {
    flex: 1,
  },
  feedUserName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  feedAction: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  feedMetricBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    padding: 8,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 8,
  },
  feedMetricText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  feedActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fistBumpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.10)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  fistBumpText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
});
