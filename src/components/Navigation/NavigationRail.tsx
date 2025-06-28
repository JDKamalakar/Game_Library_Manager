import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Gamepad2, BarChart3, Settings, Monitor, Smartphone, HardDrive, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { getAllDemoGames } from '../../data/demoGames';

interface NavigationRailProps {
  collapsed: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleCollapse: () => void;
  onGameSelect?: (gameId: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'library', label: 'Game Library', icon: Gamepad2 },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const platformItems = [
  { id: 'steam', label: 'Steam', icon: Monitor, color: '#1b2838' },
  { id: 'epic', label: 'Epic Games', icon: Zap, color: '#0078f2' },
  { id: 'gog', label: 'GOG', icon: Smartphone, color: '#86328a' },
  { id: 'origin', label: 'Origin', icon: HardDrive, color: '#f56500' },
  { id: 'uplay', label: 'Ubisoft', icon: Gamepad2, color: '#0082c9' }
];

export const NavigationRail: React.FC<NavigationRailProps> = ({
  collapsed,
  activeTab,
  onTabChange,
  onToggleCollapse,
  onGameSelect
}) => {
  const [expandedPlatforms, setExpandedPlatforms] = useState<string[]>(['steam', 'epic']);
  const allGames = getAllDemoGames();

  const togglePlatform = (platformId: string) => {
    setExpandedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const getGamesByPlatform = (platform: string) => {
    return allGames.filter(game => game.platform === platform).slice(0, 8); // Limit to 8 games per platform
  };

  const handleGameClick = (gameId: string) => {
    onGameSelect?.(gameId);
    onTabChange('game-details');
  };

  return (
    <motion.div
      className="gamer-nav-rail h-full flex flex-col gamer-blur-medium"
      animate={{ width: collapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.h1
              className="text-xl font-bold gamer-text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              GameLib Pro
            </motion.h1>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <Gamepad2 size={20} className="text-blue-400" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-2">
          {!collapsed && (
            <motion.h2
              className="px-4 py-2 text-sm font-medium text-gray-400 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Navigation
            </motion.h2>
          )}
          
          <div className="space-y-1 mt-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.id}
                {...item}
                active={activeTab === item.id}
                collapsed={collapsed}
                onClick={() => onTabChange(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Platform Navigation */}
        <div className="px-2 mt-8">
          {!collapsed && (
            <motion.h2
              className="px-4 py-2 text-sm font-medium text-gray-400 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Platforms
            </motion.h2>
          )}
          
          <div className="space-y-1 mt-2">
            {platformItems.map((platform) => {
              const platformGames = getGamesByPlatform(platform.id);
              const isExpanded = expandedPlatforms.includes(platform.id);
              
              return (
                <div key={platform.id} className="gamer-platform-section">
                  <div
                    className="gamer-platform-header"
                    onClick={() => {
                      if (!collapsed) {
                        togglePlatform(platform.id);
                      } else {
                        onTabChange(platform.id);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <platform.icon 
                        size={16} 
                        className="mr-3 flex-shrink-0" 
                        style={{ color: platform.color }}
                      />
                      {!collapsed && (
                        <span className="font-medium truncate">{platform.label}</span>
                      )}
                    </div>
                    {!collapsed && platformGames.length > 0 && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={14} />
                      </motion.div>
                    )}
                  </div>
                  
                  {!collapsed && (
                    <AnimatePresence>
                      {isExpanded && platformGames.length > 0 && (
                        <motion.div
                          className="gamer-platform-games"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {platformGames.map((game) => (
                            <div
                              key={game.id}
                              className="gamer-platform-game"
                              onClick={() => handleGameClick(game.id)}
                            >
                              <div className="w-4 h-4 rounded bg-gray-600 mr-2 flex-shrink-0" />
                              <span className="truncate">{game.name}</span>
                            </div>
                          ))}
                          {platformGames.length === 8 && (
                            <div className="gamer-platform-game text-gray-500">
                              <span className="text-xs">+ more games...</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface NavigationItemProps {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  icon: Icon,
  active,
  collapsed,
  onClick
}) => {
  return (
    <motion.button
      className={`gamer-nav-item w-full ${active ? 'active' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={20} className={`${collapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
      {!collapsed && (
        <motion.span
          className="font-medium truncate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
        </motion.span>
      )}
    </motion.button>
  );
};