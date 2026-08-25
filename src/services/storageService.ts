import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value) as T;
      }
      return defaultValue;
    } catch (e) {
      console.warn(`[StorageService] Error reading key "${key}":`, e);
      return defaultValue;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[StorageService] Error writing key "${key}":`, e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn(`[StorageService] Error removing key "${key}":`, e);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.warn('[StorageService] Error clearing storage:', e);
    }
  }
};
