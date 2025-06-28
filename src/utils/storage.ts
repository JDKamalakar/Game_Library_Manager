import { PlatformCredentials, Game, LibraryStats } from '../types/game';
import { SteamApiConfig } from '../types/steam';
import { encrypt, decrypt } from './encryption';
import { ThemeMode } from '../hooks/useTheme';

const STORAGE_KEYS = {
  CREDENTIALS: 'gamelib_credentials',
  GAMES: 'gamelib_games',
  STATS: 'gamelib_stats',
  THEME_MODE: 'gamelib_theme_mode',
  USER_PREFERENCES: 'gamelib_preferences',
  STEAM_CONFIG: 'gamelib_steam_config',
  STEAM_CACHE: 'gamelib_steam_cache'
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

  // Steam API configuration
  storeSteamConfig: (config: SteamApiConfig): void => {
    const encrypted = encrypt(JSON.stringify(config));
    localStorage.setItem(STORAGE_KEYS.STEAM_CONFIG, encrypted);
  },

  getSteamConfig: (): SteamApiConfig | null => {
    const encrypted = localStorage.getItem(STORAGE_KEYS.STEAM_CONFIG);
    if (!encrypted) return null;
    try {
      const decrypted = decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt Steam config:', error);
      return null;
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

  // Theme mode preference (light/dark/system)
  storeThemeMode: (mode: ThemeMode): void => {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  },

  getThemeMode: (): ThemeMode => {
    return (localStorage.getItem(STORAGE_KEYS.THEME_MODE) as ThemeMode) || 'system';
  },

  // User preferences
  storePreferences: (preferences: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  },

  getPreferences: (): any => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {};
  },

  // Steam cache management
  storeSteamCache: (key: string, data: any, ttl: number = 1800000): void => {
    const cache = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`${STORAGE_KEYS.STEAM_CACHE}_${key}`, JSON.stringify(cache));
  },

  getSteamCache: (key: string): any | null => {
    const stored = localStorage.getItem(`${STORAGE_KEYS.STEAM_CACHE}_${key}`);
    if (!stored) return null;
    
    try {
      const cache = JSON.parse(stored);
      if (Date.now() - cache.timestamp > cache.ttl) {
        localStorage.removeItem(`${STORAGE_KEYS.STEAM_CACHE}_${key}`);
        return null;
      }
      return cache.data;
    } catch (error) {
      return null;
    }
  },

  // Clear all data
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear Steam cache entries
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_KEYS.STEAM_CACHE)) {
        localStorage.removeItem(key);
      }
    });
  }
};