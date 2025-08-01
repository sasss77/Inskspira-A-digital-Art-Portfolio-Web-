import { Op } from 'sequelize';
import { sequelize, User, Artwork, Report, Comment } from '../models/index.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [userStats, artworkStats, reportStats] = await Promise.all([
      User.findAll({
        attributes: [
          'role',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: { isActive: true },
        group: ['role']
      }),
      Artwork.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      }),
      Report.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      })
    ]);

    const totalUsers = await User.count({ where: { isActive: true } });
    const totalArtworks = await Artwork.count({ where: { status: 'active' } });
    const pendingReports = await Report.count({ where: { status: 'pending' } });
    const totalComments = await Comment.count({ where: { status: 'active' } });

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalArtworks,
          pendingReports,
          totalComments
        },
        userStats,
        artworkStats,
        reportStats
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      role,
      status = 'active'
    } = req.query;
    
    const offset = (page - 1) * limit;
    const where = {};

    if (status === 'active') {
      where.isActive = true;
    } else if (status === 'inactive') {
      where.isActive = false;
    }

    if (search) {
      where[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (role && ['viewer', 'artist', 'admin'].includes(role)) {
      where.role = role;
    }

    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          hasMore: offset + users.length < count
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive, role } = req.body;

    if (req.user.id === parseInt(id)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify your own account'
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updateData = {};
    
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }
    
    if (role && ['viewer', 'artist', 'admin'].includes(role)) {
      updateData.role = role;
    }

    await user.update(updateData);

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
};

export const banUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === parseInt(id)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot ban your own account'
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'User is already banned'
      });
    }

    await user.update({ isActive: false });

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      message: `User ${user.username} has been banned successfully`,
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ban user'
    });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'User is already active'
      });
    }

    await user.update({ isActive: true });

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      message: `User ${user.username} has been unbanned successfully`,
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Unban user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unban user'
    });
  }
};

export const getArtworks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status = 'active',
      artistId
    } = req.query;
    
    const offset = (page - 1) * limit;
    const where = {};

    if (status && ['active', 'reported', 'hidden', 'deleted'].includes(status)) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (artistId) {
      where.artistId = artistId;
    }

    const { count, rows: artworks } = await Artwork.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'username', 'profileImage']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        artworks,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          hasMore: offset + artworks.length < count
        }
      }
    });
  } catch (error) {
    console.error('Get artworks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch artworks'
    });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;

    const artwork = await Artwork.findByPk(id);
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tags !== undefined) updateData.tags = tags;

    await artwork.update(updateData);

    res.json({
      success: true,
      message: 'Artwork updated successfully',
      data: { artwork }
    });
  } catch (error) {
    console.error('Update artwork error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update artwork'
    });
  }
};

export const updateArtworkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isFeatured } = req.body;

    const artwork = await Artwork.findByPk(id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    const updateData = {};
    
    if (status && ['active', 'reported', 'hidden', 'deleted'].includes(status)) {
      updateData.status = status;
    }
    
    if (typeof isFeatured === 'boolean') {
      updateData.isFeatured = isFeatured;
    }

    await artwork.update(updateData);

    const updatedArtwork = await Artwork.findByPk(id, {
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'username', 'profileImage']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Artwork updated successfully',
      data: { artwork: updatedArtwork }
    });
  } catch (error) {
    console.error('Update artwork status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update artwork'
    });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findByPk(id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    await artwork.destroy();

    res.json({
      success: true,
      message: 'Artwork deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = 'pending',
      reason
    } = req.query;
    
    const offset = (page - 1) * limit;
    const where = {};

    if (status && ['pending', 'reviewed', 'resolved', 'dismissed'].includes(status)) {
      where.status = status;
    }

    if (reason && ['inappropriate_content', 'spam', 'harassment', 'copyright_violation', 'fake_account', 'other'].includes(reason)) {
      where.reason = reason;
    }

    const { count, rows: reports } = await Report.findAndCountAll({
      where,
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
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const updateData = {
      reviewedBy: req.user.id,
      reviewedAt: new Date()
    };
    
    if (status && ['pending', 'reviewed', 'resolved', 'dismissed'].includes(status)) {
      updateData.status = status;
    }
    
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    await report.update(updateData);

    const updatedReport = await Report.findByPk(id, {
      include: [
        {
          model: User,
          as: 'reporter',
          attributes: ['id', 'username']
        },
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'username']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: { report: updatedReport }
    });
  } catch (error) {
    console.error('Update report status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report'
    });
  }
};