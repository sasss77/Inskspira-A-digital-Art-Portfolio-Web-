const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';

class ApiService {
  // Helper method to construct full image URLs
  getFullImageUrl(imageUrl) {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BASE_URL}${imageUrl}`;
  }
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('inkspira_token');
    
    console.log('🔗 HTTP Request:');
    console.log('- Full URL:', url);
    console.log('- API_BASE_URL:', API_BASE_URL);
    console.log('- Endpoint:', endpoint);
    console.log('- Token exists:', !!token);
    console.log('- Options:', options);
    
    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    
    const config = {
      ...options,
      headers,
    };
    
    console.log('- Final config:', config);

    try {
      console.log('🚀 Making fetch request...');
      const response = await fetch(url, config);
      
      console.log('📡 Response received:');
      console.log('- Status:', response.status);
      console.log('- Status text:', response.statusText);
      console.log('- OK:', response.ok);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ HTTP Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      console.log('✅ JSON Response:', jsonData);
      return jsonData;
    } catch (error) {
      console.error('❌ API request failed:', error);
      console.error('- Error type:', error.constructor.name);
      console.error('- Error message:', error.message);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // Artwork endpoints
  async getArtworks(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `/artworks${query ? `?${query}` : ''}`;
    console.log('🌐 API Call - getArtworks:');
    console.log('- URL:', url);
    console.log('- Params:', params);
    console.log('- Query string:', query);
    
    const response = await this.request(url);
    
    console.log('🌐 API Response - getArtworks:');
    console.log('- Full response:', response);
    console.log('- Success:', response?.success);
    console.log('- Data:', response?.data);
    console.log('- Artworks array:', response?.data?.artworks);
    console.log('- Artworks count:', response?.data?.artworks?.length);
    
    if (response.success && response.data && response.data.artworks && Array.isArray(response.data.artworks)) {
      // Process image URLs for all artworks
      response.data.artworks = response.data.artworks.map(artwork => ({
        ...artwork,
        imageUrl: this.getFullImageUrl(artwork.imageUrl),
        artist: artwork.artist ? {
          ...artwork.artist,
          profileImage: this.getFullImageUrl(artwork.artist.profileImage)
        } : artwork.artist
      }));
      console.log('🌐 Processed artworks with full URLs:', response.data.artworks.length);
    }
    return response;
  }

  async getArtworkById(id) {
    const response = await this.request(`/artworks/${id}`);
    if (response.success && response.data && response.data.artwork) {
      // Process main artwork image URL
      if (response.data.artwork.imageUrl) {
        response.data.artwork.imageUrl = this.getFullImageUrl(response.data.artwork.imageUrl);
      }
      // Process artist profile image if exists
      if (response.data.artwork.artist && response.data.artwork.artist.profileImage) {
        response.data.artwork.artist.profileImage = this.getFullImageUrl(response.data.artwork.artist.profileImage);
      }
    }
    return response;
  }

  async createArtwork(formData) {
    const response = await this.request('/artworks', {
      method: 'POST',
      body: formData,
    });
    if (response.success && response.data && response.data.artwork && response.data.artwork.imageUrl) {
      // Process the returned artwork's image URL
      response.data.artwork.imageUrl = this.getFullImageUrl(response.data.artwork.imageUrl);
      if (response.data.artwork.artist && response.data.artwork.artist.profileImage) {
        response.data.artwork.artist.profileImage = this.getFullImageUrl(response.data.artwork.artist.profileImage);
      }
    }
    return response;
  }

  async updateArtwork(id, formData) {
    return this.request(`/artworks/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  async deleteArtwork(id) {
    return this.request(`/artworks/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleLike(id) {
    return this.request(`/artworks/${id}/like`, {
      method: 'POST',
    });
  }

  async toggleFavorite(id) {
    return this.request(`/artworks/${id}/favorite`, {
      method: 'POST',
    });
  }

  // User endpoints
  async searchUsers(query, page = 1, limit = 10) {
    const params = new URLSearchParams({ q: query, page, limit }).toString();
    return this.request(`/users/search?${params}`);
  }

  async getUserProfile(id) {
    return this.request(`/users/${id}`);
  }

  async updateProfile(id, formData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  async createReport(reportData) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async getUserArtworks(id, page = 1, limit = 12) {
    const params = new URLSearchParams({ page, limit }).toString();
    const response = await this.request(`/users/${id}/artworks?${params}`);
    if (response.success && response.data && response.data.artworks && Array.isArray(response.data.artworks)) {
      response.data.artworks = response.data.artworks.map(artwork => ({
        ...artwork,
        imageUrl: this.getFullImageUrl(artwork.imageUrl),
        artist: artwork.artist ? {
          ...artwork.artist,
          profileImage: this.getFullImageUrl(artwork.artist.profileImage)
        } : artwork.artist
      }));
    }
    return response;
  }

  async getFavorites(page = 1, limit = 12) {
    const params = new URLSearchParams({ page, limit }).toString();
    const response = await this.request(`/users/favorites?${params}`);
    if (response.success && response.data && response.data.artworks && Array.isArray(response.data.artworks)) {
      response.data.artworks = response.data.artworks.map(artwork => ({
        ...artwork,
        imageUrl: this.getFullImageUrl(artwork.imageUrl),
        artist: artwork.artist ? {
          ...artwork.artist,
          profileImage: this.getFullImageUrl(artwork.artist.profileImage)
        } : artwork.artist
      }));
    }
    return response;
  }

  async getFollowing(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit }).toString();
    return this.request(`/users/following?${params}`);
  }

  async toggleFollow(id) {
    return this.request(`/users/${id}/follow`, {
      method: 'POST',
    });
  }

  // Comment endpoints
  async getComments(artworkId, page = 1, limit = 10) {
    const params = new URLSearchParams({ page, limit }).toString();
    return this.request(`/comments/artwork/${artworkId}?${params}`);
  }

  async createComment(artworkId, content, parentId = null) {
    return this.request(`/comments/artwork/${artworkId}`, {
      method: 'POST',
      body: JSON.stringify({ content, parentId }),
    });
  }

  async updateComment(id, content) {
    return this.request(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(id) {
    return this.request(`/comments/${id}`, {
      method: 'DELETE',
    });
  }

  // Report endpoints
  async createReport(data) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserReports(page = 1, limit = 10) {
    const params = new URLSearchParams({ page, limit }).toString();
    return this.request(`/reports?${params}`);
  }

  async getReportById(id) {
    return this.request(`/reports/${id}`);
  }

  // Admin endpoints
  async getAdminDashboard() {
    return this.request('/admin/dashboard');
  }

  async getAdminUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/users${query ? `?${query}` : ''}`);
  }

  async banUser(id) {
    return this.request(`/admin/users/${id}/ban`, {
      method: 'PUT',
    });
  }

  async unbanUser(id) {
    return this.request(`/admin/users/${id}/unban`, {
      method: 'PUT',
    });
  }

  async updateUserStatus(id, data) {
    return this.request(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAdminArtworks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/artworks${query ? `?${query}` : ''}`);
  }

  async updateArtworkStatus(id, data) {
    return this.request(`/admin/artworks/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateArtwork(id, data) {
    return this.request(`/admin/artworks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAdminArtwork(id) {
    console.log('API: Deleting admin artwork with ID:', id);
    return this.request(`/admin/artworks/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminReports(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/reports${query ? `?${query}` : ''}`);
  }

  async updateReportStatus(id, data) {
    return this.request(`/admin/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export default new ApiService();
