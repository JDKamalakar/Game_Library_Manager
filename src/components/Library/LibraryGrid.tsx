import React from 'react';
import { motion } from 'framer-motion';
import { GameCard } from '../GameCard/GameCard';
import { EnhancedGame, LibraryViewMode } from '../../types/steam';
import { Gamepad2 } from 'lucide-react';

interface LibraryGridProps {
  games: EnhancedGame[];
  viewMode: LibraryViewMode;
  groupBy?: string;
  onGameLaunch: (game: EnhancedGame) => void;
  onGameInstall: (game: EnhancedGame) => void;
  onGameUninstall: (game: EnhancedGame) => void;
  onGameClick: (game: EnhancedGame) => void;
  isLoading?: boolean;
}

export const LibraryGrid: React.FC<LibraryGridProps> = ({
  games,
  viewMode,
  groupBy,
  onGameLaunch,
  onGameInstall,
  onGameUninstall,
  onGameClick,
  isLoading = false
}) => {
  const getGridClasses = () => {
    if (viewMode.type === 'list') {
      return 'space-y-2';
    }
    
    const sizeClasses = {
      small: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4',
      medium: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6',
      large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'
    };
    
    return `grid ${sizeClasses[viewMode.cardSize]}`;
  };

  const groupGames = (games: EnhancedGame[]) => {
    if (!groupBy || groupBy === 'none') {
      return { 'All Games': games };
    }

    const grouped: Record<string, EnhancedGame[]> = {};

    games.forEach(game => {
      let groupKey = 'Other';

      switch (groupBy) {
        case 'platform':
          groupKey = game.platform.charAt(0).toUpperCase() + game.platform.slice(1);
          break;
        case 'genre':
          groupKey = game.genres[0] || 'Unknown';
          break;
        case 'installed':
          groupKey = game.installed ? 'Installed' : 'Not Installed';
          break;
        case 'features':
          groupKey = game.features[0] || 'No Features';
          break;
        default:
          groupKey = 'All Games';
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(game);
    });

    return grouped;
  };

  const groupedGames = groupGames(games);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" style={{ width: '48px', height: '48px' }} />
          <h3 className="text-xl font-semibold text-primary mb-2">Loading Library</h3>
          <p className="text-secondary">Fetching your games...</p>
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Gamepad2 size={64} className="mx-auto mb-4 text-secondary opacity-50" />
        <h3 className="text-xl font-semibold text-primary mb-2">No games found</h3>
        <p className="text-secondary">Try adjusting your filters or search terms.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedGames).map(([groupName, groupGames], groupIndex) => (
        <motion.div
          key={groupName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
        >
          {groupBy && groupBy !== 'none' && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">{groupName}</h2>
              <div className="h-px bg-gradient-to-r from-blue-500 to-purple-500 w-24"></div>
              <p className="text-sm text-secondary mt-2">
                {groupGames.length} game{groupGames.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
          
          <div className={getGridClasses()}>
            {groupGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (groupIndex * 0.1) + (index * 0.05), duration: 0.3 }}
              >
                <GameCard
                  game={game}
                  size={viewMode.cardSize}
                  viewMode={viewMode.type}
                  onLaunch={onGameLaunch}
                  onInstall={onGameInstall}
                  onUninstall={onGameUninstall}
                  onClick={onGameClick}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};