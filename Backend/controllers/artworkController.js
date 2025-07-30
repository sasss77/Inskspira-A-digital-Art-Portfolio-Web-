const Artwork = require('../models/artworkModel');
const User = require('../models/userModel');
const Like = require('../models/likeModel');
const Favorite = require('../models/favoriteModel');
const { Op } = require('sequelize');

// Upload artwork (artist only)
exports.uploadArtwork = async (req, res) => {
  try {
    const { title, description, tags, image_url } = req.body;
    if (req.user.role !== 'artist') return res.status(403).json({ message: 'Only artists can upload.' });
    const artwork = await Artwork.create({
      user_id: req.user.id,
      title, description, image_url,
      tags, is_public: true
    });
    res.status(201).json(artwork);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit artwork (artist only, must own)
exports.editArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const artwork = await Artwork.findByPk(artworkId);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    if (artwork.user_id !== req.user.id) return res.status(403).json({ message: 'Not your artwork' });

    const { title, description, tags, is_public } = req.body;
    artwork.title = title;
    artwork.description = description;
    artwork.tags = tags;
    if (typeof is_public !== 'undefined') artwork.is_public = is_public;
    await artwork.save();
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete artwork (artist only)
exports.deleteArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const artwork = await Artwork.findByPk(artworkId);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    if (artwork.user_id !== req.user.id) return res.status(403).json({ message: 'Not authorized.' });

    await artwork.destroy();
    res.json({ message: 'Artwork deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get details for one artwork
exports.getArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const artwork = await Artwork.findByPk(artworkId, {
      include: [
        { model: User, attributes: ['id', 'username', 'profile_picture', 'bio'] }
      ]
    });
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get paginated list (for home, search, discovery)
exports.getAllArtworks = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, sort } = req.query;
    const where = {};
    if (search) where.title = { [Op.iLike]: `%${search}%` };
    // Optionally filter by tags, artist, etc.

    const order = [['createdAt', 'DESC']];
    if (sort === 'popular') order.unshift(['likesCount', 'DESC']);

    const artworks = await Artwork.findAndCountAll({
      where,
      include: [{ model: User, attributes: ['id', 'username', 'profile_picture'] }],
      offset: (page - 1) * limit,
      limit: parseInt(limit)
    });

    res.json({
      artworks: artworks.rows,
      total: artworks.count,
      page: parseInt(page),
      pages: Math.ceil(artworks.count / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like/unlike artwork
exports.likeArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const [like, created] = await Like.findOrCreate({ where: { user_id: req.user.id, artwork_id: artworkId } });
    if (!created) {
      await like.destroy();
      return res.json({ liked: false });
    }
    res.json({ liked: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Favorite/unfavorite artwork
exports.favoriteArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const [fav, created] = await Favorite.findOrCreate({ where: { user_id: req.user.id, artwork_id: artworkId } });
    if (!created) {
      await fav.destroy();
      return res.json({ favorited: false });
    }
    res.json({ favorited: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get related artworks (by tag or artist)
exports.getRelatedArtworks = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const original = await Artwork.findByPk(artworkId);
    if (!original) return res.json([]);
    const related = await Artwork.findAll({
      where: {
        id: { [Op.ne]: artworkId },
        tags: { [Op.overlap]: original.tags }, // PostgreSQL array overlap
        is_public: true
      },
      limit: 6
    });
    res.json(related);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
