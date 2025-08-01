import express from 'express';
import {
  getUserProfile,
  updateProfile,
  getUserArtworks,
  getFavorites,
  toggleFollow,
  getFollowing,
  searchUsers
} from '../controllers/userController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';
import { validateUpdateProfile, validatePagination, validateId } from '../middleware/validation.js';

const router = express.Router();

router.get('/search', searchUsers);
router.get('/favorites', authenticateToken, validatePagination, getFavorites);
router.get('/following', authenticateToken, validatePagination, getFollowing);
router.get('/:id', optionalAuth, validateId, getUserProfile);
router.put('/:id', authenticateToken, uploadSingle('profileImage'), validateId, validateUpdateProfile, updateProfile);
router.get('/:id/artworks', optionalAuth, validateId, validatePagination, getUserArtworks);
router.post('/:id/follow', authenticateToken, validateId, toggleFollow);

export default router;