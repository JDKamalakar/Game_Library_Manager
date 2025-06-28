import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LibraryHeader } from '../components/Library/LibraryHeader';
import { LibraryGrid } from '../components/Library/LibraryGrid';
import { SteamApiConfigComponent } from '../components/Steam/SteamApiConfig';
import { steamApiService } from '../services/steamApi';
import { getAllDemoGames, getDemoGamesByPlatform } from '../data/demoGames';
import { EnhancedGame, LibraryFilter, LibraryViewMode } from '../types/steam';

interface GamerLibraryProps {
  onGameSelect?: (gameId: string) => void;
}

export const GamerLibrary: React.FC<GamerLibraryProps> = ({ onGameSelect }) => {
  const [games, setGames] = useState<EnhancedGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [filter, setFilter] = useState<LibraryFilter>({
    search: '',
    platforms: [],
    genres: [],
    categories: [],
    features: [],
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [viewMode, setViewMode] = useState<LibraryViewMode>({
    type: 'grid',
    cardSize: 'medium'
  });

  useEffect(() => {
    // Check if Steam API is configured
    const config = steamApiService.getConfig();
    if (config?.apiKey && config?.steamId) {
      setIsConfigured(true);
      loadLibrary();
    } else {
      // Load demo data for all platforms
      setGames(getAllDemoGames());
    }
  }, []);

  const loadLibrary = async () => {
    setIsLoading(true);
    try {
      const steamGames = await steamApiService.getEnhancedLibrary();
      const demoGames = getAllDemoGames().filter(game => game.platform !== 'steam');
      setGames([...steamGames, ...demoGames]);
    } catch (error) {
      console.error('Failed to load Steam library:', error);
      // Fallback to demo data
      setGames(getAllDemoGames());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncLibrary = async () => {
    if (isConfigured) {
      await loadLibrary();
    } else {
      // Just refresh demo data
      setGames(getAllDemoGames());
    }
  };

  const handleFilterChange = (newFilter: Partial<LibraryFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleViewModeChange = (newViewMode: LibraryViewMode) => {
    setViewMode(newViewMode);
  };

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games.filter(game => {
      // Search filter
      if (filter.search && !game.name.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      
      // Platform filter
      if (filter.platforms.length > 0 && !filter.platforms.includes(game.platform)) {
        return false;
      }
      
      // Genre filter
      if (filter.genres.length > 0 && !filter.genres.some(genre => game.genres.includes(genre))) {
        return false;
      }
      
      // Install status filter
      if (filter.installed !== undefined && game.installed !== filter.installed) {
        return false;
      }
      
      // Download status filter
      if (filter.downloading !== undefined && game.downloading !== filter.downloading) {
        return false;
      }
      
      return true;
    });

    // Sort games
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filter.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'playtime':
          comparison = a.playtime - b.playtime;
          break;
        case 'lastPlayed':
          const aDate = a.lastPlayed ? new Date(a.lastPlayed).getTime() : 0;
          const bDate = b.lastPlayed ? new Date(b.lastPlayed).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case 'releaseDate':
          comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
          break;
        case 'rating':
          comparison = (a.userRating || 0) - (b.userRating || 0);
          break;
        case 'fileSize':
          comparison = (a.fileSize || 0) - (b.fileSize || 0);
          break;
      }
      
      return filter.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [games, filter]);

  const handleGameLaunch = (game: EnhancedGame) => {
    console.log('Launching game:', game.name);
    // TODO: Implement actual game launch
  };

  const handleGameInstall = (game: EnhancedGame) => {
    console.log('Installing game:', game.name);
    // TODO: Implement actual game installation
    
    // Simulate installation start
    setGames(prev => prev.map(g => 
      g.id === game.id 
        ? { ...g, downloading: true, downloadProgress: 0 }
        : g
    ));
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        setGames(prev => prev.map(g => 
          g.id === game.id 
            ? { ...g, downloading: false, downloadProgress: undefined, installed: true }
            : g
        ));
        clearInterval(interval);
      } else {
        setGames(prev => prev.map(g => 
          g.id === game.id 
            ? { ...g, downloadProgress: Math.min(progress, 100) }
            : g
        ));
      }
    }, 500);
  };

  const handleGameUninstall = (game: EnhancedGame) => {
    console.log('Uninstalling game:', game.name);
    // TODO: Implement actual game uninstallation
    
    setGames(prev => prev.map(g => 
      g.id === game.id 
        ? { ...g, installed: false, downloading: false, downloadProgress: undefined }
        : g
    ));
  };

  const handleGameClick = (game: EnhancedGame) => {
    onGameSelect?.(game.id);
  };

  if (!isConfigured && games.length === 0) {
    return (
      <SteamApiConfigComponent 
        onConfigured={() => {
          setIsConfigured(true);
          loadLibrary();
        }} 
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <LibraryHeader
        totalGames={games.length}
        filteredGames={filteredAndSortedGames.length}
        filter={filter}
        viewMode={viewMode}
        onFilterChange={handleFilterChange}
        onViewModeChange={handleViewModeChange}
        onSyncLibrary={handleSyncLibrary}
        isLoading={isLoading}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <LibraryGrid
            games={filteredAndSortedGames}
            viewMode={viewMode}
            groupBy={filter.groupBy}
            onGameLaunch={handleGameLaunch}
            onGameInstall={handleGameInstall}
            onGameUninstall={handleGameUninstall}
            onGameClick={handleGameClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};