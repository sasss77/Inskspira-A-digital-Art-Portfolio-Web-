import { Op } from 'sequelize';
import { Comment, User, Artwork } from '../models/index.js';

export const getComments = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const artwork = await Artwork.findOne({
      where: { id: artworkId, status: 'active' }
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    const { count, rows: comments } = await Comment.findAndCountAll({
      where: {
        artworkId,
        parentId: null,
        status: 'active'
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileImage']
        },
        {
          model: Comment,
          as: 'replies',
          where: { status: 'active' },
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'profileImage']
            }
          ],
          order: [['createdAt', 'ASC']]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        comments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          hasMore: offset + comments.length < count
        }
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch comments'
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const { content, parentId } = req.body;

    const artwork = await Artwork.findOne({
      where: { id: artworkId, status: 'active' }
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    if (parentId) {
      const parentComment = await Comment.findOne({
        where: {
          id: parentId,
          artworkId,
          status: 'active'
        }
      });

      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: 'Parent comment not found'
        });
      }
    }

    const comment = await Comment.create({
      content,
      userId: req.user.id,
      artworkId,
      parentId: parentId || null
    });

    await artwork.increment('commentCount');

    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileImage']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: { comment: commentWithUser }
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create comment'
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findOne({
      where: {
        id,
        userId: req.user.id,
        status: 'active'
      }
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found or unauthorized'
      });
    }

    await comment.update({
      content,
      isEdited: true
    });

    const updatedComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileImage']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Comment updated successfully',
      data: { comment: updatedComment }
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update comment'
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({
      where: {
        id,
        [Op.or]: [
          { userId: req.user.id },
          req.user.role === 'admin' ? {} : { userId: req.user.id }
        ],
        status: 'active'
      },
      include: [
        {
          model: Artwork,
          as: 'artwork',
          attributes: ['id']
        }
      ]
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found or unauthorized'
      });
    }

    await comment.update({ status: 'deleted' });

    const artwork = await Artwork.findByPk(comment.artworkId);
    if (artwork) {
      await artwork.decrement('commentCount');
    }

    const replyCount = await Comment.count({
      where: {
        parentId: comment.id,
        status: 'active'
      }
    });

    if (replyCount > 0) {
      await Comment.update(
        { status: 'deleted' },
        {
          where: {
            parentId: comment.id,
            status: 'active'
          }
        }
      );
      
      if (artwork) {
        await artwork.decrement('commentCount', { by: replyCount });
      }
    }

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete comment'
    });
  }
};