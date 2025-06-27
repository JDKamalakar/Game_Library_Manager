import { useState, useEffect } from 'react';
import { storageUtils } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => storageUtils.getTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storageUtils.storeTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};