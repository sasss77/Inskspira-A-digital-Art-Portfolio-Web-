// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Loading from './Loading';

const ProtectedRoute = ({ 
  children, 
  requireRole = null, 
  allowedRoles = [], 
  requireAuth = true,
  fallbackPath = "/login",
  unauthorizedPath = "/access-denied"
}) => {
  const { user, loading } = useAuth();
  const { showError } = useNotification();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading size="large" text="Checking authentication..." />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (user && (requireRole || allowedRoles.length > 0)) {
    const userRole = user.role;
    const hasRequiredRole = requireRole ? userRole === requireRole : true;
    const hasAllowedRole = allowedRoles.length > 0 ? allowedRoles.includes(userRole) : true;
    
    if (!hasRequiredRole || !hasAllowedRole) {
      showError('You do not have permission to access this page.');
      return <Navigate to={unauthorizedPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
