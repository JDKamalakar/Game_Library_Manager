import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Trash2, Star, Clock, Calendar, Monitor, Smartphone, HardDrive, Gamepad2 } from 'lucide-react';
import { EnhancedGame } from '../../types/steam';
import { useInView } from 'react-intersection-observer';

interface GameCardProps {
  game: EnhancedGame;
  size?: 'small' | 'medium' | 'large';
  viewMode?: 'grid' | 'list' | 'compact';
  onLaunch?: (game: EnhancedGame) => void;
  onInstall?: (game: EnhancedGame) => void;
  onUninstall?: (game: EnhancedGame) => void;
  onClick?: (game: EnhancedGame) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  size = 'medium',
  viewMode = 'grid',
  onLaunch,
  onInstall,
  onUninstall,
  onClick
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

  const formatFileSize = (sizeInMB: number): string => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(1)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'steam':
        return <Monitor size={16} />;
      case 'epic':
        return <Gamepad2 size={16} />;
      case 'gog':
        return <Smartphone size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  const handleCardClick = () => {
    onClick?.(game);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={ref}
        className="gamer-list-card"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          {/* Game Cover */}
          <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
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
            
            {(!imageLoaded || imageError) && (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <Gamepad2 size={20} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-on-surface truncate">{game.name}</h3>
              <div className="flex items-center space-x-1 text-xs text-on-surface-variant">
                {getPlatformIcon(game.platform)}
                <span className="capitalize">{game.platform}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-on-surface-variant">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{formatDate(game.releaseDate)}</span>
              </div>
              
              {game.playtime > 0 && (
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{formatPlaytime(game.playtime)}</span>
                </div>
              )}
              
              {game.lastPlayed && (
                <div className="flex items-center space-x-1">
                  <span>Last played: {formatDate(game.lastPlayed)}</span>
                </div>
              )}
            </div>

            {/* Download Progress */}
            {game.downloading && game.downloadProgress !== undefined && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                  <span>Downloading...</span>
                  <span>{game.downloadProgress}%</span>
                </div>
                <div className="gamer-progress">
                  <div 
                    className="gamer-progress-bar" 
                    style={{ width: `${game.downloadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {game.installed ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunch?.(game);
                }}
                className="gamer-btn gamer-btn-primary px-4 py-2"
              >
                <Play size={16} className="mr-1" />
                Launch
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInstall?.(game);
                }}
                className="gamer-btn gamer-btn-secondary px-4 py-2"
                disabled={game.downloading}
              >
                <Download size={16} className="mr-1" />
                {game.downloading ? 'Downloading' : 'Install'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`${sizeClasses[size]} gamer-game-card relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
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
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Gamepad2 size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium px-2">{game.name}</p>
            </div>
          </div>
        )}

        {/* Platform Badge */}
        <div className="absolute top-2 left-2">
          <div className="gamer-blur-light px-2 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              {getPlatformIcon(game.platform)}
              <span className="text-xs font-medium uppercase tracking-wide capitalize text-on-surface">
                {game.platform}
              </span>
            </div>
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

        {/* Download Progress */}
        {game.downloading && game.downloadProgress !== undefined && (
          <div className="absolute top-2 right-2">
            <div className="gamer-blur-medium px-2 py-1 rounded-full">
              <div className="flex items-center space-x-1">
                <Download size={12} />
                <span className="text-xs font-medium text-on-surface">{game.downloadProgress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Hover Overlay with Game Info */}
        <div className="gamer-game-card-overlay">
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
                  <span>{game.userRating.toFixed(1)}</span>
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

          {/* Download Progress Bar */}
          {game.downloading && game.downloadProgress !== undefined && (
            <div className="mb-3">
              <div className="gamer-progress">
                <div 
                  className="gamer-progress-bar" 
                  style={{ width: `${game.downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {game.installed ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunch?.(game);
                }}
                className="flex-1 gamer-btn gamer-btn-primary py-2 text-sm"
              >
                <Play size={14} className="mr-1" />
                Launch
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInstall?.(game);
                }}
                className="flex-1 gamer-btn gamer-btn-secondary py-2 text-sm"
                disabled={game.downloading}
              >
                <Download size={14} className="mr-1" />
                {game.downloading ? 'Downloading' : 'Install'}
              </button>
            )}
            
            {game.installed && onUninstall && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUninstall(game);
                }}
                className="p-2 bg-red-500/20 text-red-400 rounded-lg transition-colors hover:bg-red-500/30"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Game Title Below Card */}
      <div className="gamer-game-title">
        {game.name}
      </div>
    </motion.div>
  );
};