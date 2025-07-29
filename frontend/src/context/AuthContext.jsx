// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('inkspira_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        id: 1,
        username: 'ArtisticUser',
        email: email,
        role: 'artist', // or 'viewer'
        profileImage: null
      };
      
      setUser(mockUser);
      localStorage.setItem('inkspira_user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        role: userData.role || 'viewer',
        profileImage: null
      };
      
      setUser(newUser);
      localStorage.setItem('inkspira_user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inkspira_user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
