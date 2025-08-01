import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const AdminRoute = ({ children, ...props }) => {
  return (
    <ProtectedRoute 
      requireRole="admin" 
      unauthorizedPath="/access-denied"
      {...props}
    >
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;