import express from 'express';
import { signup, login, getProfile, refreshToken } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateSignup, validateLogin } from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/profile', authenticateToken, getProfile);
router.post('/refresh', authenticateToken, refreshToken);

export default router;