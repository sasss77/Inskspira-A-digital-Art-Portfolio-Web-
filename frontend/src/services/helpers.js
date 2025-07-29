// src/utils/helpers.js

// Format time ago
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
};

// Format numbers (1000 -> 1K)
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Validate file type and size
export const validateImageFile = (file, maxSizeMB = 10) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
  }
  
  if (file.size > maxSize) {
    throw new Error(`File size must be less than ${maxSizeMB}MB`);
  }
  
  return true;
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate random color for avatars
export const getRandomColor = () => {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-red-500',
    'from-indigo-500 to-purple-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};
