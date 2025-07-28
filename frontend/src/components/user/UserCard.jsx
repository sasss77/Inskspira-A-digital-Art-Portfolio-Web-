// src/components/user/UserCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FollowButton from '../interaction/FollowButton';

const UserCard = ({ user, showFollowButton = true }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group">
      {/* User Avatar & Info */}
      <div className="flex items-center space-x-4 mb-4">
        <Link to={`/profile/${user.id}`} className="relative group">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
            <div className="w-full h-full rounded-xl bg-gray-800 flex items-center justify-center text-xl font-bold text-white">
              {user.username[0].toUpperCase()}
            </div>
          </div>
          
          {/* Online Status */}
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
          )}
        </Link>

        <div className="flex-1 min-w-0">
          <Link 
            to={`/profile/${user.id}`}
            className="block text-lg font-semibold text-white hover:text-purple-400 transition-colors duration-300 truncate"
          >
            {user.username}
          </Link>
          <p className="text-gray-400 text-sm capitalize">{user.role}</p>
          {user.location && (
            <p className="text-gray-500 text-xs flex items-center mt-1">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {user.location}
            </p>
          )}
        </div>

        {showFollowButton && (
          <FollowButton
            userId={user.id}
            username={user.username}
            initialFollowing={user.isFollowing}
          />
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {user.bio}
        </p>
      )}

      {/* Stats */}
      <div className="flex justify-between text-center">
        <div className="group cursor-pointer">
          <div className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
            {user.artworkCount || 0}
          </div>
          <div className="text-gray-400 text-xs">Artworks</div>
        </div>
        <div className="group cursor-pointer">
          <div className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
            {user.followerCount || 0}
          </div>
          <div className="text-gray-400 text-xs">Followers</div>
        </div>
        <div className="group cursor-pointer">
          <div className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
            {user.totalLikes || 0}
          </div>
          <div className="text-gray-400 text-xs">Likes</div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default UserCard;
