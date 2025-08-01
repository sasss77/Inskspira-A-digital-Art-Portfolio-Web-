import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Common
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import ArtistRoute from './components/common/ArtistRoute';
import PublicRoute from './components/common/PublicRoute';
import OwnProfileRedirect from './components/common/OwnProfileRedirect';

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
import AccessDeniedPage from './pages/AccessDeniedPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ArtworkEdit from './components/artwork/ArtworkEdit';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminArtworks from './pages/admin/AdminArtworks';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
        <div className="App">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/artwork/:artworkId" element={<ArtworkPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

            {/* --- Legal & Info Pages --- */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />

            {/* --- Auth Routes --- */}
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

            {/* --- Protected Routes --- */}
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

            {/* --- Artist Only --- */}
            <Route
              path="/upload"
              element={
                <ArtistRoute>
                  <UploadPage />
                </ArtistRoute>
              }
            />
            <Route
              path="/artwork/:artworkId/edit"
              element={
                <ArtistRoute>
                  <ArtworkEdit />
                </ArtistRoute>
              }
            />

            {/* --- Profile / Own Redirect --- */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <OwnProfileRedirect />
                </ProtectedRoute>
              }
            />

            {/* --- Admin Only Routes --- */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/artworks"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminArtworks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminReports />
                </ProtectedRoute>
              }
            />

            {/* --- Access Denied --- */}
            <Route path="/access-denied" element={<AccessDeniedPage />} />

            {/* --- Catch-All 404 --- */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
