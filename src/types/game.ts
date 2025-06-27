export interface Game {
  id: string;
  name: string;
  platform: GamePlatform;
  coverImage: string;
  headerImage?: string;
  description?: string;
  genres: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
  playtime: number; // in minutes
  lastPlayed?: string;
  installed: boolean;
  achievements?: Achievement[];
  metacriticScore?: number;
  userRating?: number;
  price?: number;
  discountPercent?: number;
  tags: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity?: number;
}

export enum GamePlatform {
  STEAM = 'steam',
  GOG = 'gog',
  EPIC = 'epic',
  ORIGIN = 'origin',
  UPLAY = 'uplay',
  BATTLENET = 'battlenet',
  XBOX = 'xbox',
  PLAYSTATION = 'playstation',
  OTHER = 'other'
}

export interface PlatformCredentials {
  platform: GamePlatform;
  username?: string;
  encryptedToken: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface LibraryStats {
  totalGames: number;
  totalPlaytime: number;
  installedGames: number;
  recentlyPlayed: Game[];
  mostPlayed: Game[];
  libraryValue: number;
  achievementProgress: {
    total: number;
    unlocked: number;
    percentage: number;
  };
  platformDistribution: Record<GamePlatform, number>;
  genreDistribution: Record<string, number>;
}

export interface GameFilter {
  platforms: GamePlatform[];
  genres: string[];
  installed?: boolean;
  tags: string[];
  searchQuery: string;
  sortBy: 'name' | 'playtime' | 'lastPlayed' | 'releaseDate' | 'rating';
  sortOrder: 'asc' | 'desc';
}