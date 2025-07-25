import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Shield, Database, Bell, Laptop } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';

export const Settings: React.FC = () => {
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
    <div className="h-full overflow-auto p-6 bg-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-8">Settings</h1>
        </motion.div>

        <div className="space-y-6">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Appearance</h2>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-primary">Theme</h3>
                    <p className="text-sm text-secondary">
                      Choose between light, dark, and system themes
                    </p>
                  </div>
                  
                  <Button
                    variant="outlined"
                    icon={getThemeIcon()}
                    onClick={toggleTheme}
                  >
                    {getThemeLabel()}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Shield size={20} className="mr-2 text-primary" />
                  Privacy & Security
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-primary">Encrypt Local Data</h3>
                      <p className="text-sm text-secondary">
                        Encrypt sensitive data stored locally
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-primary">Auto-lock Credentials</h3>
                      <p className="text-sm text-secondary">
                        Automatically secure platform credentials after inactivity
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-tertiary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Database size={20} className="mr-2 text-primary" />
                  Data Management
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-primary">Offline Mode</h3>
                      <p className="text-sm text-secondary">
                        Enable offline access to your game library
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-primary">Auto-sync</h3>
                      <p className="text-sm text-secondary">
                        Automatically sync library data across devices
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-color">
                    <Button variant="outlined" className="w-full">
                      Clear Cache
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Bell size={20} className="mr-2 text-primary" />
                  Notifications
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-primary">Game Updates</h3>
                      <p className="text-sm text-secondary">
                        Notify when games have updates available
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-primary">New Achievements</h3>
                      <p className="text-sm text-secondary">
                        Show notifications for unlocked achievements
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-tertiary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};