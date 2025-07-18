import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from './SafeIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-material-2 hover:shadow-material-3',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-material-2 hover:shadow-material-3',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost: 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900',
    danger: 'bg-error-500 hover:bg-error-600 text-white shadow-material-2 hover:shadow-material-3',
    success: 'bg-success-500 hover:bg-success-600 text-white shadow-material-2 hover:shadow-material-3',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center
        font-medium rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white opacity-30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <div className="mr-2">
          <div className="loading-spinner w-4 h-4 border-2"></div>
        </div>
      )}

      {/* Icon */}
      {icon && iconPosition === 'left' && !loading && (
        <SafeIcon icon={icon} className="mr-2" />
      )}

      {/* Content */}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>

      {/* Icon */}
      {icon && iconPosition === 'right' && !loading && (
        <SafeIcon icon={icon} className="ml-2" />
      )}
    </motion.button>
  );
};

export default Button;