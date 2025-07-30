const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public: View artworks, detail, discovery
router.get('/', artworkController.getAllArtworks);
router.get('/:artworkId', artworkController.getArtwork);
router.get('/:artworkId/related', artworkController.getRelatedArtworks);

// Protected: Only artists can upload/edit/delete
router.post('/', authMiddleware, roleMiddleware('artist'), artworkController.uploadArtwork);
router.put('/:artworkId', authMiddleware, roleMiddleware('artist'), artworkController.editArtwork);
router.delete('/:artworkId', authMiddleware, roleMiddleware('artist'), artworkController.deleteArtwork);

// Social: Like & Favorite (any authenticated user)
router.post('/:artworkId/like', authMiddleware, artworkController.likeArtwork);
router.post('/:artworkId/favorite', authMiddleware, artworkController.favoriteArtwork);

module.exports = router;
