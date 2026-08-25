import { create } from 'zustand';
import { MusicService, WorkoutPlaylist } from '../types';
import { CURATED_WORKOUT_PLAYLISTS, musicService } from '../services/musicService';
import { storageService } from '../services/storageService';

interface MusicState {
  defaultService: MusicService;
  activePlaylist: WorkoutPlaylist | null;
  isPlaying: boolean;
  playlists: WorkoutPlaylist[];

  // Actions
  setDefaultService: (service: MusicService) => void;
  playPlaylist: (playlist: WorkoutPlaylist, service?: MusicService) => Promise<void>;
  pausePlayback: () => void;
  resumePlayback: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  defaultService: 'spotify',
  activePlaylist: CURATED_WORKOUT_PLAYLISTS[0],
  isPlaying: false,
  playlists: CURATED_WORKOUT_PLAYLISTS,

  setDefaultService: (service: MusicService) => {
    set({ defaultService: service });
    storageService.setItem('fittrack_default_music_service', service);
  },

  playPlaylist: async (playlist: WorkoutPlaylist, service?: MusicService) => {
    const targetService = service || get().defaultService;
    set({ activePlaylist: playlist, isPlaying: true });
    await musicService.openPlaylist(playlist, targetService);
  },

  pausePlayback: () => {
    set({ isPlaying: false });
  },

  resumePlayback: () => {
    set({ isPlaying: true });
  },
}));
