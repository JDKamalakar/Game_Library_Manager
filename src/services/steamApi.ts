import axios from 'axios';
import { SteamOwnedGamesResponse, SteamAppDetails, SteamApiConfig, EnhancedGame } from '../types/steam';
import { storageUtils } from '../utils/storage';

class SteamApiService {
  private config: SteamApiConfig | null = null;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly CACHE_TTL = 1000 * 60 * 30; // 30 minutes
  private readonly BATCH_SIZE = 10;
  private readonly RATE_LIMIT_DELAY = 1000; // 1 second between batches

  setConfig(config: SteamApiConfig) {
    this.config = config;
    storageUtils.storeSteamConfig(config);
  }

  getConfig(): SteamApiConfig | null {
    if (!this.config) {
      this.config = storageUtils.getSteamConfig();
    }
    return this.config;
  }

  private getCacheKey(endpoint: string, params: Record<string, any>): string {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  private setCache(key: string, data: any, ttl: number = this.CACHE_TTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private async makeApiRequest(url: string, cacheKey: string): Promise<any> {
    // Check cache first
    const cached = this.getCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const config = this.getConfig();
      if (!config) {
        throw new Error('Steam API not configured');
      }

      const fullUrl = config.proxyUrl ? `${config.proxyUrl}/${url}` : url;
      
      const response = await axios.get(fullUrl, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Steam API request failed:', error);
      
      // Try to return cached data even if expired
      const expiredCache = this.cache.get(cacheKey);
      if (expiredCache) {
        console.warn('Using expired cache data due to API failure');
        return expiredCache.data;
      }
      
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const config = this.getConfig();
      if (!config) return false;

      await this.getOwnedGames();
      return true;
    } catch (error) {
      console.error('Steam API connection test failed:', error);
      return false;
    }
  }

  async getOwnedGames(): Promise<SteamOwnedGamesResponse> {
    const config = this.getConfig();
    if (!config) {
      throw new Error('Steam API not configured');
    }

    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${config.apiKey}&steamid=${config.steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
    const cacheKey = this.getCacheKey('owned_games', { steamId: config.steamId });

    return this.makeApiRequest(url, cacheKey);
  }

  async getAppDetails(appIds: number[]): Promise<SteamAppDetails> {
    const results: SteamAppDetails = {};
    
    // Process in batches to respect rate limits
    for (let i = 0; i < appIds.length; i += this.BATCH_SIZE) {
      const batch = appIds.slice(i, i + this.BATCH_SIZE);
      const batchPromises = batch.map(async (appId) => {
        const cacheKey = this.getCacheKey('app_details', { appId });
        const cached = this.getCache(cacheKey);
        
        if (cached) {
          return { appId, data: cached };
        }

        try {
          const url = `https://store.steampowered.com/api/appdetails?appids=${appId}&format=json`;
          const response = await this.makeApiRequest(url, cacheKey);
          return { appId, data: response };
        } catch (error) {
          console.error(`Failed to fetch details for app ${appId}:`, error);
          return { appId, data: null };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      
      batchResults.forEach(({ appId, data }) => {
        if (data) {
          results[appId] = data[appId] || { success: false };
        } else {
          results[appId] = { success: false };
        }
      });

      // Rate limiting delay between batches
      if (i + this.BATCH_SIZE < appIds.length) {
        await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY));
      }
    }

    return results;
  }

  async getEnhancedLibrary(): Promise<EnhancedGame[]> {
    try {
      const ownedGames = await this.getOwnedGames();
      
      if (!ownedGames.response?.games) {
        return [];
      }

      const games = ownedGames.response.games;
      const appIds = games.map(game => game.appid);
      
      // Get detailed information for all games
      const appDetails = await this.getAppDetails(appIds);

      const enhancedGames: EnhancedGame[] = games.map(game => {
        const details = appDetails[game.appid]?.data;
        
        return {
          id: `steam-${game.appid}`,
          appid: game.appid,
          name: game.name,
          platform: 'steam',
          coverImage: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
          headerImage: details?.header_image || `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
          description: details?.short_description || '',
          genres: details?.genres?.map(g => g.description) || [],
          categories: details?.categories?.map(c => c.description) || [],
          developer: details?.developers?.[0] || 'Unknown',
          publisher: details?.publishers?.[0] || 'Unknown',
          releaseDate: details?.release_date?.date || '',
          playtime: game.playtime_forever,
          lastPlayed: game.rtime_last_played ? new Date(game.rtime_last_played * 1000).toISOString() : undefined,
          installed: Math.random() > 0.5, // Random for demo
          downloading: Math.random() > 0.8,
          downloadProgress: Math.random() > 0.8 ? Math.floor(Math.random() * 100) : undefined,
          fileSize: Math.floor(Math.random() * 100000) + 10000,
          platforms: details?.platforms || { windows: true, mac: false, linux: false },
          price: details?.price_overview ? {
            current: details.price_overview.final,
            original: details.price_overview.initial,
            discount: details.price_overview.discount_percent,
            formatted: details.price_overview.final_formatted
          } : undefined,
          userRating: Math.random() * 10,
          metacriticScore: details?.metacritic?.score,
          achievements: details?.achievements ? {
            total: details.achievements.total,
            unlocked: Math.floor(Math.random() * details.achievements.total)
          } : undefined,
          features: details?.categories?.map(c => c.description) || [],
          tags: details?.genres?.map(g => g.description) || []
        };
      });

      return enhancedGames;
    } catch (error) {
      console.error('Failed to get enhanced library:', error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const steamApiService = new SteamApiService();