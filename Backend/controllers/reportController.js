import { Report, User, Artwork, Comment } from '../models/index.js';

export const createReport = async (req, res) => {
  try {
    const { reason, description, reportedUserId, artworkId, commentId } = req.body;

    if (!reportedUserId && !artworkId && !commentId) {
      return res.status(400).json({
        success: false,
        message: 'Must specify what to report (user, artwork, or comment)'
      });
    }

    if (reportedUserId) {
      const user = await User.findOne({
        where: { id: reportedUserId, isActive: true }
      });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (user.id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Cannot report yourself'
        });
      }
    }

    if (artworkId) {
      const artwork = await Artwork.findOne({
        where: { id: artworkId, status: 'active' }
      });
      
      if (!artwork) {
        return res.status(404).json({
          success: false,
          message: 'Artwork not found'
        });
      }

      if (artwork.artistId === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Cannot report your own artwork'
        });
      }
    }

    if (commentId) {
      const comment = await Comment.findOne({
        where: { id: commentId, status: 'active' }
      });
      
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Comment not found'
        });
      }

      if (comment.userId === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Cannot report your own comment'
        });
      }
    }

    const existingReport = await Report.findOne({
      where: {
        reporterId: req.user.id,
        ...(reportedUserId && { reportedUserId }),
        ...(artworkId && { artworkId }),
        ...(commentId && { commentId })
      }
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: 'You have already reported this'
      });
    }

    const report = await Report.create({
      reporterId: req.user.id,
      reportedUserId: reportedUserId || null,
      artworkId: artworkId || null,
      commentId: commentId || null,
      reason,
      description: description || null
    });

    const reportWithDetails = await Report.findByPk(report.id, {
      include: [
        {
          model: User,
          as: 'reporter',
          attributes: ['id', 'username']
        },
        {
          model: User,
          as: 'reportedUser',
          attributes: ['id', 'username'],
          required: false
        },
        {
          model: Artwork,
          as: 'artwork',
          attributes: ['id', 'title'],
          required: false
        },
        {
          model: Comment,
          as: 'comment',
          attributes: ['id', 'content'],
          required: false
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: { report: reportWithDetails }
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report'
    });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: reports } = await Report.findAndCountAll({
      where: { reporterId: req.user.id },
      include: [
        {
          model: User,
          as: 'reportedUser',
          attributes: ['id', 'username'],
          required: false
        },
        {
          model: Artwork,
          as: 'artwork',
          attributes: ['id', 'title', 'imageUrl'],
          required: false
        },
        {
          model: Comment,
          as: 'comment',
          attributes: ['id', 'content'],
          required: false
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        reports,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          hasMore: offset + reports.length < count
        }
      }
    });
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findOne({
      where: {
        id,
        reporterId: req.user.id
      },
      include: [
        {
          model: User,
          as: 'reportedUser',
          attributes: ['id', 'username'],
          required: false
        },
        {
          model: Artwork,
          as: 'artwork',
          attributes: ['id', 'title', 'imageUrl'],
          required: false
        },
        {
          model: Comment,
          as: 'comment',
          attributes: ['id', 'content'],
          required: false
        },
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'username'],
          required: false
        }
      ]
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: { report }
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report'
    });
  }
};