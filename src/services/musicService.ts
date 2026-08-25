import { Linking } from 'react-native';
import { MusicService, WorkoutPlaylist } from '../types';

export const CURATED_WORKOUT_PLAYLISTS: WorkoutPlaylist[] = [
  {
    id: 'pl-chest-pump',
    title: 'Chest & Upper Body Beast Pump',
    subtitle: 'High energy aggressive electronic & phonk for heavy pressing',
    bpm: 140,
    genre: 'Gym Phonk & Electronic',
    workoutFocus: 'chest',
    coverEmoji: '⚡',
    gradientColors: ['#39FF88', '#00D65B'],
    deepLinks: {
      spotify: 'spotify:playlist:37i9dQZF1DXdLEN7aqioXM',
      spotifyWeb: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      appleMusic: 'https://music.apple.com/us/playlist/pure-workout/pl.97c6f7ebc2724e588eb7c5cf7bb9f134',
      amazonMusic: 'https://music.amazon.com/playlists/B07354XG7K',
    },
  },
  {
    id: 'pl-deadlift-heavy',
    title: 'Heavy Deadlift & Savage Pull PRs',
    subtitle: 'Industrial bass & metalcore designed for max 1RM attempts',
    bpm: 152,
    genre: 'Metalcore & Hard Trap',
    workoutFocus: 'heavy_compound',
    coverEmoji: '🔥',
    gradientColors: ['#FF6B35', '#DC2626'],
    deepLinks: {
      spotify: 'spotify:playlist:37i9dQZF1DWZq9ZsZ74F5e',
      spotifyWeb: 'https://open.spotify.com/playlist/37i9dQZF1DWZq9ZsZ74F5e',
      appleMusic: 'https://music.apple.com/us/playlist/heavy-metal-workout/pl.u-38oWXP1TgVv',
      amazonMusic: 'https://music.amazon.com/playlists/B08FF93ZML',
    },
  },
  {
    id: 'pl-leg-annihilation',
    title: 'Leg Day & Squat Annihilation',
    subtitle: 'Relentless 155 BPM hardstyle cadence to power through quad sets',
    bpm: 155,
    genre: 'Hardstyle & Rawstyle',
    workoutFocus: 'high_intensity',
    coverEmoji: '🦵',
    gradientColors: ['#A855F7', '#7E22CE'],
    deepLinks: {
      spotify: 'spotify:playlist:37i9dQZF1DX3YSRoSdA634',
      spotifyWeb: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634',
      appleMusic: 'https://music.apple.com/us/playlist/hardstyle-workout/pl.u-06oxpyWI4ee',
      amazonMusic: 'https://music.amazon.com/playlists/B09X1K848R',
    },
  },
  {
    id: 'pl-arm-pump',
    title: 'Golden Era Arm & Bicep Pump',
    subtitle: 'Boom bap 90s hip-hop rhythm for pure mind-muscle connection',
    bpm: 135,
    genre: '90s Hip Hop & Golden Era',
    workoutFocus: 'arm_pump',
    coverEmoji: '💪',
    gradientColors: ['#38BDF8', '#0284C7'],
    deepLinks: {
      spotify: 'spotify:playlist:37i9dQZF1DX76t638V6482',
      spotifyWeb: 'https://open.spotify.com/playlist/37i9dQZF1DX76t638V6482',
      appleMusic: 'https://music.apple.com/us/playlist/hip-hop-workout/pl.58316279f04c449a859eb5ef130f166a',
      amazonMusic: 'https://music.amazon.com/playlists/B0753CVG92',
    },
  },
  {
    id: 'pl-cardio-shred',
    title: 'Cardio Incline & Shred Session',
    subtitle: 'Driving progressive tech-house for steady-state fat burning',
    bpm: 128,
    genre: 'Progressive Tech House',
    workoutFocus: 'cardio',
    coverEmoji: '🏃',
    gradientColors: ['#FBBF24', '#D97706'],
    deepLinks: {
      spotify: 'spotify:playlist:37i9dQZF1DX76290Vkyetq',
      spotifyWeb: 'https://open.spotify.com/playlist/37i9dQZF1DX76290Vkyetq',
      appleMusic: 'https://music.apple.com/us/playlist/dance-workout/pl.70c17a58a74e47a5ae01c5eb5bf39a48',
      amazonMusic: 'https://music.amazon.com/playlists/B07L5P4V5W',
    },
  },
  {
    id: 'pl-cns-recovery',
    title: 'CNS Recovery, Mobility & Lo-Fi',
    subtitle: 'Relaxing ambient soundscapes for post-session stretching & cortisol drop',
    bpm: 88,
    genre: 'Lo-Fi Chill & Ambient',
    workoutFocus: 'recovery',
    coverEmoji: '🧘',
    gradientColors: ['#06B6D4', '#0891B2'],
    deepLinks: {
      spotify: 'spotify:playlist:37i9dQZF1DXdLEN7aqioXM',
      spotifyWeb: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      appleMusic: 'https://music.apple.com/us/playlist/cool-down/pl.8d3d9241b71249b6b77284f6ffdf11ba',
      amazonMusic: 'https://music.amazon.com/playlists/B07C5D6Y4W',
    },
  },
];

export const musicService = {
  /**
   * Opens native streaming app via deep link or web fallback
   */
  async openPlaylist(playlist: WorkoutPlaylist, service: MusicService = 'spotify'): Promise<boolean> {
    try {
      let targetUrl = playlist.deepLinks.spotifyWeb;

      if (service === 'spotify') {
        const canOpenNative = await Linking.canOpenURL(playlist.deepLinks.spotify).catch(() => false);
        targetUrl = canOpenNative ? playlist.deepLinks.spotify : playlist.deepLinks.spotifyWeb;
      } else if (service === 'apple_music') {
        targetUrl = playlist.deepLinks.appleMusic;
      } else if (service === 'amazon_music') {
        targetUrl = playlist.deepLinks.amazonMusic;
      }

      await Linking.openURL(targetUrl);
      return true;
    } catch (e) {
      console.warn('[MusicService] Failed to open deep link, opening fallback web link:', e);
      try {
        await Linking.openURL(playlist.deepLinks.spotifyWeb);
        return true;
      } catch {
        return false;
      }
    }
  },
};
