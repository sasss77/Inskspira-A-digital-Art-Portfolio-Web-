// src/components/interaction/FollowButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import apiService from '../../services/api';

const FollowButton = ({ userId, username, initialFollowing = false, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Don't show follow button for own profile
  if (user?.id === userId) {
    return null;
  }

  const handleFollow = async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await apiService.toggleFollow(userId);
      if (response.success) {
        const newFollowingState = response.data.isFollowing;
        setIsFollowing(newFollowingState);
        
        if (onFollowChange) {
          onFollowChange(newFollowingState);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error toggling follow:', error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFollow}
      variant={isFollowing ? 'outline' : 'primary'}
      size="medium"
      loading={loading}
      disabled={!user}
      className={`transition-all duration-300 ${
        isFollowing 
          ? 'hover:bg-red-500/20 hover:border-red-500 hover:text-red-400' 
          : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        {isFollowing ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden sm:inline">Following</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">Follow</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default FollowButton;
