import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SortAsc } from 'lucide-react';
import { GameCard } from '../components/GameCard/GameCard';
import { Button } from '../components/ui/Button';
import { storageUtils } from '../utils/storage';
import { Game, GameFilter, GamePlatform } from '../types/game';

export const Library: React.FC = () => {
  const [games] = useState<Game[]>(storageUtils.getGames());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<GameFilter>({
    platforms: [],
    genres: [],
    tags: [],
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games.filter(game => {
      // Search query
      if (filter.searchQuery && !game.name.toLowerCase().includes(filter.searchQuery.toLowerCase())) {
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
      
      // Installed filter
      if (filter.installed !== undefined && game.installed !== filter.installed) {
        return false;
      }
      
      return true;
    });

    // Sort
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
      }
      
      return filter.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [games, filter]);

  const handleGameLaunch = (game: Game) => {
    console.log('Launching game:', game.name);
    // TODO: Implement game launch functionality
  };

  const handleGameInstall = (game: Game) => {
    console.log('Installing game:', game.name);
    // TODO: Implement game install functionality
  };

  const handleGameUninstall = (game: Game) => {
    console.log('Uninstalling game:', game.name);
    // TODO: Implement game uninstall functionality
  };

  const uniqueGenres = useMemo(() => {
    const genres = new Set<string>();
    games.forEach(game => game.genres.forEach(genre => genres.add(genre)));
    return Array.from(genres).sort();
  }, [games]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-on-surface mb-2">Game Library</h1>
              <p className="text-on-surface-variant">
                {filteredAndSortedGames.length} of {games.length} games
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'filled' : 'outlined'}
                size="small"
                icon={<Grid size={16} />}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'filled' : 'outlined'}
                size="small"
                icon={<List size={16} />}
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mt-6 flex flex-col lg:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-3 rounded-xl surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                value={filter.searchQuery}
                onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
              />
            </div>
            
            {/* Platform Filter */}
            <select
              className="px-4 py-3 rounded-xl surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              value={filter.platforms[0] || ''}
              onChange={(e) => setFilter(prev => ({
                ...prev,
                platforms: e.target.value ? [e.target.value as GamePlatform] : []
              }))}
            >
              <option value="">All Platforms</option>
              {Object.values(GamePlatform).map(platform => (
                <option key={platform} value={platform} className="capitalize">
                  {platform}
                </option>
              ))}
            </select>
            
            {/* Genre Filter */}
            <select
              className="px-4 py-3 rounded-xl surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              value={filter.genres[0] || ''}
              onChange={(e) => setFilter(prev => ({
                ...prev,
                genres: e.target.value ? [e.target.value] : []
              }))}
            >
              <option value="">All Genres</option>
              {uniqueGenres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            
            {/* Sort */}
            <select
              className="px-4 py-3 rounded-xl surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              value={`${filter.sortBy}-${filter.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                setFilter(prev => ({
                  ...prev,
                  sortBy: sortBy as any,
                  sortOrder: sortOrder as 'asc' | 'desc'
                }));
              }}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="playtime-desc">Most Played</option>
              <option value="playtime-asc">Least Played</option>
              <option value="lastPlayed-desc">Recently Played</option>
              <option value="releaseDate-desc">Newest</option>
              <option value="releaseDate-asc">Oldest</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </motion.div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {filteredAndSortedGames.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Filter size={64} className="mx-auto mb-4 text-on-surface-variant opacity-50" />
              <h3 className="text-xl font-semibold text-on-surface mb-2">No games found</h3>
              <p className="text-on-surface-variant">Try adjusting your filters or search terms.</p>
            </motion.div>
          ) : (
            <motion.div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                  : 'grid-cols-1'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {filteredAndSortedGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <GameCard
                    game={game}
                    size={viewMode === 'grid' ? 'medium' : 'large'}
                    onLaunch={handleGameLaunch}
                    onInstall={handleGameInstall}
                    onUninstall={handleGameUninstall}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};