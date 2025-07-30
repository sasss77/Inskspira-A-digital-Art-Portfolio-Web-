const Follow = require('../models/followModel');
const User = require('../models/userModel');

// Follow user
exports.followUser = async (req, res) => {
  // Same as userController.followUser
};
// Unfollow user
exports.unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const follow = await Follow.findOne({ where: { follower_id: req.user.id, following_id: id } });
    if (follow) await follow.destroy();
    res.json({ followed: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List followers or following
exports.getFollowers = async (req, res) => {
  // See userController for full code
};
exports.getFollowing = async (req, res) => {
  // See userController for full code
};
