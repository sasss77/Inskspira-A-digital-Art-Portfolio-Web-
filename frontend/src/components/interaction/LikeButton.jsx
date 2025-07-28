// src/components/interaction/LikeButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LikeButton = ({ artworkId, initialLiked = false, initialCount = 0, onLikeChange }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show message
      return;
    }

    setIsAnimating(true);
    
    try {
      // API call to toggle like
      // const response = await likeService.toggleLike(artworkId);
      
      // Simulate API call for now
      setTimeout(() => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
        
        if (onLikeChange) {
          onLikeChange(newLikedState, newLikedState ? likeCount + 1 : likeCount - 1);
        }
        
        setTimeout(() => setIsAnimating(false), 300);
      }, 200);
      
    } catch (error) {
      console.error('Error toggling like:', error);
      setIsAnimating(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={!user}
      className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        isLiked 
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-red-400'
      } ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
    >
      {/* Heart Icon */}
      <div className="relative">
        <svg
          className={`w-5 h-5 transition-all duration-300 ${
            isLiked ? 'fill-red-400 scale-110' : 'fill-none'
          } ${isAnimating ? 'animate-bounce' : ''}`}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        
        {/* Sparkle Animation */}
        {isAnimating && isLiked && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
        )}
      </div>

      {/* Like Count */}
      <span className={`font-medium transition-all duration-300 ${
        isAnimating ? 'scale-110' : ''
      }`}>
        {likeCount}
      </span>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-full bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <style jsx>{`
        .sparkle {
          @apply absolute w-1 h-1 bg-red-400 rounded-full;
          animation: sparkleAnimation 0.6s ease-out forwards;
        }
        
        .sparkle-1 {
          top: -4px;
          left: -4px;
        }
        
        .sparkle-2 {
          top: -4px;
          right: -4px;
          animation-delay: 0.1s;
        }
        
        .sparkle-3 {
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0.2s;
        }
        
        @keyframes sparkleAnimation {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </button>
  );
};

export default LikeButton;
