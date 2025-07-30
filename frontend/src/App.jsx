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
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';


import AboutPage from './pages/AboutPage';
import GuidelinesPage from './pages/GuidelinesPage';
import OwnProfileRedirect from './components/common/OwnProfileRedirect';
import NotFoundPage from './pages/NotFoundPage';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes - Always Accessible */}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/artwork/:artworkId" element={<ArtworkPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

            {/* Legal Pages - Always Accessible */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* Auth Routes - Redirect if Already Logged In */}
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

            {/* Protected Routes - Require Authentication */}
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

            {/* Artist Only Routes - Require Artist Role */}
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
                  <UploadPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <OwnProfileRedirect />
                </ProtectedRoute>
              }
            />

            {/* Catch All - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
