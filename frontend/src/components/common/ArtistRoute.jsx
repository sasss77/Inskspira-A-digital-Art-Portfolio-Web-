import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const ArtistRoute = ({ children, ...props }) => {
  return (
    <ProtectedRoute 
      allowedRoles={['artist', 'admin']} 
      unauthorizedPath="/access-denied"
      {...props}
    >
      {children}
    </ProtectedRoute>
  );
};

export default ArtistRoute;