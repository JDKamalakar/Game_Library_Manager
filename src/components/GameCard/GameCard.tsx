import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Trash2, Star, Clock, Calendar } from 'lucide-react';
import { Game } from '../../types/game';
import { useInView } from 'react-intersection-observer';

interface GameCardProps {
  game: Game;
  size?: 'small' | 'medium' | 'large';
  onLaunch?: (game: Game) => void;
  onInstall?: (game: Game) => void;
  onUninstall?: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  size = 'medium',
  onLaunch,
  onInstall,
  onUninstall
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const sizeClasses = {
    small: 'w-32 h-44',
    medium: 'w-40 h-56',
    large: 'w-48 h-64'
  };

  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h` : `${minutes}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      ref={ref}
      className={`${sizeClasses[size]} group relative overflow-hidden rounded-xl elevation-2 surface-container-high cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Game Cover Image */}
      <div className="w-full h-full relative">
        {inView && !imageError && (
          <img
            src={game.coverImage}
            alt={game.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Fallback/Loading */}
        {(!imageLoaded || imageError) && (
          <div className="w-full h-full bg-surface-variant flex items-center justify-center">
            <div className="text-center text-on-surface-variant">
              <Gamepad2 size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium">{game.name}</p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Platform Badge */}
        <div className="absolute top-2 left-2">
          <div className="blur-overlay px-2 py-1 rounded-full">
            <span className="text-xs font-medium uppercase tracking-wide">
              {game.platform}
            </span>
          </div>
        </div>

        {/* Install Status Badge */}
        {game.installed && (
          <div className="absolute top-2 right-2">
            <div className="bg-green-500 text-white p-1.5 rounded-full">
              <Play size={12} />
            </div>
          </div>
        )}

        {/* Hover Overlay with Actions */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Game Info */}
          <div className="text-white mb-3">
            <h3 className="font-bold text-sm mb-1 line-clamp-2">{game.name}</h3>
            <div className="flex items-center space-x-3 text-xs opacity-90">
              {game.playtime > 0 && (
                <div className="flex items-center space-x-1">
                  <Clock size={10} />
                  <span>{formatPlaytime(game.playtime)}</span>
                </div>
              )}
              {game.userRating && (
                <div className="flex items-center space-x-1">
                  <Star size={10} />
                  <span>{game.userRating}/10</span>
                </div>
              )}
            </div>
            {game.lastPlayed && (
              <div className="flex items-center space-x-1 text-xs opacity-75 mt-1">
                <Calendar size={10} />
                <span>Last played {formatDate(game.lastPlayed)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {game.installed ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunch?.(game);
                }}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-medium text-sm transition-colors hover:bg-primary/90"
              >
                Launch
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInstall?.(game);
                }}
                className="flex-1 bg-secondary text-white py-2 rounded-lg font-medium text-sm transition-colors hover:bg-secondary/90"
              >
                Install
              </button>
            )}
            
            {game.installed && onUninstall && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUninstall(game);
                }}
                className="p-2 bg-error/20 text-error rounded-lg transition-colors hover:bg-error/30"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};