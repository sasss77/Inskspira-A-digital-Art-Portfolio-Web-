import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const storedToken = localStorage.getItem('inkspira_token');
        
        if (storedToken) {
          const userData = await apiService.getProfile();
          setUser(userData.data.user);
        }
      } catch (error) {
        console.error('Error loading stored session:', error);
        localStorage.removeItem('inkspira_token');
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('inkspira_token');
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      
      // Store user data and token
      setUser(response.data.user);
      localStorage.setItem('inkspira_user', JSON.stringify(response.data.user));
      localStorage.setItem('inkspira_token', response.data.token);

      return response.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      const response = await apiService.signup(userData);
      
      return response.data.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  }, []);

  const updateUser = useCallback((updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
  }, [user]);

  const refreshAuth = useCallback(async () => {
    try {
      const response = await apiService.refreshToken();
      localStorage.setItem('inkspira_token', response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  }, [logout]);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
