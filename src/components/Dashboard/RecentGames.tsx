import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Play } from 'lucide-react';
import { Game } from '../../types/game';
import { Card } from '../ui/Card';

interface RecentGamesProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

export const RecentGames: React.FC<RecentGamesProps> = ({ games, onGameClick }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-on-surface flex items-center">
          <Clock size={20} className="mr-2 text-primary" />
          Recently Played
        </h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {games.length === 0 ? (
          <div className="text-center py-8 text-on-surface-variant">
            <Play size={48} className="mx-auto mb-3 opacity-50" />
            <p>No recently played games</p>
            <p className="text-sm mt-1">Start playing to see your recent activity</p>
          </div>
        ) : (
          games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-variant/20 cursor-pointer transition-colors"
              onClick={() => onGameClick(game)}
            >
              <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={game.coverImage}
                  alt={game.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-on-surface truncate">
                  {game.name}
                </h3>
                <p className="text-sm text-on-surface-variant capitalize">
                  {game.platform}
                </p>
                {game.lastPlayed && (
                  <p className="text-xs text-on-surface-variant mt-1">
                    {formatDate(game.lastPlayed)}
                  </p>
                )}
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-medium text-on-surface">
                  {formatPlaytime(game.playtime)}
                </div>
                <div className="text-xs text-on-surface-variant">
                  playtime
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};