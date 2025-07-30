// src/components/artwork/ArtworkDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LikeButton from '../interaction/LikeButton';
import FavoriteButton from '../interaction/FavoriteButton';
import CommentSection from '../interaction/CommentSection';
import Loading from '../common/Loading';
import Button from '../common/Button';
import ReportDialog from '../common/ReportDialog'; // <-- Import ReportDialog

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [relatedArtworks, setRelatedArtworks] = useState([]);

  // State for Report Modal
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchArtworkDetail();
    // eslint-disable-next-line
  }, [artworkId]);

  const fetchArtworkDetail = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setArtwork({
          id: artworkId,
          title: 'Mystic Digital Landscape',
          description:
            'A breathtaking digital landscape that captures the essence of a mystical forest at twilight. This piece explores the intersection of nature and fantasy, using vibrant purples and ethereal lighting to create an otherworldly atmosphere.',
          imageUrl: `/api/placeholder/800/1000`,
          artist: {
            id: 1,
            username: 'DigitalDreamer',
            profileImage: null,
            followerCount: 1247,
          },
          createdAt: '2024-01-15T10:30:00Z',
          likeCount: 256,
          commentCount: 42,
          viewCount: 1847,
          isLiked: false,
          isFavorited: false,
          tags: ['digital-art', 'landscape', 'fantasy', 'mystical', 'purple'],
          dimensions: '3840x4800px',
          fileSize: '12.4 MB',
          software: 'Photoshop, Procreate',
          isOwn: user?.id === 1, // Simulate with current user
        });

        setRelatedArtworks([
          { id: 2, title: 'Forest Dreams', imageUrl: '/api/placeholder/300/380' },
          { id: 3, title: 'Digital Sunset', imageUrl: '/api/placeholder/300/360' },
          { id: 4, title: 'Purple Haze', imageUrl: '/api/placeholder/300/400' },
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching artwork:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        // await artworkService.deleteArtwork(artworkId);
        navigate('/profile');
      } catch (error) {
        console.error('Error deleting artwork:', error);
      }
    }
  };

  // Report handler (simulate submit)
  const handleReportSubmit = reportData => {
    console.log('REPORTED ARTWORK:', artwork?.id, reportData);
    // Integrate with real API later!
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading size="large" text="Loading artwork..." />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Artwork not found</h2>
          <p className="text-gray-400 mb-6">The artwork you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Artwork Image */}
            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-800 relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loading size="medium" />
                  </div>
                )}
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              {/* Title + Artist */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{artwork.title}</h1>
                <Link 
                  to={`/profile/${artwork.artist.id}`}
                  className="flex items-center space-x-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
                    {artwork.artist.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {artwork.artist.username}
                    </h3>
                    <p className="text-gray-400">
                      {artwork.artist.followerCount} followers
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <LikeButton artworkId={artwork.id} initialLiked={artwork.isLiked} initialCount={artwork.likeCount} />
                <FavoriteButton artworkId={artwork.id} initialFavorited={artwork.isFavorited} />
               
                {/* --- REPORT BUTTON (non-owners only) --- */}
                {!artwork.isOwn && (
                  <>
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() => setShowReport(true)}
                      className="text-pink-400"
                    >
                      <svg className="w-4 h-4 mr-2 text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-9.192 9.192m7.778-9.193a8 8 0 11-11.313 0 8 8 0 0111.313 0z" />
                      </svg>
                      Report Artwork
                    </Button>
                    <ReportDialog
                      isOpen={showReport}
                      onClose={() => setShowReport(false)}
                      onSubmit={handleReportSubmit}
                      targetName={artwork.title}
                      targetType="artwork"
                    />
                  </>
                )}
                {artwork.isOwn && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() => navigate(`/artwork/${artwork.id}/edit`)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                    <Button variant="danger" size="medium" onClick={handleDelete}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              {/* Description */}
              {artwork.description && (
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {artwork.description}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Views', value: artwork.viewCount },
                  { label: 'Likes', value: artwork.likeCount },
                  { label: 'Comments', value: artwork.commentCount },
                  { label: 'Created', value: formatDate(artwork.createdAt) }
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {artwork.tags && artwork.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/search?tag=${tag}`}
                        className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 text-sm rounded-full transition-colors duration-300"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="text-white ml-2">{artwork.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">File Size:</span>
                    <span className="text-white ml-2">{artwork.fileSize}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Software:</span>
                    <span className="text-white ml-2">{artwork.software}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CommentSection artworkId={artwork.id} />
      </div>

      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">More from {artwork.artist.username}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArtworks.map((relatedArtwork) => (
              <Link
                key={relatedArtwork.id}
                to={`/artwork/${relatedArtwork.id}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={relatedArtwork.imageUrl}
                  alt={relatedArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold">{relatedArtwork.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
