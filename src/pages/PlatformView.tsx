import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';

interface PlatformViewProps {
  platform: string;
}

export const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-on-surface mb-8">{platformName} Games</h1>
        </motion.div>
        
        <Card>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-on-surface mb-2">
              {platformName} Integration Coming Soon
            </h2>
            <p className="text-on-surface-variant">
              Connect your {platformName} account to view and manage your games from this platform.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};