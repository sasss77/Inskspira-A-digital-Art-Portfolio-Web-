// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ArtworkGrid from '../components/artwork/ArtworkGrid';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';

const HomePage = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('recent');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    fetchArtworks();
    fetchFeaturedArtworks();
  }, [filter]);

  const fetchArtworks = async () => {
    try {
      setTimeout(() => {
        const mockArtworks = [
          {
            id: 1,
            title: 'Mystic Forest Dreams',
            imageUrl: '/api/placeholder/300/400',
            artist: { id: 1, username: 'ArtisticSoul' },
            likeCount: 124,
            commentCount: 18,
            isLiked: false,
            isFavorited: false,
            createdAt: '2024-01-15T10:30:00Z',
            tags: ['digital-art', 'landscape', 'fantasy'],
            description: 'A breathtaking journey through mystical realms'
          },
          {
            id: 2,
            title: 'Neon Cyberpunk Portrait',
            imageUrl: '/api/placeholder/300/380',
            artist: { id: 2, username: 'CyberArtist' },
            likeCount: 89,
            commentCount: 12,
            isLiked: true,
            isFavorited: false,
            createdAt: '2024-01-14T15:45:00Z',
            tags: ['portrait', 'cyberpunk', 'neon'],
            description: 'Future meets present in this stunning portrait'
          },
          {
            id: 3,
            title: 'Abstract Color Symphony',
            imageUrl: '/api/placeholder/300/420',
            artist: { id: 3, username: 'ColorMaster' },
            likeCount: 203,
            commentCount: 31,
            isLiked: false,
            isFavorited: true,
            createdAt: '2024-01-13T09:20:00Z',
            tags: ['abstract', 'colorful', 'digital'],
            description: 'Colors dancing in perfect harmony'
          },
          {
            id: 4,
            title: 'Dragon Warrior',
            imageUrl: '/api/placeholder/300/450',
            artist: { id: 4, username: 'FantasyMaker' },
            likeCount: 156,
            commentCount: 24,
            isLiked: false,
            isFavorited: false,
            createdAt: '2024-01-12T18:10:00Z',
            tags: ['fantasy', 'character', 'dragon'],
            description: 'Epic tale of courage and magic'
          }
        ];

        setArtworks(mockArtworks);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setLoading(false);
    }
  };

  const fetchFeaturedArtworks = async () => {
    try {
      setTimeout(() => {
        setFeaturedArtworks([
          {
            id: 10,
            title: 'Digital Renaissance',
            imageUrl: '/api/placeholder/800/500',
            artist: { id: 5, username: 'MasterArtist' },
            likeCount: 512,
            description: 'A stunning blend of classical art with modern digital techniques, exploring the boundaries between tradition and innovation.'
          },
          {
            id: 11,
            title: 'Ocean Dreams',
            imageUrl: '/api/placeholder/800/500',
            artist: { id: 6, username: 'AquaDesigner' },
            likeCount: 387,
            description: 'Ethereal underwater scene with bioluminescent creatures dancing in the depths of imagination.'
          },
          {
            id: 12,
            title: 'Cosmic Wanderer',
            imageUrl: '/api/placeholder/800/500',
            artist: { id: 7, username: 'SpaceExplorer' },
            likeCount: 445,
            description: 'Journey through the cosmos with this mesmerizing space exploration artwork.'
          }
        ]);
      }, 800);
    } catch (error) {
      console.error('Error fetching featured artworks:', error);
    }
  };

  const loadMoreArtworks = async () => {
    // Implementation for loading more artworks
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Header />
      
      {/* Interactive Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
        
        {/* Floating Particles */}
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Dynamic Gradient Following Mouse */}
        <div
          className="mouse-gradient"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
          }}
        />
      </div>

      {/* Hero Section - Ultra Creative */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
          <div className="hero-shape hero-shape-4"></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="hero-logo-outer">
                <div className="hero-logo-inner">
                  <svg className="w-16 h-16 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="orbit-ring orbit-ring-1">
                <div className="orbit-dot orbit-dot-1"></div>
              </div>
              <div className="orbit-ring orbit-ring-2">
                <div className="orbit-dot orbit-dot-2"></div>
                <div className="orbit-dot orbit-dot-3"></div>
              </div>
            </div>
          </div>

          {/* Main Title with Advanced Typography */}
          <h1 className="hero-title mb-8">
            <span className="hero-title-line">
              <span className="hero-title-word hero-title-word-1">Where</span>
              <span className="hero-title-word hero-title-word-2">Art</span>
            </span>
            <span className="hero-title-line">
              <span className="hero-title-word hero-title-word-3">Meets</span>
              <span className="hero-title-word hero-title-word-4">Inspiration</span>
            </span>
          </h1>

          {/* Subtitle with Typewriter Effect */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed typewriter-text">
              Discover extraordinary digital artworks from visionary artists worldwide. 
              <br className="hidden md:block" />
              Join our creative universe and let your imagination soar.
            </p>
          </div>

          {/* CTA Buttons with Advanced Styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {user ? (
              user.role === 'artist' ? (
                <Link to="/upload" className="group">
                  <div className="cta-button cta-button-primary">
                    <div className="cta-button-bg"></div>
                    <div className="cta-button-content">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Share Your Masterpiece</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to="/search" className="group">
                  <div className="cta-button cta-button-primary">
                    <div className="cta-button-bg"></div>
                    <div className="cta-button-content">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Explore Gallery</span>
                    </div>
                  </div>
                </Link>
              )
            ) : (
              <>
                <Link to="/signup" className="group">
                  <div className="cta-button cta-button-primary">
                    <div className="cta-button-bg"></div>
                    <div className="cta-button-content">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Join the Universe</span>
                    </div>
                  </div>
                </Link>
                <Link to="/search" className="group">
                  <div className="cta-button cta-button-secondary">
                    <div className="cta-button-content">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Explore Magic</span>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="scroll-indicator">
              <div className="scroll-dot"></div>
            </div>
          </div>
        </div>

        {/* Hero Side Decorations */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="side-decoration side-decoration-left"></div>
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <div className="side-decoration side-decoration-right"></div>
        </div>
      </section>

      {/* Featured Artworks - Showcase Style */}
      {featuredArtworks.length > 0 && (
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <span className="section-badge">✨ Featured</span>
              </div>
              <h2 className="section-title">
                <span className="section-title-gradient">Masterpieces</span>
                <br />
                <span className="text-white">of the Week</span>
              </h2>
              <p className="section-subtitle">
                Handpicked extraordinary creations that push the boundaries of digital art
              </p>
            </div>

            {/* Featured Grid */}
            <div className="featured-grid">
              {featuredArtworks.map((artwork, index) => (
                <Link
                  key={artwork.id}
                  to={`/artwork/${artwork.id}`}
                  className="featured-card group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="featured-card-inner">
                    <div className="featured-image-container">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="featured-image"
                      />
                      <div className="featured-overlay"></div>
                    </div>
                    
                    <div className="featured-content">
                      <div className="featured-artist">
                        <div className="featured-artist-avatar">
                          {artwork.artist.username[0].toUpperCase()}
                        </div>
                        <span>by {artwork.artist.username}</span>
                      </div>
                      
                      <h3 className="featured-title">{artwork.title}</h3>
                      <p className="featured-description">{artwork.description}</p>
                      
                      <div className="featured-stats">
                        <div className="featured-likes">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span>{artwork.likeCount}</span>
                        </div>
                        
                        <div className="featured-view-btn">
                          <span>View Art</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Artworks', icon: '🎨' },
              { number: '15K+', label: 'Artists', icon: '👨‍🎨' },
              { number: '100K+', label: 'Likes', icon: '❤️' },
              { number: '25K+', label: 'Community', icon: '🌟' }
            ].map((stat, index) => (
              <div key={index} className="stats-card group">
                <div className="stats-icon">{stat.icon}</div>
                <div className="stats-number">{stat.number}</div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Gallery Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Header */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            <div>
              <h2 className="section-title mb-4">
                <span className="section-title-gradient">Latest</span>
                <span className="text-white"> Creations</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Fresh inspiration from our creative community
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="filter-tabs mt-8 lg:mt-0">
              {[
                { id: 'recent', label: 'Recent', icon: '🕒' },
                
                ...(user ? [{ id: 'following', label: 'Following', icon: '👥' }] : [])
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`filter-tab ${filter === tab.id ? 'filter-tab-active' : ''}`}
                >
                  <span className="filter-tab-icon">{tab.icon}</span>
                  <span className="filter-tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Artwork Grid */}
          <div className="artwork-showcase">
            <ArtworkGrid
              artworks={artworks}
              loading={loading}
              onLoadMore={loadMoreArtworks}
              hasMore={hasMore}
            />
          </div>
        </div>
      </section>

      {/* Call to Action - Only for non-users */}
      {!user && (
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
          <div className="absolute inset-0">
            <div className="cta-shape cta-shape-1"></div>
            <div className="cta-shape cta-shape-2"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="cta-container">
              <div className="cta-icon">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <h2 className="cta-title">
                Your Creative Journey 
                <span className="cta-title-highlight"> Begins Here</span>
              </h2>
              
              <p className="cta-description">
                Join thousands of artists who've found their creative home at InkSpira. 
                Share your vision, connect with fellow artists, and be part of something extraordinary.
              </p>
              
              <Link to="/signup" className="cta-main-button group">
                <div className="cta-main-button-bg"></div>
                <div className="cta-main-button-content">
                  <span>Start Your Journey</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
