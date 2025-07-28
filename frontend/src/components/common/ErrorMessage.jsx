// src/components/common/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message, type = 'error', onClose }) => {
  const typeStyles = {
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    success: 'bg-green-500/10 border-green-500/20 text-green-400'
  };

  const iconMap = {
    error: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
    success: '✨'
  };

  return (
    <div className={`relative rounded-lg border backdrop-blur-sm p-4 mb-4 ${typeStyles[type]} animate-slideIn`}>
      <div className="flex items-start space-x-3">
        <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}>
          {iconMap[type]}
        </span>
        
        <div className="flex-1">
          <p className="font-medium leading-relaxed">
            {message}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-full hover:bg-gray-700/30 transition-colors duration-300 group"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg border border-purple-500/20 animate-pulse"></div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ErrorMessage;
