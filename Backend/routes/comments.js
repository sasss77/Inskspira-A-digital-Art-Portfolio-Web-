import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { validateComment, validatePagination, validateId } from '../middleware/validation.js';

const router = express.Router();

router.get('/artwork/:artworkId', optionalAuth, validatePagination, getComments);
router.post('/artwork/:artworkId', authenticateToken, validateComment, createComment);
router.put('/:id', authenticateToken, validateId, validateComment, updateComment);
router.delete('/:id', authenticateToken, validateId, deleteComment);

export default router;