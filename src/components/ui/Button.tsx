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
  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'btn btn-primary';
      case 'outlined':
        return 'btn btn-ghost';
      case 'text':
        return 'btn btn-ghost';
      case 'fab':
        return 'btn btn-primary rounded-full aspect-square';
      default:
        return 'btn btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return variant === 'fab' ? 'w-10 h-10' : 'px-4 py-2 text-sm';
      case 'medium':
        return variant === 'fab' ? 'w-14 h-14' : 'px-6 py-3 text-base';
      case 'large':
        return variant === 'fab' ? 'w-16 h-16' : 'px-8 py-4 text-lg';
      default:
        return variant === 'fab' ? 'w-14 h-14' : 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.button
      className={`${getVariantClass()} ${getSizeClass()} ${className} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <div className="spinner" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};