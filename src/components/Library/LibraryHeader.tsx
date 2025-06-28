import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, MoreHorizontal, Settings, Download, Play } from 'lucide-react';
import { LibraryFilter, LibraryViewMode } from '../../types/steam';

interface LibraryHeaderProps {
  totalGames: number;
  filteredGames: number;
  filter: LibraryFilter;
  viewMode: LibraryViewMode;
  onFilterChange: (filter: Partial<LibraryFilter>) => void;
  onViewModeChange: (viewMode: LibraryViewMode) => void;
  onSyncLibrary: () => void;
  isLoading?: boolean;
}

export const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  totalGames,
  filteredGames,
  filter,
  viewMode,
  onFilterChange,
  onViewModeChange,
  onSyncLibrary,
  isLoading = false
}) => {
  const platforms = ['steam', 'epic', 'gog', 'origin', 'uplay'];
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'playtime-desc', label: 'Most Played' },
    { value: 'playtime-asc', label: 'Least Played' },
    { value: 'lastPlayed-desc', label: 'Recently Played' },
    { value: 'releaseDate-desc', label: 'Newest' },
    { value: 'releaseDate-asc', label: 'Oldest' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'fileSize-desc', label: 'Largest Files' }
  ];

  const groupOptions = [
    { value: 'none', label: 'No Grouping' },
    { value: 'platform', label: 'By Platform' },
    { value: 'genre', label: 'By Genre' },
    { value: 'installed', label: 'By Install Status' },
    { value: 'features', label: 'By Features' }
  ];

  return (
    <div className="gamer-blur-medium border-b border-gray-700/50 sticky top-0 z-10">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Title and Stats */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold gamer-text-gradient mb-2">Game Library</h1>
              <p className="text-on-surface-variant">
                {filteredGames} of {totalGames} games
                {filter.search && ` matching "${filter.search}"`}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Sync Button */}
              <button
                onClick={onSyncLibrary}
                disabled={isLoading}
                className="gamer-btn gamer-btn-primary"
              >
                {isLoading ? (
                  <div className="gamer-spinner mr-2" />
                ) : (
                  <Download size={16} className="mr-2" />
                )}
                Sync Library
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-800/50 rounded-lg p-1">
                <button
                  onClick={() => onViewModeChange({ ...viewMode, type: 'grid' })}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode.type === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => onViewModeChange({ ...viewMode, type: 'list' })}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode.type === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white placeholder-gray-400"
                value={filter.search}
                onChange={(e) => onFilterChange({ search: e.target.value })}
              />
            </div>
            
            {/* Platform Filter */}
            <select
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
              value={filter.platforms[0] || ''}
              onChange={(e) => onFilterChange({
                platforms: e.target.value ? [e.target.value] : []
              })}
            >
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform} className="capitalize">
                  {platform}
                </option>
              ))}
            </select>
            
            {/* Install Status Filter */}
            <select
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
              value={filter.installed === undefined ? '' : filter.installed.toString()}
              onChange={(e) => onFilterChange({
                installed: e.target.value === '' ? undefined : e.target.value === 'true'
              })}
            >
              <option value="">All Games</option>
              <option value="true">Installed</option>
              <option value="false">Not Installed</option>
            </select>
            
            {/* Sort */}
            <select
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
              value={`${filter.sortBy}-${filter.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                onFilterChange({
                  sortBy: sortBy as any,
                  sortOrder: sortOrder as 'asc' | 'desc'
                });
              }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Group By */}
            <select
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
              value={filter.groupBy || 'none'}
              onChange={(e) => onFilterChange({
                groupBy: e.target.value === 'none' ? undefined : e.target.value as any
              })}
            >
              {groupOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              onClick={() => onFilterChange({ installed: true })}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter.installed === true
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Play size={12} className="inline mr-1" />
              Installed
            </button>
            
            <button
              onClick={() => onFilterChange({ downloading: true })}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter.downloading === true
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Download size={12} className="inline mr-1" />
              Downloading
            </button>
            
            {filter.platforms.length > 0 && (
              <button
                onClick={() => onFilterChange({ platforms: [] })}
                className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                Clear Platform Filter
              </button>
            )}
            
            {filter.search && (
              <button
                onClick={() => onFilterChange({ search: '' })}
                className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};