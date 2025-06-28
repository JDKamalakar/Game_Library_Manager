export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  img_icon_url: string;
  img_logo_url: string;
  has_community_visible_stats?: boolean;
  rtime_last_played?: number;
}

export interface SteamOwnedGamesResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}

export interface SteamAppDetails {
  [appId: string]: {
    success: boolean;
    data?: {
      type: string;
      name: string;
      steam_appid: number;
      required_age: number;
      is_free: boolean;
      detailed_description: string;
      about_the_game: string;
      short_description: string;
      supported_languages: string;
      header_image: string;
      website: string;
      pc_requirements: any;
      mac_requirements: any;
      linux_requirements: any;
      developers: string[];
      publishers: string[];
      price_overview?: {
        currency: string;
        initial: number;
        final: number;
        discount_percent: number;
        initial_formatted: string;
        final_formatted: string;
      };
      packages: number[];
      package_groups: any[];
      platforms: {
        windows: boolean;
        mac: boolean;
        linux: boolean;
      };
      categories: Array<{
        id: number;
        description: string;
      }>;
      genres: Array<{
        id: string;
        description: string;
      }>;
      screenshots: Array<{
        id: number;
        path_thumbnail: string;
        path_full: string;
      }>;
      movies?: Array<{
        id: number;
        name: string;
        thumbnail: string;
        webm: any;
        mp4: any;
        highlight: boolean;
      }>;
      recommendations?: {
        total: number;
      };
      achievements?: {
        total: number;
        highlighted: Array<{
          name: string;
          path: string;
        }>;
      };
      release_date: {
        coming_soon: boolean;
        date: string;
      };
      support_info: {
        url: string;
        email: string;
      };
      background: string;
      content_descriptors: {
        ids: number[];
        notes: string;
      };
    };
  };
}

export interface EnhancedGame {
  id: string;
  appid?: number;
  name: string;
  platform: string;
  coverImage: string;
  headerImage?: string;
  description?: string;
  genres: string[];
  categories: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
  playtime: number;
  lastPlayed?: string;
  installed: boolean;
  downloading?: boolean;
  downloadProgress?: number;
  fileSize?: number;
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  price?: {
    current: number;
    original: number;
    discount: number;
    formatted: string;
  };
  userRating?: number;
  metacriticScore?: number;
  achievements?: {
    total: number;
    unlocked: number;
  };
  features: string[];
  tags: string[];
}

export interface SteamApiConfig {
  apiKey: string;
  steamId: string;
  proxyUrl?: string;
}

export interface LibraryFilter {
  search: string;
  platforms: string[];
  genres: string[];
  categories: string[];
  features: string[];
  installed?: boolean;
  downloading?: boolean;
  sortBy: 'name' | 'playtime' | 'lastPlayed' | 'releaseDate' | 'fileSize' | 'rating';
  sortOrder: 'asc' | 'desc';
  groupBy?: 'none' | 'genre' | 'category' | 'platform' | 'installed' | 'features';
}

export interface LibraryViewMode {
  type: 'grid' | 'list' | 'compact';
  cardSize: 'small' | 'medium' | 'large';
}