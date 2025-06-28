import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationRail } from './components/Navigation/NavigationRail';
import { Dashboard } from './pages/Dashboard';
import { GamerLibrary } from './pages/GamerLibrary';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';
import { PlatformView } from './pages/PlatformView';
import { useTheme } from './hooks/useTheme';
import { storageUtils } from './utils/storage';
import { mockGames, mockStats } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { themeMode, actualTheme } = useTheme();

  useEffect(() => {
    // Initialize app data
    const initializeApp = async () => {
      try {
        // Check if we have existing data
        const existingGames = storageUtils.getGames();
        const existingStats = storageUtils.getStats();

        // If no data exists, populate with mock data
        if (existingGames.length === 0) {
          storageUtils.storeGames(mockGames);
        }
        if (!existingStats) {
          storageUtils.storeStats(mockStats);
        }

        // Simulate loading time for smooth animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold gamer-text-gradient mb-2">GameLib Pro</h1>
          <p className="text-gray-400">Loading your ultimate gaming experience...</p>
        </motion.div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <GamerLibrary />;
      case 'stats':
        return <Statistics />;
      case 'settings':
        return <Settings theme={actualTheme} onToggleTheme={() => {}} />;
      case 'steam':
      case 'epic':
      case 'gog':
      case 'origin':
      case 'uplay':
        return <PlatformView platform={activeTab} />;
      default:
        return <GamerLibrary />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <NavigationRail
        collapsed={navCollapsed}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleCollapse={() => setNavCollapsed(!navCollapsed)}
      />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;