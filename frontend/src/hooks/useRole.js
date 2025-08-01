import { useAuth } from '../context/AuthContext';

export const useRole = () => {
  const { user } = useAuth();

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isArtist = () => {
    return user?.role === 'artist';
  };

  const isViewer = () => {
    return user?.role === 'viewer';
  };

  const canUpload = () => {
    return ['artist', 'admin'].includes(user?.role);
  };

  const canModerate = () => {
    return user?.role === 'admin';
  };

  const canEdit = (resourceOwnerId) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.id === resourceOwnerId;
  };

  const canDelete = (resourceOwnerId) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.id === resourceOwnerId;
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    isAdmin,
    isArtist,
    isViewer,
    canUpload,
    canModerate,
    canEdit,
    canDelete,
    userRole: user?.role
  };
};

export default useRole;