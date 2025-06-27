import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'fab';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  children,
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-medium motion-standard focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    filled: 'primary text-white shadow-md hover:shadow-lg active:shadow-sm',
    outlined: 'border-2 border-current text-primary bg-transparent hover:bg-primary/8 active:bg-primary/12',
    text: 'text-primary bg-transparent hover:bg-primary/8 active:bg-primary/12',
    fab: 'primary text-white shadow-lg hover:shadow-xl active:shadow-md rounded-full aspect-square'
  };

  const sizeClasses = {
    small: variant === 'fab' ? 'w-10 h-10' : 'px-4 py-2 text-sm',
    medium: variant === 'fab' ? 'w-14 h-14' : 'px-6 py-3 text-base',
    large: variant === 'fab' ? 'w-16 h-16' : 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};