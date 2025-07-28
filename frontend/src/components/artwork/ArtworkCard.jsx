// src/components/artwork/ArtworkCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LikeButton from '../interaction/LikeButton';
import FavoriteButton from '../interaction/FavoriteButton';

const ArtworkCard = ({ artwork, onLikeChange, onFavoriteChange }) => {
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / (24 * 7))}w ago`;
  };

  return (
    <div className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-800">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm">Failed to load</p>
            </div>
          </div>
        ) : (
          <Link to={`/artwork/${artwork.id}`}>
            <img
              src={artwork.imageUrl || `/api/placeholder/${300 + artwork.id * 10}/${400 + artwork.id * 15}`}
              alt={artwork.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </Link>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          {user && (
            <>
              <FavoriteButton
                artworkId={artwork.id}
                initialFavorited={artwork.isFavorited}
                onFavoriteChange={onFavoriteChange}
              />
              <button className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* View Count Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {artwork.viewCount || Math.floor(Math.random() * 1000 + 100)} views
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Artist */}
        <div className="mb-3">
          <Link 
            to={`/artwork/${artwork.id}`}
            className="block text-lg font-semibold text-white hover:text-purple-400 transition-colors duration-300 line-clamp-2 mb-1"
          >
            {artwork.title}
          </Link>
          
          <Link 
            to={`/profile/${artwork.artist?.id}`}
            className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 group/artist"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
              {artwork.artist?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <span className="text-sm group-hover/artist:underline">
              {artwork.artist?.username || 'Unknown Artist'}
            </span>
          </Link>
        </div>

        {/* Description */}
        {artwork.description && (
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {artwork.description}
          </p>
        )}

        {/* Tags */}
        {artwork.tags && artwork.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {artwork.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {artwork.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                +{artwork.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LikeButton
              artworkId={artwork.id}
              initialLiked={artwork.isLiked}
              initialCount={artwork.likeCount || 0}
              onLikeChange={onLikeChange}
            />
            
            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium">
                {artwork.commentCount || 0}
              </span>
            </button>
          </div>

          <span className="text-gray-500 text-xs">
            {formatTimeAgo(artwork.createdAt)}
          </span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ArtworkCard;
