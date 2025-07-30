const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all comments for an artwork
router.get('/:artworkId', commentController.getComments);

// Add comment (authenticated)
router.post('/:artworkId', authMiddleware, commentController.addComment);

// Delete own comment (authenticated)
router.delete('/comment/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
