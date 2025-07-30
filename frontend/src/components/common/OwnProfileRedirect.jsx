// src/components/common/OwnProfileRedirect.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const OwnProfileRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  // Redirect to the user's profile page with their ID
  return <Navigate to={`/profile/${user.id}`} replace />;
};

export default OwnProfileRedirect;
