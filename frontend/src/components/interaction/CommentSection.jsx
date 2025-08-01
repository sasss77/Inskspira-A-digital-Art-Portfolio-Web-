// src/components/interaction/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import CommentForm from './CommentForm';
import Loading from '../common/Loading';
import apiService from '../../services/api';

const CommentSection = ({ artworkId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [artworkId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await apiService.getComments(artworkId);
      if (response.success) {
        const commentsWithOwnership = response.data.comments.map(comment => ({
          ...comment,
          isOwn: comment.user.id === user?.id
        }));
        setComments(commentsWithOwnership);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    const commentWithOwnership = {
      ...newComment,
      isOwn: newComment.user.id === user?.id
    };
    setComments(prev => [commentWithOwnership, ...prev]);
    setShowCommentForm(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await apiService.deleteComment(commentId);
      if (response.success) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
        <Loading size="small" text="Loading comments..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comments ({comments.length})
        </h3>
        
        {user && (
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-full transition-all duration-300 hover:scale-105"
          >
            Add Comment
          </button>
        )}
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <div className="mb-6 animate-slideInDown">
          <CommentForm
            artworkId={artworkId}
            onCommentAdded={handleCommentAdded}
            onCancel={() => setShowCommentForm(false)}
          />
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 animate-fadeIn"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {comment.user.username[0].toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  {/* User Info */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">
                        {comment.user.username}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    
                    {comment.isOwn && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-gray-500 hover:text-red-400 p-1 rounded transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Comment Content */}
                  <p className="text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
