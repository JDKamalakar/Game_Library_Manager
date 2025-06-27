import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 1 | 2 | 3 | 4 | 5;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevation = 1,
  interactive = false,
  onClick
}) => {
  const Component = interactive ? motion.div : 'div';
  
  return (
    <Component
      className={`surface-container rounded-xl p-4 elevation-${elevation} ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...(interactive && {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2, ease: "easeInOut" }
      })}
    >
      {children}
    </Component>
  );
};