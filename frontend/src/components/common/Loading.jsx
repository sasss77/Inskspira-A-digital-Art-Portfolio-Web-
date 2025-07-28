// src/components/common/Loading.jsx
import React from 'react';

const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Loader */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
          
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
          
          {/* Inner Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-500 border-l-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse blur-sm`}></div>
      </div>

      {/* Loading Text */}
      {text && (
        <p className="text-gray-400 text-sm animate-pulse font-medium tracking-wider">
          {text}
        </p>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="loading-particle loading-particle-1"></div>
        <div className="loading-particle loading-particle-2"></div>
        <div className="loading-particle loading-particle-3"></div>
      </div>

      <style jsx>{`
        .loading-particle {
          @apply absolute w-1 h-1 bg-purple-400 rounded-full opacity-60;
          animation: particleFloat 3s ease-in-out infinite;
        }
        
        .loading-particle-1 {
          top: 20%;
          left: 30%;
          animation-delay: 0s;
        }
        
        .loading-particle-2 {
          top: 60%;
          right: 30%;
          animation-delay: 1s;
        }
        
        .loading-particle-3 {
          bottom: 20%;
          left: 60%;
          animation-delay: 2s;
        }
        
        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
