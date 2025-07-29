// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-full 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed 
    transform hover:scale-105 active:scale-95 relative overflow-hidden
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
      text-white shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500
      border-0
    `,
    secondary: `
      bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 
      hover:border-gray-500 shadow-lg hover:shadow-gray-500/25 focus:ring-gray-500
    `,
    outline: `
      bg-transparent border-2 border-purple-500 text-purple-400 
      hover:bg-purple-500 hover:text-white hover:border-purple-500
      focus:ring-purple-500 shadow-lg hover:shadow-purple-500/25
    `,
    ghost: `
      bg-transparent text-gray-300 hover:text-white hover:bg-gray-800/50
      border border-transparent hover:border-gray-700
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
      text-white shadow-lg hover:shadow-red-500/25 focus:ring-red-500
      border-0
    `,
    success: `
      bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
      text-white shadow-lg hover:shadow-green-500/25 focus:ring-green-500
      border-0
    `,
    warning: `
      bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 
      text-white shadow-lg hover:shadow-yellow-500/25 focus:ring-yellow-500
      border-0
    `,
    glass: `
      bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 text-white
      hover:bg-gray-700/40 hover:border-gray-600/50
      focus:ring-purple-500 shadow-lg
    `
  };

  const sizes = {
    small: 'px-4 py-2 text-sm min-h-[36px]',
    medium: 'px-6 py-3 text-base min-h-[44px]',
    large: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="button-spinner">
            <div className="button-spinner-inner"></div>
          </div>
          <span className="ml-2">Loading...</span>
        </>
      );
    }

    const iconElement = icon && (
      <span className={`${iconSizes[size]} ${iconPosition === 'right' ? 'order-2 ml-2' : 'mr-2'}`}>
        {icon}
      </span>
    );

    return (
      <>
        {iconPosition === 'left' && iconElement}
        <span className="relative z-10">{children}</span>
        {iconPosition === 'right' && iconElement}
      </>
    );
  };

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Animated Background for Primary Variant */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      )}

      {/* Animated Background for Danger Variant */}
      {variant === 'danger' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      )}

      {/* Animated Background for Success Variant */}
      {variant === 'success' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      )}

      {/* Shimmer Effect for Glass Variant */}
      {variant === 'glass' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
      )}

      {/* Glow Effect */}
      {(variant === 'primary' || variant === 'outline') && !disabled && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl -z-10"></div>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {renderContent()}
      </div>
    </button>
  );
};

export default Button;
