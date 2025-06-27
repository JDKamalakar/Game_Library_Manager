import React from 'react';
import { motion } from 'framer-motion';
import { Home, Gamepad2, BarChart3, Settings, Stamp as Steam, Monitor, Smartphone } from 'lucide-react';

interface NavigationRailProps {
  collapsed: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'library', label: 'Library', icon: Gamepad2 },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const platformItems = [
  { id: 'steam', label: 'Steam', icon: Steam },
  { id: 'epic', label: 'Epic Games', icon: Monitor },
  { id: 'gog', label: 'GOG', icon: Smartphone }
];

export const NavigationRail: React.FC<NavigationRailProps> = ({
  collapsed,
  activeTab,
  onTabChange,
  onToggleCollapse
}) => {
  return (
    <motion.div
      className="surface-container-high h-full flex flex-col elevation-2"
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-outline-variant/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.h1
              className="text-xl font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              GameLib
            </motion.h1>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-full hover:bg-primary/8 transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <Gamepad2 size={20} className="text-primary" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4">
        <div className="px-2">
          {!collapsed && (
            <motion.h2
              className="px-4 py-2 text-sm font-medium text-on-surface-variant uppercase tracking-wider"
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
              className="px-4 py-2 text-sm font-medium text-on-surface-variant uppercase tracking-wider"
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
      className={`w-full flex items-center px-4 py-3 rounded-full transition-all duration-200 ${
        active
          ? 'primary-container text-on-primary-container'
          : 'hover:bg-primary/8 text-on-surface'
      }`}
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