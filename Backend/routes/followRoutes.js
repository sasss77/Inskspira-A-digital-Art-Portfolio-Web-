const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middlewares/authMiddleware');

// Following/unfollowing handled here if not in userRoutes
router.post('/:id/follow', authMiddleware, followController.followUser);
router.delete('/:id/unfollow', authMiddleware, followController.unfollowUser);

router.get('/:id/followers', followController.getFollowers);
router.get('/:id/following', followController.getFollowing);

module.exports = router;
