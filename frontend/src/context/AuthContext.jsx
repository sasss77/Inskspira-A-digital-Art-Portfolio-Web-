// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const storedUser = localStorage.getItem('inkspira_user');
        const storedToken = localStorage.getItem('inkspira_token');

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading stored session:', error);
        // Clear invalid stored data
        localStorage.removeItem('inkspira_user');
        localStorage.removeItem('inkspira_token');
      } finally {
        setLoading(false);
      }
    };

    // Simulate auth check delay (remove in production)
    setTimeout(checkExistingSession, 500);
  }, []);

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // Simulate API response
      const mockUser = {
        id: 1,
        username: email.split('@')[0] || 'Artist',
        email: email,
        role:
          email.includes('admin') ? 'admin' :
            email.includes('artist') ? 'artist' :
              'viewer',
        profileImage: null,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      // Store user data and token
      setUser(mockUser);
      localStorage.setItem('inkspira_user', JSON.stringify(mockUser));
      localStorage.setItem('inkspira_token', mockToken);

      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const signup = async (userData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();

      // Simulate API response
      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        role: userData.role || 'viewer',
        profileImage: null,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      // Store user data and token
      setUser(newUser);
      localStorage.setItem('inkspira_user', JSON.stringify(newUser));
      localStorage.setItem('inkspira_token', mockToken);

      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inkspira_user');
    localStorage.removeItem('inkspira_token');
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('inkspira_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
