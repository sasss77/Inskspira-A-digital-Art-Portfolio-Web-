// src/pages/FollowingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ArtworkGrid from '../components/artwork/ArtworkGrid';
import UserCard from '../components/user/UserCard';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';

const FollowingPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed'); // feed, artists

  useEffect(() => {
    fetchFollowingFeed();
    fetchSuggestedUsers();
  }, []);

  const fetchFollowingFeed = async () => {
    try {
      setTimeout(() => {
        setArtworks([
          {
            id: 1,
            title: 'Latest from Following',
            imageUrl: '/api/placeholder/300/400',
            artist: { id: 1, username: 'FollowedArtist' },
            likeCount: 89,
            commentCount: 12,
            isLiked: false,
            isFavorited: false,
            createdAt: '2024-01-15T10:30:00Z',
            tags: ['digital-art', 'portrait']
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching following feed:', error);
      setLoading(false);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      setTimeout(() => {
        setSuggestedUsers([
          {
            id: 1,
            username: 'TalentedArtist',
            role: 'artist',
            bio: 'Digital artist specializing in fantasy illustrations',
            artworkCount: 45,
            followerCount: 1200,
            totalLikes: 5600,
            isFollowing: false
          }
        ]);
      }, 1200);
    } catch (error) {
      console.error('Error fetching suggested users:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="following-page">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative">
          <div className="absolute inset-0">
            <div className="following-pattern"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="following-icon mb-6">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Following
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Stay updated with the latest creations from artists you follow and discover new talent.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mt-12">
              <div className="following-tabs">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`following-tab ${activeTab === 'feed' ? 'following-tab-active' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Art Feed</span>
                </button>
                <button
                  onClick={() => setActiveTab('artists')}
                  className={`following-tab ${activeTab === 'artists' ? 'following-tab-active' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>Artists</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'feed' ? (
              loading ? (
                <div className="flex justify-center py-20">
                  <Loading size="large" text="Loading your feed..." />
                </div>
              ) : artworks.length > 0 ? (
                <ArtworkGrid artworks={artworks} />
              ) : (
                <div className="text-center py-20">
                  <div className="following-empty-icon mb-8">
                    <svg className="w-24 h-24 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your feed is empty</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Follow some artists to see their latest creations in your personalized feed.
                  </p>
                  <Button onClick={() => setActiveTab('artists')} variant="primary" size="large">
                    Discover Artists
                  </Button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {suggestedUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FollowingPage;
