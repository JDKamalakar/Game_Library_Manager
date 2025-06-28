import { useState, useEffect } from 'react';
import { storageUtils } from '../utils/storage';

export type ThemeMode = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => storageUtils.getThemeMode());
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const updateActualTheme = (mode: ThemeMode) => {
    const theme = mode === 'system' ? getSystemTheme() : mode;
    setActualTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    }
  };

  useEffect(() => {
    updateActualTheme(themeMode);
    storageUtils.storeThemeMode(themeMode);

    // Listen for system theme changes when in system mode
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateActualTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    if (themeMode === 'light') {
      setTheme('dark');
    } else if (themeMode === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return { 
    themeMode, 
    actualTheme, 
    setTheme, 
    toggleTheme,
    isSystemTheme: themeMode === 'system'
  };
};