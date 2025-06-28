import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Download, Star, Clock, Calendar, Users, Trophy, Monitor, Smartphone, HardDrive } from 'lucide-react';
import { EnhancedGame } from '../types/steam';
import { getAllDemoGames } from '../data/demoGames';

interface GameDetailsProps {
  gameId: string;
  onBack: () => void;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ gameId, onBack }) => {
  const allGames = getAllDemoGames();
  const game = allGames.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Game Not Found</h2>
          <p className="text-gray-400 mb-4">The requested game could not be found.</p>
          <button
            onClick={onBack}
            className="gamer-btn gamer-btn-primary"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'steam':
        return <Monitor size={20} />;
      case 'epic':
        return <Smartphone size={20} />;
      case 'gog':
        return <HardDrive size={20} />;
      default:
        return <Monitor size={20} />;
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="relative">
        {/* Header Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={game.headerImage || game.coverImage}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-6 gamer-btn gamer-btn-ghost"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </button>

          {/* Game Title and Basic Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end space-x-6">
              <div className="w-32 h-44 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/20">
                <img
                  src={game.coverImage}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  {getPlatformIcon(game.platform)}
                  <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                    {game.platform}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-2">{game.name}</h1>
                
                <div className="flex items-center space-x-6 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{formatDate(game.releaseDate)}</span>
                  </div>
                  
                  {game.userRating && (
                    <div className="flex items-center space-x-1">
                      <Star size={16} />
                      <span>{game.userRating.toFixed(1)}/10</span>
                    </div>
                  )}
                  
                  {game.playtime > 0 && (
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{formatPlaytime(game.playtime)} played</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  {game.installed ? (
                    <button className="gamer-btn gamer-btn-primary px-8 py-3">
                      <Play size={20} className="mr-2" />
                      Launch Game
                    </button>
                  ) : (
                    <button className="gamer-btn gamer-btn-secondary px-8 py-3">
                      <Download size={20} className="mr-2" />
                      Install Game
                    </button>
                  )}
                  
                  <button className="gamer-btn gamer-btn-ghost px-6 py-3">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                className="gamer-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">About This Game</h2>
                <p className="text-gray-300 leading-relaxed">
                  {game.description || 'No description available for this game.'}
                </p>
              </motion.div>

              {/* Screenshots */}
              <motion.div
                className="gamer-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={game.headerImage || game.coverImage}
                        alt={`Screenshot ${i}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Game Stats */}
              <motion.div
                className="gamer-card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Game Statistics</h3>
                <div className="space-y-3">
                  {game.playtime > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Playtime</span>
                      <span className="text-white font-medium">{formatPlaytime(game.playtime)}</span>
                    </div>
                  )}
                  
                  {game.lastPlayed && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Played</span>
                      <span className="text-white font-medium">{formatDate(game.lastPlayed)}</span>
                    </div>
                  )}
                  
                  {game.achievements && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Achievements</span>
                      <span className="text-white font-medium">
                        {game.achievements.unlocked}/{game.achievements.total}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Game Info */}
              <motion.div
                className="gamer-card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Game Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 block text-sm">Developer</span>
                    <span className="text-white font-medium">{game.developer}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 block text-sm">Publisher</span>
                    <span className="text-white font-medium">{game.publisher}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 block text-sm">Release Date</span>
                    <span className="text-white font-medium">{formatDate(game.releaseDate)}</span>
                  </div>
                  
                  {game.genres.length > 0 && (
                    <div>
                      <span className="text-gray-400 block text-sm mb-1">Genres</span>
                      <div className="flex flex-wrap gap-1">
                        {game.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Platform Support */}
              <motion.div
                className="gamer-card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Platform Support</h3>
                <div className="space-y-2">
                  <div className={`flex items-center space-x-2 ${game.platforms.windows ? 'text-green-400' : 'text-gray-500'}`}>
                    <Monitor size={16} />
                    <span>Windows</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${game.platforms.mac ? 'text-green-400' : 'text-gray-500'}`}>
                    <Smartphone size={16} />
                    <span>macOS</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${game.platforms.linux ? 'text-green-400' : 'text-gray-500'}`}>
                    <HardDrive size={16} />
                    <span>Linux</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};