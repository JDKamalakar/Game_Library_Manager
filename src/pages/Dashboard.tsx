import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap } from 'lucide-react';
import { StatsOverview } from '../components/Dashboard/StatsOverview';
import { RecentGames } from '../components/Dashboard/RecentGames';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { storageUtils } from '../utils/storage';
import { Game } from '../types/game';

export const Dashboard: React.FC = () => {
  const stats = storageUtils.getStats();
  const games = storageUtils.getGames();

  const handleGameClick = (game: Game) => {
    console.log('Game clicked:', game.name);
    // TODO: Implement game details modal or navigation
  };

  const handleSyncLibrary = () => {
    console.log('Syncing library...');
    // TODO: Implement library sync functionality
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-on-surface mb-2">
                Welcome back, Gamer!
              </h1>
              <p className="text-on-surface-variant">
                Here's what's happening with your game library
              </p>
            </div>
            <Button
              variant="filled"
              icon={<Zap size={20} />}
              onClick={handleSyncLibrary}
            >
              Sync Library
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        {stats && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <StatsOverview stats={stats} />
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Games */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <RecentGames
              games={stats?.recentlyPlayed || []}
              onGameClick={handleGameClick}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card>
              <h2 className="text-lg font-semibold text-on-surface mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <Button
                  variant="outlined"
                  className="w-full justify-start"
                  icon={<Users size={16} />}
                >
                  Connect Steam Account
                </Button>
                <Button
                  variant="outlined"
                  className="w-full justify-start"
                  icon={<Users size={16} />}
                >
                  Connect Epic Games
                </Button>
                <Button
                  variant="outlined"
                  className="w-full justify-start"
                  icon={<Users size={16} />}
                >
                  Connect GOG Galaxy
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Achievement Progress */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <h2 className="text-lg font-semibold text-on-surface mb-4">
                Achievement Progress
              </h2>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-on-surface-variant">
                  {stats.achievementProgress.unlocked} of {stats.achievementProgress.total} achievements
                </span>
                <span className="text-sm font-medium text-on-surface">
                  {Math.round(stats.achievementProgress.percentage)}%
                </span>
              </div>
              
              <div className="w-full bg-surface-variant rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.achievementProgress.percentage}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};