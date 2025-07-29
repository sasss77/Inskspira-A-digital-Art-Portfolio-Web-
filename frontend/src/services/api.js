// src/services/api.js
const API_BASE_URL = 'http://localhost:4000/api'; // Your backend URL

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('inkspira_token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
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

  // Artwork endpoints
  async getArtworks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/artworks${query ? `?${query}` : ''}`);
  }

  async getArtworkById(id) {
    return this.request(`/artworks/${id}`);
  }

  async uploadArtwork(formData) {
    return this.request('/artworks', {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }

  // User endpoints
  async getUserProfile(id) {
    return this.request(`/users/${id}`);
  }

  async updateProfile(id, data) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export default new ApiService();
