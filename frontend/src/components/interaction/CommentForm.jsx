// src/components/interaction/CommentForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import apiService from '../../services/api';

const CommentForm = ({ artworkId, onCommentAdded, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      content: ''
    }
  });

  const contentValue = watch('content');
  const contentLength = contentValue?.length || 0;

  const onSubmit = async (data) => {
    if (!data.content.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await apiService.createComment(artworkId, data.content.trim());
      
      if (response.success) {
        onCommentAdded(response.data.comment);
        reset();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error adding comment:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset(); // Clear form when canceling
    onCancel();
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-start space-x-3">
          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-lg">
            {user?.username?.[0]?.toUpperCase()}
          </div>

          {/* Comment Input */}
          <div className="flex-1">
            <div className="relative">
              <textarea
                {...register('content', {
                  required: 'Comment cannot be empty',
                  minLength: {
                    value: 2,
                    message: 'Comment must be at least 2 characters long'
                  },
                  maxLength: {
                    value: 500,
                    message: 'Comment cannot exceed 500 characters'
                  },
                  validate: {
                    notOnlySpaces: value => 
                      value.trim().length > 0 || 'Comment cannot be only spaces'
                  }
                })}
                placeholder="Share your thoughts about this artwork..."
                rows={3}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                  errors.content 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-gray-600 focus:ring-purple-500'
                }`}
                disabled={loading}
              />
              
              {/* Focus Ring Effect */}
              <div className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 opacity-0 focus-within:opacity-100">
                <div className="absolute inset-0 rounded-lg border-2 border-purple-500/20 animate-pulse"></div>
              </div>
            </div>
            
            {/* Error Message */}
            {errors.content && (
              <div className="mt-2 animate-slideIn">
                <ErrorMessage 
                  message={errors.content.message} 
                  type="error"
                />
              </div>
            )}
            
            {/* Character Count & Info */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-4">
                <span className={`text-sm transition-colors duration-300 ${
                  contentLength > 450 
                    ? 'text-red-400' 
                    : contentLength > 350 
                      ? 'text-yellow-400' 
                      : 'text-gray-500'
                }`}>
                  {contentLength}/500
                </span>
                
                {/* Progress Bar */}
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      contentLength > 450 
                        ? 'bg-red-400' 
                        : contentLength > 350 
                          ? 'bg-yellow-400' 
                          : 'bg-purple-400'
                    }`}
                    style={{ width: `${Math.min((contentLength / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Validation Status */}
              {contentLength > 0 && (
                <div className="flex items-center space-x-1">
                  {isValid ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="small"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            size="small"
            loading={loading}
            disabled={!isValid || loading || !contentValue?.trim()}
            className="relative overflow-hidden"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Post Comment</span>
            </div>
            
            {/* Button Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Button>
        </div>

        {/* Form Guidelines */}
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-700/50">
          <div className="flex items-center space-x-4">
            <span>💡 Be respectful and constructive</span>
            <span>🎨 Share your artistic perspective</span>
            <span>✨ Inspire and encourage</span>
          </div>
        </div>
      </form>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CommentForm;
