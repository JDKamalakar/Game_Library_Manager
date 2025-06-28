import React from 'react';
import { motion } from 'framer-motion';
import { Home, Gamepad2, BarChart3, Settings, Monitor, Smartphone, HardDrive, Zap, Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface NavigationRailProps {
  collapsed: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'library', label: 'Game Library', icon: Gamepad2 },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const platformItems = [
  { id: 'steam', label: 'Steam', icon: Monitor },
  { id: 'epic', label: 'Epic Games', icon: Zap },
  { id: 'gog', label: 'GOG', icon: Smartphone },
  { id: 'origin', label: 'Origin', icon: HardDrive },
  { id: 'uplay', label: 'Ubisoft', icon: Gamepad2 }
];

export const NavigationRail: React.FC<NavigationRailProps> = ({
  collapsed,
  activeTab,
  onTabChange,
  onToggleCollapse
}) => {
  const { themeMode, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun size={16} />;
      case 'dark':
        return <Moon size={16} />;
      case 'system':
        return <Laptop size={16} />;
      default:
        return <Sun size={16} />;
    }
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Light';
    }
  };

  return (
    <motion.div
      className="gamer-nav-rail h-full flex flex-col gamer-blur-medium"
      animate={{ width: collapsed ? 80 : 280 }}
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
            {platformItems.map((item) => (
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
      </div>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center px-4 py-3 rounded-full transition-all duration-200 hover:bg-gray-700/50 text-gray-300 hover:text-white`}
        >
          <div className={`${collapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`}>
            {getThemeIcon()}
          </div>
          {!collapsed && (
            <motion.span
              className="font-medium truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {getThemeLabel()} Theme
            </motion.span>
          )}
        </button>
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