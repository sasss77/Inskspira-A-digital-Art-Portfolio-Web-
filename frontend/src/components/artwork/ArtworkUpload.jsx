// src/components/artwork/ArtworkUpload.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../services/api';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

const ArtworkUpload = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      isPublic: true
    }
  });

  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Check if user is authenticated and has artist role
  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'artist' && user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const tags = watch('tags');

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file selection
  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setServerError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setServerError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setServerError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      setServerError('Please select an image to upload');
      return;
    }

    setLoading(true);
    setServerError('');
    setUploadProgress(0);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', data.title);
      formData.append('description', data.description);
      
      // Process tags - convert comma-separated string to array
      if (data.tags) {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        tagsArray.forEach(tag => {
          formData.append('tags[]', tag);
        });
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // API call to upload artwork
      const response = await apiService.createArtwork(formData);
      
      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Navigate to profile or artwork detail page
      setTimeout(() => {
        if (response.data?.artwork?.id) {
          navigate(`/artwork/${response.data.artwork.id}`);
        } else {
          navigate('/profile');
        }
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      setServerError(error.response?.data?.message || 'Upload failed. Please try again.');
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const formatTags = (tagString) => {
    return tagString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .slice(0, 10); // Limit to 10 tags
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Share Your Art
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your masterpiece and inspire the community
          </p>
        </div>

        {serverError && (
          <div className="mb-8">
            <ErrorMessage message={serverError} onClose={() => setServerError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${dragActive
                ? 'border-purple-500 bg-purple-500/10'
                : selectedFile
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 rounded-2xl shadow-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="text-white">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drag & drop your artwork here
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or click to browse files
                  </p>
                  <Button type="button" variant="outline" size="medium">
                    Choose File
                  </Button>
                </div>
                <p className="text-gray-500 text-sm">
                  Supports: JPG, PNG, GIF • Max size: 10MB
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Upload Progress */}
          {loading && (
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Uploading...</span>
                <span className="text-purple-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title */}
              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-purple-300 tracking-wide">
                  Title <span className="font-normal text-gray-400 text-base">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  {...register('title', {
                    required: 'Title is required',
                    maxLength: { value: 60, message: 'Title must be under 60 chars' }
                  })}
                  className={`
      w-full px-5 py-3 rounded-xl border-2
      bg-black/60 text-white text-base md:text-lg placeholder-gray-400 font-semibold
      focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300/20
      hover:border-purple-400 
      transition-all duration-200 
      ${errors.title ? 'border-red-500' : 'border-gray-700'}
    `}
                  placeholder="Give your artwork a name…"
                />
                {errors.title && <p className="mt-1 text-red-400 text-sm">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-purple-300 tracking-wide">
                  Description <span className="font-normal text-gray-400 text-base">*</span>
                </label>
                <textarea
                  rows={4}
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: { value: 400, message: 'Keep it concise (max 400 chars)' }
                  })}
                  className={`
      w-full px-5 py-3 rounded-xl border-2 resize-none
      bg-black/60 text-white text-base md:text-lg placeholder-gray-400 font-medium
      focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300/20
      hover:border-purple-400
      transition-all duration-200
      ${errors.description ? 'border-red-500' : 'border-gray-700'}
    `}
                  placeholder="Describe your artwork, inspiration, or technique…"
                />
                {errors.description && <p className="mt-1 text-red-400 text-sm">{errors.description.message}</p>}
              </div>

                            {/* Tags */}
              <div>
                 <label className="block mb-2 text-lg font-bold text-purple-300 tracking-wide">
                  Tags <span className="font-normal text-gray-400 text-base">*</span>
                </label>
            <input
  {...register('tags')}
  className="
    w-full px-5 py-3 rounded-xl border-2 font-medium
    bg-gray-900/70 text-white placeholder-gray-400
    border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-600
    hover:border-purple-400
    transition-all duration-200
  "
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
            </div>

            {/* Right Column */}
            <div className="space-y-6">


              {/* Visibility */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Visibility</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      {...register('isPublic')}
                      value={true}
                      defaultChecked
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

              {/* Upload Guidelines */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-blue-400 font-semibold mb-3">Upload Guidelines</h3>
                <ul className="text-blue-300 text-sm space-y-2">
                  <li>• Only upload original artwork or work you have rights to</li>
                  <li>• Ensure your image is high quality (recommended: 1920px+)</li>
                  <li>• Keep titles and descriptions appropriate</li>
                  <li>• Use relevant tags to help others discover your work</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>

            <div className="flex space-x-3">
            
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!isValid || !selectedFile || loading}
                className="relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4" />
                  </svg>
                  <span>Publish Artwork</span>
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkUpload;
