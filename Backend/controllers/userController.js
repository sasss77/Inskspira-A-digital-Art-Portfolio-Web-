const User = require('../models/userModel');
const Artwork = require('../models/artworkModel');
const Follow = require('../models/followModel');
const Favorite = require('../models/favoriteModel');
const Like = require('../models/likeModel');
const { Op } = require('sequelize');

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password_hash'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile (for current user)
exports.updateUserProfile = async (req, res) => {
  try {
    const updateFields = { ...req.body };
    delete updateFields.role; // Prevent role change
    delete updateFields.password_hash;

    const [count, [user]] = await User.update(updateFields, {
      where: { id: req.user.id },
      returning: true
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all artworks by a user
exports.getUserArtworks = async (req, res) => {
  try {
    const { id } = req.params;
    const artworks = await Artwork.findAll({ where: { user_id: id }, order: [['createdAt', 'DESC']] });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const favorites = await user.getFavoriteArtworks();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search users by username
exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const users = await User.findAll({
      where: {
        username: { [Op.iLike]: `%${q}%` }
      },
      attributes: ['id', 'username', 'role', 'profile_picture', 'bio']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get followers for user
exports.getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const followers = await Follow.findAll({
      where: { following_id: id },
      include: [{ model: User, as: 'Follower', attributes: ['id', 'username', 'profile_picture'] }]
    });
    res.json(followers.map(f => f.Follower));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get users followed by user
exports.getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const following = await Follow.findAll({
      where: { follower_id: id },
      include: [{ model: User, as: 'Following', attributes: ['id', 'username', 'profile_picture'] }]
    });
    res.json(following.map(f => f.Following));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Follow/unfollow user
exports.followUser = async (req, res) => {
  try {
    const { id } = req.params; // user to follow/unfollow
    if (req.user.id === id) return res.status(400).json({ message: "Can't follow yourself." });
    const [follow, created] = await Follow.findOrCreate({
      where: { follower_id: req.user.id, following_id: id }
    });
    if (!created) {
      await follow.destroy();
      return res.json({ followed: false });
    }
    res.json({ followed: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Profile stats
exports.getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const [artworkCount, followerCount, followingCount, likeCount] = await Promise.all([
      Artwork.count({ where: { user_id: id } }),
      Follow.count({ where: { following_id: id } }),
      Follow.count({ where: { follower_id: id } }),
      Like.count({
        include: [{
          model: Artwork, as: 'LikedArtworks',
          where: { user_id: id }
        }]
      }),
    ]);
    res.json({ artworkCount, followerCount, followingCount, likeCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
