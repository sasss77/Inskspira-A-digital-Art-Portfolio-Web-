// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ArtworkPage from './pages/ArtworkPage';
import UploadPage from './pages/UploadPage';
import FavoritesPage from './pages/FavoritesPage';
import FollowingPage from './pages/FollowingPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/artwork/:artworkId" element={<ArtworkPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

            {/* Auth Routes (redirect if logged in) */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/following" 
              element={
                <ProtectedRoute>
                  <FollowingPage />
                </ProtectedRoute>
              } 
            />

            {/* Artist Only Routes */}
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute requireRole="artist">
                  <UploadPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/artwork/:artworkId/edit" 
              element={
                <ProtectedRoute requireRole="artist">
                  <ArtworkPage />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
