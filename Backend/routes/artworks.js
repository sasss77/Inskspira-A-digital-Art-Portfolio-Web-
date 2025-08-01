import express from 'express';
import {
  getArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  toggleLike,
  toggleFavorite
} from '../controllers/artworkController.js';
import { authenticateToken, requireRole, optionalAuth } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';
import { validateArtwork, validatePagination, validateId } from '../middleware/validation.js';

const router = express.Router();

router.get('/', optionalAuth, validatePagination, getArtworks);
router.get('/:id', optionalAuth, validateId, getArtworkById);
router.post('/', authenticateToken, requireRole(['artist', 'admin']), uploadSingle('image'), validateArtwork, createArtwork);
router.put('/:id', authenticateToken, requireRole(['artist', 'admin']), uploadSingle('image'), validateId, validateArtwork, updateArtwork);
router.delete('/:id', authenticateToken, validateId, deleteArtwork);
router.post('/:id/like', authenticateToken, validateId, toggleLike);
router.post('/:id/favorite', authenticateToken, validateId, toggleFavorite);

export default router;