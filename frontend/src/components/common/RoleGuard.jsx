import React from 'react';
import { useRole } from '../../hooks/useRole';

const RoleGuard = ({ 
  children, 
  role = null, 
  roles = [], 
  fallback = null,
  requireAuth = true,
  inverse = false 
}) => {
  const { user, hasRole, hasAnyRole } = useRole();

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return fallback;
  }

  // If no role restrictions, just check auth requirement
  if (!role && roles.length === 0) {
    return inverse ? fallback : children;
  }

  let hasPermission = false;

  // Check single role
  if (role) {
    hasPermission = hasRole(role);
  }

  // Check multiple roles
  if (roles.length > 0) {
    hasPermission = hasAnyRole(roles);
  }

  // If both role and roles are specified, user must satisfy both
  if (role && roles.length > 0) {
    hasPermission = hasRole(role) && hasAnyRole(roles);
  }

  // Apply inverse logic if specified
  if (inverse) {
    hasPermission = !hasPermission;
  }

  return hasPermission ? children : fallback;
};

export default RoleGuard;