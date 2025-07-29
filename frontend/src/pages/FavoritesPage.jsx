// src/pages/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ArtworkGrid from '../components/artwork/ArtworkGrid';
import Loading from '../components/common/Loading';

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // API call to fetch favorites
      setTimeout(() => {
        setFavorites([
          {
            id: 1,
            title: 'Saved Masterpiece',
            imageUrl: '/api/placeholder/300/400',
            artist: { id: 1, username: 'ArtisticSoul' },
            likeCount: 124,
            commentCount: 18,
            isLiked: true,
            isFavorited: true,
            createdAt: '2024-01-15T10:30:00Z',
            tags: ['digital-art', 'landscape', 'fantasy']
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="favorites-page">
        {/* Hero Header */}
        <section className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="favorites-shape favorites-shape-1"></div>
            <div className="favorites-shape favorites-shape-2"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-6">
              <div className="favorites-icon">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                Your Favorites
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your personal collection of inspiring artworks that caught your eye and captured your heart.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loading size="large" text="Loading your favorites..." />
              </div>
            ) : favorites.length > 0 ? (
              <ArtworkGrid artworks={favorites} />
            ) : (
              <div className="text-center py-20">
                <div className="favorites-empty-icon mb-8">
                  <svg className="w-24 h-24 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No favorites yet</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Start exploring and save artworks that inspire you. Your favorite pieces will appear here.
                </p>
                <Link to="/" className="inline-block">
                  <Button variant="primary" size="large">
                    Discover Art
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
