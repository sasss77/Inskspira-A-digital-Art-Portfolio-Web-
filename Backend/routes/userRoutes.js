const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public: Get user profile, search
router.get('/profile/:id', userController.getUserProfile);
router.get('/search', userController.searchUsers);

// Protected: Profile edit, view followers, following, stats, etc.
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.get('/:id/artworks', userController.getUserArtworks);
router.get('/:id/favorites', userController.getFavorites);

router.get('/:id/followers', userController.getFollowers);
router.get('/:id/following', userController.getFollowing);

// Follow/unfollow another user (protected)
router.post('/:id/follow', authMiddleware, userController.followUser);
// Optionally add a route for unfollow if you want a separate endpoint

// User stats (protected if needed)
router.get('/:id/stats', userController.getUserStats);

module.exports = router;
