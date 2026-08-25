import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Music,
  Play,
  Pause,
  ExternalLink,
  Flame,
  Radio,
  Headphones,
  Check,
  Sparkles,
  Zap,
  Volume2,
} from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { useMusicStore } from '../../store/useMusicStore';
import { MusicService, WorkoutPlaylist } from '../../types';

export const MusicScreen: React.FC = () => {
  const {
    playlists,
    defaultService,
    setDefaultService,
    activePlaylist,
    isPlaying,
    playPlaylist,
    pausePlayback,
    resumePlayback,
  } = useMusicStore();

  const services: { id: MusicService; label: string; icon: string }[] = [
    { id: 'spotify', label: 'Spotify', icon: '🟢' },
    { id: 'apple_music', label: 'Apple Music', icon: '🍎' },
    { id: 'amazon_music', label: 'Amazon Music', icon: '📦' },
  ];

  const handleLaunchPlaylist = (pl: WorkoutPlaylist) => {
    playPlaylist(pl);
    Alert.alert(
      'Launching Workout Beats 🎧',
      `Opening "${pl.title}" (${pl.bpm} BPM) in ${defaultService.replace('_', ' ').toUpperCase()}...`
    );
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Workout Music & BPM</Text>
            <Text style={styles.subtitle}>Curated high-cadence soundtracks for PRs & pumps</Text>
          </View>

          <StatBadge label="HIGH BPM" color={colors.primary} size="sm" />
        </View>

        {/* Streaming Service Selector Bar */}
        <View style={styles.serviceBar}>
          <Text style={styles.serviceBarLabel}>DEFAULT STREAMING PLATFORM:</Text>
          <View style={styles.serviceTabsRow}>
            {services.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.serviceTab, defaultService === s.id && styles.serviceTabActive]}
                onPress={() => setDefaultService(s.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.serviceEmoji}>{s.icon}</Text>
                <Text
                  style={[
                    styles.serviceTabText,
                    defaultService === s.id && styles.serviceTabTextActive,
                  ]}
                >
                  {s.label}
                </Text>
                {defaultService === s.id && <Check size={12} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Active Now Playing Glass Card */}
          {activePlaylist && (
            <GlassCard style={styles.nowPlayingCard} glow glowColor={colors.primary}>
              <View style={styles.nowPlayingTop}>
                <View style={styles.musicEmojiBox}>
                  <Text style={styles.musicEmojiBig}>{activePlaylist.coverEmoji}</Text>
                </View>

                <View style={styles.nowPlayingInfo}>
                  <Text style={styles.nowPlayingPre}>CURRENT SOUNDTRACK</Text>
                  <Text style={styles.nowPlayingTitle} numberOfLines={1}>{activePlaylist.title}</Text>
                  <Text style={styles.nowPlayingSub}>{activePlaylist.genre} · {activePlaylist.bpm} BPM</Text>
                </View>

                <TouchableOpacity
                  style={styles.playPauseCircle}
                  onPress={() => (isPlaying ? pausePlayback() : resumePlayback())}
                  activeOpacity={0.8}
                >
                  {isPlaying ? (
                    <Pause size={18} color={colors.textDark} fill={colors.textDark} />
                  ) : (
                    <Play size={18} color={colors.textDark} fill={colors.textDark} />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.openInAppBtn}
                onPress={() => handleLaunchPlaylist(activePlaylist)}
                activeOpacity={0.8}
              >
                <ExternalLink size={14} color={colors.primary} />
                <Text style={styles.openInAppText}>
                  Open in {defaultService.replace('_', ' ').toUpperCase()} App
                </Text>
              </TouchableOpacity>
            </GlassCard>
          )}

          {/* Curated Playlists List */}
          <Text style={styles.sectionHeading}>Curated Training Playlists</Text>

          <View style={styles.playlistList}>
            {playlists.map((pl) => (
              <GlassCard key={pl.id} style={styles.playlistCard}>
                <View style={styles.playlistRow}>
                  <View style={styles.playlistEmojiWrap}>
                    <Text style={styles.playlistEmoji}>{pl.coverEmoji}</Text>
                  </View>

                  <View style={styles.playlistInfo}>
                    <View style={styles.playlistHeader}>
                      <Text style={styles.playlistTitle}>{pl.title}</Text>
                      <StatBadge label={`${pl.bpm} BPM`} color={colors.primary} size="sm" />
                    </View>

                    <Text style={styles.playlistDesc}>{pl.subtitle}</Text>
                    <Text style={styles.playlistGenre}>Genre: {pl.genre}</Text>
                  </View>
                </View>

                {/* 1-Tap Launch Button */}
                <TouchableOpacity
                  style={styles.launchBtn}
                  onPress={() => handleLaunchPlaylist(pl)}
                  activeOpacity={0.85}
                >
                  <Play size={14} color={colors.textDark} fill={colors.textDark} />
                  <Text style={styles.launchBtnText}>
                    Play on {defaultService === 'spotify' ? 'Spotify' : defaultService === 'apple_music' ? 'Apple Music' : 'Amazon'}
                  </Text>
                </TouchableOpacity>
              </GlassCard>
            ))}
          </View>
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
  serviceBar: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    gap: 6,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  serviceBarLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  serviceTabsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  serviceTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 5,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  serviceTabActive: {
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderColor: colors.primary,
  },
  serviceEmoji: {
    fontSize: 12,
  },
  serviceTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  serviceTabTextActive: {
    color: colors.primary,
    fontWeight: '900',
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  nowPlayingCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  nowPlayingTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  musicEmojiBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicEmojiBig: {
    fontSize: 22,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingPre: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  nowPlayingTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  nowPlayingSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  playPauseCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.glowMint,
  },
  openInAppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.10)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.25)',
  },
  openInAppText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 4,
  },
  playlistList: {
    gap: 10,
  },
  playlistCard: {
    padding: theme.spacing.md,
    gap: 10,
  },
  playlistRow: {
    flexDirection: 'row',
    gap: 12,
  },
  playlistEmojiWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistEmoji: {
    fontSize: 20,
  },
  playlistInfo: {
    flex: 1,
    gap: 2,
  },
  playlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 6,
  },
  playlistDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  playlistGenre: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  launchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    gap: 6,
    ...theme.shadows.glowMint,
  },
  launchBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textDark,
  },
});
