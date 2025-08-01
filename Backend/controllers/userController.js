import { Op } from 'sequelize';
import { User, Artwork, Follow, Favorite, Like } from '../models/index.js';
import fs from 'fs';
import path from 'path';

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id, isActive: true },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Artwork,
          as: 'artworks',
          where: { status: 'active' },
          required: false,
          order: [['createdAt', 'DESC']],
          limit: 12
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const [followerCount, followingCount, totalLikes] = await Promise.all([
      Follow.count({ where: { followingId: id } }),
      Follow.count({ where: { followerId: id } }),
      Like.count({
        include: [{
          model: Artwork,
          as: 'artwork',
          where: { artistId: id, status: 'active' },
          attributes: []
        }]
      })
    ]);

    user.dataValues.followerCount = followerCount;
    user.dataValues.followingCount = followingCount;
    user.dataValues.totalLikes = totalLikes;

    if (req.user && req.user.id !== parseInt(id)) {
      const isFollowing = await Follow.findOne({
        where: {
          followerId: req.user.id,
          followingId: id
        }
      });
      user.dataValues.isFollowing = !!isFollowing;
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, bio } = req.body;

    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to update this profile'
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

    if (username && username !== user.username) {
      const existingUser = await User.findOne({
        where: { username, id: { [Op.ne]: id } }
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken'
        });
      }
      updateData.username = username;
    }

    if (bio !== undefined) {
      updateData.bio = bio;
    }

    if (req.file) {
      if (user.profileImage) {
        const oldImagePath = path.join('uploads', path.basename(user.profileImage));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.update(updateData);

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

export const getUserArtworks = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const user = await User.findOne({
      where: { id, isActive: true }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { count, rows: artworks } = await Artwork.findAndCountAll({
      where: {
        artistId: id,
        status: 'active'
      },
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

    if (req.user) {
      const artworkIds = artworks.map(artwork => artwork.id);
      const [likes, favorites] = await Promise.all([
        Like.findAll({
          where: {
            userId: req.user.id,
            artworkId: { [Op.in]: artworkIds }
          }
        }),
        Favorite.findAll({
          where: {
            userId: req.user.id,
            artworkId: { [Op.in]: artworkIds }
          }
        })
      ]);

      const likedIds = new Set(likes.map(like => like.artworkId));
      const favoritedIds = new Set(favorites.map(fav => fav.artworkId));

      artworks.forEach(artwork => {
        artwork.dataValues.isLiked = likedIds.has(artwork.id);
        artwork.dataValues.isFavorited = favoritedIds.has(artwork.id);
        artwork.dataValues.isOwn = req.user.id === artwork.artistId;
      });
    }

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
    console.error('Get user artworks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user artworks'
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: favorites } = await Favorite.findAndCountAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Artwork,
          as: 'artwork',
          where: { status: 'active' },
          include: [
            {
              model: User,
              as: 'artist',
              attributes: ['id', 'username', 'profileImage']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const artworks = favorites.map(fav => {
      const artwork = fav.artwork;
      artwork.dataValues.isFavorited = true;
      artwork.dataValues.isOwn = req.user.id === artwork.artistId;
      return artwork;
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
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites'
    });
  }
};

export const toggleFollow = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === parseInt(id)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot follow yourself'
      });
    }

    const targetUser = await User.findOne({
      where: { id, isActive: true }
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const existingFollow = await Follow.findOne({
      where: {
        followerId: req.user.id,
        followingId: id
      }
    });

    if (existingFollow) {
      await existingFollow.destroy();
      
      res.json({
        success: true,
        message: 'Unfollowed successfully',
        data: { isFollowing: false }
      });
    } else {
      await Follow.create({
        followerId: req.user.id,
        followingId: id
      });
      
      res.json({
        success: true,
        message: 'Followed successfully',
        data: { isFollowing: true }
      });
    }
  } catch (error) {
    console.error('Toggle follow error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle follow'
    });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: following } = await Follow.findAndCountAll({
      where: { followerId: req.user.id },
      include: [
        {
          model: User,
          as: 'following',
          attributes: ['id', 'username', 'profileImage', 'bio']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const users = following.map(follow => follow.following);

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
    console.error('Get following error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch following'
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: {
        isActive: true,
        [Op.or]: [
          { username: { [Op.iLike]: `%${q}%` } },
          { bio: { [Op.iLike]: `%${q}%` } }
        ]
      },
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
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
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search users'
    });
  }
};