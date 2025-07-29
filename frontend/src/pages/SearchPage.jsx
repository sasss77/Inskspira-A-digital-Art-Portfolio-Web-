// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ArtworkGrid from '../components/artwork/ArtworkGrid';
import UserCard from '../components/user/UserCard';
import Loading from '../components/common/Loading';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('artworks');
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'recent',
    dateRange: 'all'
  });

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, filters, activeTab]);

  const performSearch = async () => {
    setLoading(true);
    try {
      // API call for search
      setTimeout(() => {
        if (activeTab === 'artworks') {
          setResults([
            {
              id: 1,
              title: `Search Result: ${query}`,
              imageUrl: '/api/placeholder/300/400',
              artist: { id: 1, username: 'SearchArtist' },
              likeCount: 67,
              commentCount: 8,
              isLiked: false,
              isFavorited: false,
              createdAt: '2024-01-15T10:30:00Z',
              tags: [query.toLowerCase(), 'digital-art']
            }
          ]);
        } else {
          setUsers([
            {
              id: 1,
              username: `${query}Artist`,
              role: 'artist',
              bio: `Artist specializing in ${query} artwork`,
              artworkCount: 23,
              followerCount: 456,
              totalLikes: 1200,
              isFollowing: false
            }
          ]);
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Search error:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      performSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="search-page">
        {/* Search Header */}
        <section className="py-16 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 relative">
          <div className="absolute inset-0">
            <div className="search-pattern"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="search-icon mb-6">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Discover Art
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8">
                Find the perfect artwork or artist that matches your creative vision
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <svg className="search-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for artworks, artists, or tags..."
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Popular Tags */}
            <div className="popular-tags">
              <span className="popular-tags-label">Popular:</span>
              {['digital-art', 'portrait', 'landscape', 'fantasy', 'abstract'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setQuery(tag);
                    setSearchParams({ q: tag });
                  }}
                  className="popular-tag"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        {query && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Header */}
              <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Results for "{query}"
                  </h2>
                  <p className="text-gray-400">
                    {loading ? 'Searching...' : `Found ${activeTab === 'artworks' ? results.length : users.length} ${activeTab}`}
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="search-tabs mt-6 lg:mt-0">
                  <button
                    onClick={() => setActiveTab('artworks')}
                    className={`search-tab ${activeTab === 'artworks' ? 'search-tab-active' : ''}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Artworks</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('artists')}
                    className={`search-tab ${activeTab === 'artists' ? 'search-tab-active' : ''}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Artists</span>
                  </button>
                </div>
              </div>

              {/* Results Content */}
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loading size="large" text="Searching..." />
                </div>
              ) : activeTab === 'artworks' ? (
                results.length > 0 ? (
                  <ArtworkGrid artworks={results} />
                ) : (
                  <div className="search-no-results">
                    <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">No artworks found</h3>
                    <p className="text-gray-400">Try adjusting your search terms or browse popular tags.</p>
                  </div>
                )
              ) : (
                users.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {users.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="search-no-results">
                    <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">No artists found</h3>
                    <p className="text-gray-400">Try different search terms to find artists.</p>
                  </div>
                )
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
