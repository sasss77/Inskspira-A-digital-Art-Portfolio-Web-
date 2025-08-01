import express from 'express';
import {
  createReport,
  getUserReports,
  getReportById
} from '../controllers/reportController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateReport, validatePagination, validateId } from '../middleware/validation.js';

const router = express.Router();

router.post('/', authenticateToken, validateReport, createReport);
router.get('/', authenticateToken, validatePagination, getUserReports);
router.get('/:id', authenticateToken, validateId, getReportById);

export default router;