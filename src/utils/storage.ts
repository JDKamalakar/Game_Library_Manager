import { PlatformCredentials, Game, LibraryStats } from '../types/game';
import { encrypt, decrypt } from './encryption';

const STORAGE_KEYS = {
  CREDENTIALS: 'gamelib_credentials',
  GAMES: 'gamelib_games',
  STATS: 'gamelib_stats',
  THEME: 'gamelib_theme',
  USER_PREFERENCES: 'gamelib_preferences'
};

export const storageUtils = {
  // Secure credential storage
  storeCredentials: (credentials: PlatformCredentials[]): void => {
    const encrypted = encrypt(JSON.stringify(credentials));
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, encrypted);
  },

  getCredentials: (): PlatformCredentials[] => {
    const encrypted = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    if (!encrypted) return [];
    try {
      const decrypted = decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt credentials:', error);
      return [];
    }
  },

  // Game library storage
  storeGames: (games: Game[]): void => {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
  },

  getGames: (): Game[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.GAMES);
    return stored ? JSON.parse(stored) : [];
  },

  // Library statistics
  storeStats: (stats: LibraryStats): void => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  },

  getStats: (): LibraryStats | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.STATS);
    return stored ? JSON.parse(stored) : null;
  },

  // Theme preference
  storeTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  // User preferences
  storePreferences: (preferences: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  },

  getPreferences: (): any => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {};
  },

  // Clear all data
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};