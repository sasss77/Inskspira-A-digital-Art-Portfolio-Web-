// src/components/interaction/FavoriteButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../services/api';

const FavoriteButton = ({ artworkId, initialFavorited = false, onFavoriteChange }) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isAnimating, setIsAnimating] = useState(false);
  const { user } = useAuth();

  const handleFavorite = async () => {
    if (!user) {
      return;
    }

    setIsAnimating(true);
    
    try {
      const response = await apiService.toggleFavorite(artworkId);
      if (response.success) {
        const newFavoritedState = response.data.isFavorited;
        setIsFavorited(newFavoritedState);
        
        if (onFavoriteChange) {
          onFavoriteChange(newFavoritedState);
        }
      }
      
      setTimeout(() => setIsAnimating(false), 300);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsAnimating(false);
    }
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={!user}
      className={`group p-2 rounded-full transition-all duration-300 ${
        isFavorited 
          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-yellow-400'
      } ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          isFavorited ? 'fill-yellow-400 scale-110' : 'fill-none'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>

      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-full bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        isFavorited ? 'animate-pulse' : ''
      }`}></div>
    </button>
  );
};

export default FavoriteButton;
