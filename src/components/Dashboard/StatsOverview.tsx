import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Clock, Trophy, DollarSign, TrendingUp, Users } from 'lucide-react';
import { LibraryStats } from '../../types/game';
import { Card } from '../ui/Card';

interface StatsOverviewProps {
  stats: LibraryStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    return hours > 24 ? `${Math.floor(hours / 24)}d ${hours % 24}h` : `${hours}h`;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const statCards = [
    {
      title: 'Total Games',
      value: stats.totalGames.toLocaleString(),
      icon: Gamepad2,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Playtime',
      value: formatPlaytime(stats.totalPlaytime),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Achievements',
      value: `${stats.achievementProgress.unlocked}/${stats.achievementProgress.total}`,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Library Value',
      value: formatCurrency(stats.libraryValue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Installed Games',
      value: stats.installedGames.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Achievement Rate',
      value: `${Math.round(stats.achievementProgress.percentage)}%`,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Card className="relative overflow-hidden" interactive>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface-variant mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-on-surface">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
            
            {/* Animated Background Pattern */}
            <div className="absolute -right-8 -top-8 w-24 h-24 opacity-5">
              <stat.icon size={96} className="text-current" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};