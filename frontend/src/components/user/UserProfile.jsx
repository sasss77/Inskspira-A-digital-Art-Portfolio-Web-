// src/components/user/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FollowButton from '../interaction/FollowButton';
import ArtworkGrid from '../artwork/ArtworkGrid';
import Loading from '../common/Loading';
import Button from '../common/Button';
import EditProfile from './EditProfile';

const UserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [userArtworks, setUserArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('artworks');
  const [stats, setStats] = useState({
    artworks: 0,
    followers: 0,
    following: 0,
    likes: 0
  });

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      // API calls to fetch user data
      // const userResponse = await userService.getUserById(userId);
      // const artworksResponse = await artworkService.getUserArtworks(userId);
      
      // Simulate API calls
      setTimeout(() => {
        setProfileUser({
          id: userId || currentUser?.id,
          username: 'ArtisticSoul',
          email: 'artist@example.com',
          role: 'artist',
          bio: 'Digital artist passionate about creating vibrant and emotional artworks. Inspired by nature, dreams, and the beauty of human expression. 🎨✨',
          profileImage: null,
          coverImage: null,
          location: 'San Francisco, CA',
          website: 'https://artisticsoul.portfolio.com',
          joinedAt: '2023-01-15T00:00:00Z',
          isFollowing: false
        });

        setUserArtworks([
          {
            id: 1,
            title: 'Mystic Forest',
            imageUrl: '/api/placeholder/300/400',
            likes: 124,
            comments: 18
          },
          {
            id: 2,
            title: 'Digital Dreams',
            imageUrl: '/api/placeholder/300/350',
            likes: 89,
            comments: 12
          }
        ]);

        setStats({
          artworks: 28,
          followers: 1247,
          following: 345,
          likes: 5621
        });

        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const handleFollowChange = (isFollowing) => {
    setStats(prev => ({
      ...prev,
      followers: prev.followers + (isFollowing ? 1 : -1)
    }));
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const isOwnProfile = currentUser?.id === profileUser?.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading size="large" text="Loading profile..." />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">User not found</h2>
          <p className="text-gray-400">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="cover-orb cover-orb-1"></div>
          <div className="cover-orb cover-orb-2"></div>
          <div className="cover-orb cover-orb-3"></div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto flex items-end space-x-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
                  {profileUser.username[0].toUpperCase()}
                </div>
              </div>
              
              {/* Online Status */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {profileUser.username}
              </h1>
              <p className="text-gray-300 text-lg capitalize mb-2">
                {profileUser.role} • Joined {formatJoinDate(profileUser.joinedAt)}
              </p>
              {profileUser.location && (
                <p className="text-gray-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profileUser.location}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pb-4">
              {isOwnProfile ? (
                <Button
                  onClick={() => setShowEditModal(true)}
                  variant="outline"
                  size="medium"
                  className="bg-gray-800/50 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </Button>
              ) : (
                <FollowButton
                  userId={profileUser.id}
                  username={profileUser.username}
                  initialFollowing={profileUser.isFollowing}
                  onFollowChange={handleFollowChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {stats.artworks}
                  </div>
                  <div className="text-gray-400 text-sm">Artworks</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {stats.followers}
                  </div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {stats.following}
                  </div>
                  <div className="text-gray-400 text-sm">Following</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {stats.likes}
                  </div>
                  <div className="text-gray-400 text-sm">Total Likes</div>
                </div>
              </div>
            </div>

            {/* Bio Card */}
            {profileUser.bio && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                <p className="text-gray-300 leading-relaxed">
                  {profileUser.bio}
                </p>
              </div>
            )}

            {/* Links Card */}
            {profileUser.website && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-3">Links</h3>
                <a
                  href={profileUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Portfolio Website
                </a>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-800/30 rounded-lg p-1">
              {[
                { id: 'artworks', label: 'Artworks', icon: '🎨' },
                { id: 'liked', label: 'Liked', icon: '❤️' },
             
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'artworks' && (
                <div>
                  {userArtworks.length > 0 ? (
                    <ArtworkGrid artworks={userArtworks} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🎨</div>
                      <h3 className="text-xl font-semibold text-white mb-2">No artworks yet</h3>
                      <p className="text-gray-400">
                        {isOwnProfile ? 'Start sharing your creative work!' : `${profileUser.username} hasn't shared any artworks yet.`}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'liked' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Liked Artworks</h3>
                  <p className="text-gray-400">Coming soon...</p>
                </div>
              )}

              {activeTab === 'collections' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📁</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Collections</h3>
                  <p className="text-gray-400">Coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile
          user={profileUser}
          onClose={() => setShowEditModal(false)}
          onUpdate={(updatedUser) => {
            setProfileUser(updatedUser);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserProfile;
