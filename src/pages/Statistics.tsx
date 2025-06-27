import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';

export const Statistics: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-on-surface mb-8">Statistics</h1>
        </motion.div>
        
        <Card>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-on-surface mb-2">Statistics Coming Soon</h2>
            <p className="text-on-surface-variant">
              Detailed analytics and insights about your gaming habits will be available here.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};