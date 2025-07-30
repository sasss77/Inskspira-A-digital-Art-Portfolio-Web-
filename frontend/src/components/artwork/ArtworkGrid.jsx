// src/components/artwork/ArtworkGrid.jsx
import React, { useState, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import Loading from '../common/Loading';

const ArtworkGrid = ({ 
  artworks = [], 
  loading = false, 
  onLoadMore,
  hasMore = false,
  columns = 'auto'
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  // Handle infinite scroll
  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 1000 && !loadingMore) {
        setLoadingMore(true);
        onLoadMore().finally(() => setLoadingMore(false));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore, hasMore, loadingMore]);

  const getGridClasses = () => {
    if (columns === 'auto') {
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6';
    }
    return `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`;
  };

  if (loading && artworks.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading size="large" text="Loading artworks..." />
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🎨</div>
        <h3 className="text-2xl font-bold text-white mb-4">No artworks found</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We couldn't find any artworks matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className={getGridClasses()}>
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${(index % 20) * 0.05}s` }}
          >
            <ArtworkCard artwork={artwork} />
          </div>
        ))}
        </div>
        
      

      {/* Load More */}
      {(loadingMore || hasMore) && (
        <div className="flex justify-center py-8">
          {loadingMore ? (
            <Loading size="medium" text="Loading more..." />
          ) : hasMore ? (
            <button
              onClick={() => {
                setLoadingMore(true);
                onLoadMore().finally(() => setLoadingMore(false));
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              Load More Artworks
            </button>
          ) : null}
        </div>
      )}

      {/* Grid Stats */}
      <div className="text-center py-4 border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          Showing {artworks.length} artwork{artworks.length !== 1 ? 's' : ''}
          {hasMore && ' • Scroll for more'}
        </p>
      </div>
    </div>
  );
};

export default ArtworkGrid;
    