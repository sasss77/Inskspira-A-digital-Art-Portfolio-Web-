const Comment = require('../models/commentModel');
const User = require('../models/userModel');

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required.' });
    const comment = await Comment.create({
      user_id: req.user.id,
      artwork_id: artworkId,
      content
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all comments for an artwork
exports.getComments = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const comments = await Comment.findAll({
      where: { artwork_id: artworkId },
      include: [{ model: User, attributes: ['id', 'username', 'profile_picture'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete own comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user_id !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    await comment.destroy();
    res.json({ message: 'Comment deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
