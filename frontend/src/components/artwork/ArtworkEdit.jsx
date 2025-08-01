// src/components/artwork/ArtworkEdit.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import Loading from '../common/Loading';
import apiService from '../../services/api';

const ArtworkEdit = () => {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm({
    mode: 'onChange'
  });

  const tags = watch('tags');

  useEffect(() => {
    fetchArtwork();
  }, [artworkId]);

  const fetchArtwork = async () => {
    try {
      setLoading(true);
      setServerError('');
      
      const response = await apiService.getArtworkById(artworkId);
      const artworkData = response.data.artwork;

      // Check if user owns this artwork
      if (artworkData.artist.id !== user?.id) {
        setServerError('You are not authorized to edit this artwork');
        setLoading(false);
        return;
      }

      setArtwork(artworkData);
      
      // Set form values
      setValue('title', artworkData.title);
      setValue('description', artworkData.description);
      setValue('tags', Array.isArray(artworkData.tags) ? artworkData.tags.join(', ') : '');
      setValue('isPublic', artworkData.isPublic || true);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching artwork:', error);
      setServerError(error.response?.data?.message || 'Failed to load artwork');
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    setServerError('');

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      
      // Process tags
      if (data.tags) {
        const tagsArray = data.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);
        tagsArray.forEach(tag => {
          formData.append('tags[]', tag);
        });
      }
      
      // Handle image upload if new image is selected
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await apiService.updateArtwork(artworkId, formData);
      
      if (response.success) {
        navigate(`/artwork/${artworkId}`);
      } else {
        setServerError(response.message || 'Failed to update artwork');
        setSaving(false);
      }
      
    } catch (error) {
      console.error('Error updating artwork:', error);
      setServerError(error.response?.data?.message || 'Failed to update artwork');
      setSaving(false);
    }
  };

  const formatTags = (tagString) => {
    return tagString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .slice(0, 10);
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
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Edit Artwork
          </h1>
          <p className="text-gray-400 text-lg">
            Update your masterpiece details
          </p>
        </div>

        {serverError && (
          <div className="mb-8">
            <ErrorMessage message={serverError} onClose={() => setServerError('')} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Preview */}
          <div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-800 relative group">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-gray-300">Current artwork image</p>
                <p className="text-xs text-gray-400 mt-1">
                  To change the image, please upload a new artwork instead
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
              <div>
                <label className="input-label">Title *</label>
                <input
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be at least 3 characters'
                    }
                  })}
                  className={`input-field ${errors.title && 'input-error'}`}
                  placeholder="Give your artwork a catchy title"
                />
                {errors.title && (
                  <p className="error-msg">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="input-label">Description</label>
                <textarea
                  {...register('description', {
                    maxLength: {
                      value: 1000,
                      message: 'Description cannot exceed 1000 characters'
                    }
                  })}
                  rows={6}
                  className={`input-field resize-none ${errors.description && 'input-error'}`}
                  placeholder="Describe your artwork, inspiration, or technique..."
                />
                {errors.description && (
                  <p className="error-msg">{errors.description.message}</p>
                )}
              </div>

              {/* Image Upload (Optional) */}
              <div>
                <label className="input-label">Update Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
                <p className="text-gray-500 text-sm mt-1">
                  Leave empty to keep current image. Supported formats: JPG, PNG, GIF (max 10MB)
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="input-label">Tags</label>
                <input
                  {...register('tags')}
                  className="input-field"
                  placeholder="digital-art, fantasy, portrait (comma separated)"
                />
                <p className="text-gray-500 text-sm mt-1">
                  Separate tags with commas (max 10 tags)
                </p>
                
                {/* Tag Preview */}
                {tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formatTags(tags).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Visibility */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Visibility</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      {...register('isPublic')}
                      value={true}
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600"
                    />
                    <div>
                      <div className="text-white font-medium">Public</div>
                      <div className="text-gray-400 text-sm">Everyone can see this artwork</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      {...register('isPublic')}
                      value={false}
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600"
                    />
                    <div>
                      <div className="text-white font-medium">Private</div>
                      <div className="text-gray-400 text-sm">Only you can see this artwork</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(`/artwork/${artworkId}`)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                
                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={saving}
                    disabled={!isValid || !isDirty || saving}
                    className="relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save Changes</span>
                    </span>
                  </Button>
                </div>
              </div>

              {/* Unsaved Changes Warning */}
              {isDirty && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 13.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-sm font-medium">You have unsaved changes</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkEdit;
