import express from 'express';
import {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  banUser,
  unbanUser,
  getArtworks,
  updateArtwork,
  updateArtworkStatus,
  deleteArtwork,
  getReports,
  updateReportStatus
} from '../controllers/adminController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { validatePagination, validateId } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticateToken, requireRole('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/users', validatePagination, getUsers);
router.put('/users/:id', validateId, updateUserStatus);
router.put('/users/:id/ban', validateId, banUser);
router.put('/users/:id/unban', validateId, unbanUser);
router.get('/artworks', validatePagination, getArtworks);
router.put('/artworks/:id', validateId, updateArtwork);
router.put('/artworks/:id/status', validateId, updateArtworkStatus);
router.delete('/artworks/:id', validateId, deleteArtwork);
router.get('/reports', validatePagination, getReports);
router.put('/reports/:id', validateId, updateReportStatus);

export default router;