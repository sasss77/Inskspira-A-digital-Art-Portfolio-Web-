const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Returns current user info if JWT valid
const authMiddleware = require('../middlewares/authMiddleware');
router.get('/me', authMiddleware, authController.me);

module.exports = router;
