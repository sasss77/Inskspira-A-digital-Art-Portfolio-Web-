import { Op } from 'sequelize';
import { Artwork, User, Like, Favorite, Comment } from '../models/index.js';
import path from 'path';
import fs from 'fs';

export const getArtworks = async (req, res) => {
  try {
    console.log('🔍 Backend - getArtworks called with query:', req.query);
    
    const {
      page = 1,
      limit = 12,
      search,
      tags,
      artistId,
      featured,
      sortBy = 'recent'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = { status: 'active' };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      where.tags = { [Op.overlap]: tagArray };
    }

    if (artistId) {
      where.artistId = artistId;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    let order = [];
    switch (sortBy) {
      case 'popular':
        order = [['likeCount', 'DESC'], ['createdAt', 'DESC']];
        break;
      case 'views':
        order = [['viewCount', 'DESC'], ['createdAt', 'DESC']];
        break;
      case 'oldest':
        order = [['createdAt', 'ASC']];
        break;
      default:
        order = [['createdAt', 'DESC']];
    }

    console.log('🔍 Backend - Query conditions:', { where, order, limit: parseInt(limit), offset: parseInt(offset) });
    
    const { count, rows: artworks } = await Artwork.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'username', 'profileImage']
        }
      ],
      order,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    console.log('🔍 Backend - Database results:', { count, artworksFound: artworks.length });
    console.log('🔍 Backend - First artwork:', artworks[0] ? {
      id: artworks[0].id,
      title: artworks[0].title,
      status: artworks[0].status,
      imageUrl: artworks[0].imageUrl
    } : 'No artworks found');

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
    } else {
      artworks.forEach(artwork => {
        artwork.dataValues.isOwn = false;
      });
    }

    const responseData = {
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
    };
    
    console.log('🔍 Backend - Sending response:', {
      success: responseData.success,
      artworksCount: responseData.data.artworks.length,
      pagination: responseData.data.pagination
    });
    
    res.json(responseData);
  } catch (error) {
    console.error('Get artworks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch artworks'
    });
  }
};

export const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findOne({
      where: { id, status: 'active' },
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'username', 'profileImage', 'bio']
        },
        {
          model: Comment,
          as: 'comments',
          where: { status: 'active' },
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'profileImage']
            }
          ],
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    await artwork.increment('viewCount');

    if (req.user) {
      const [like, favorite] = await Promise.all([
        Like.findOne({
          where: { userId: req.user.id, artworkId: artwork.id }
        }),
        Favorite.findOne({
          where: { userId: req.user.id, artworkId: artwork.id }
        })
      ]);

      artwork.dataValues.isLiked = !!like;
      artwork.dataValues.isFavorited = !!favorite;
      artwork.dataValues.isOwn = req.user.id === artwork.artistId;
    } else {
      artwork.dataValues.isOwn = false;
    }

    res.json({
      success: true,
      data: { artwork }
    });
  } catch (error) {
    console.error('Get artwork error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch artwork'
    });
  }
};

export const createArtwork = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const artwork = await Artwork.create({
      title,
      description,
      imageUrl,
      tags: tags || [],
      artistId: req.user.id
    });

    const artworkWithArtist = await Artwork.findByPk(artwork.id, {
      include: [
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'username', 'profileImage']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Artwork created successfully',
      data: { artwork: artworkWithArtist }
    });
  } catch (error) {
    console.error('Create artwork error:', error);
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete uploaded file:', err);
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create artwork'
    });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;

    const artwork = await Artwork.findOne({
      where: { id, artistId: req.user.id, status: 'active' }
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found or unauthorized'
      });
    }

    const updateData = { title, description, tags };

    if (req.file) {
      const oldImagePath = path.join('uploads', path.basename(artwork.imageUrl));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    await artwork.update(updateData);

    const updatedArtwork = await Artwork.findByPk(artwork.id, {
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
    console.error('Update artwork error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update artwork'
    });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findOne({
      where: {
        id,
        [Op.or]: [
          { artistId: req.user.id },
          req.user.role === 'admin' ? {} : { artistId: req.user.id }
        ]
      }
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found or unauthorized'
      });
    }

    await artwork.update({ status: 'deleted' });

    const imagePath = path.join('uploads', path.basename(artwork.imageUrl));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({
      success: true,
      message: 'Artwork deleted successfully'
    });
  } catch (error) {
    console.error('Delete artwork error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete artwork'
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findOne({
      where: { id, status: 'active' }
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    const existingLike = await Like.findOne({
      where: { userId: req.user.id, artworkId: id }
    });

    if (existingLike) {
      await existingLike.destroy();
      await artwork.decrement('likeCount');
      
      res.json({
        success: true,
        message: 'Like removed',
        data: { isLiked: false, likeCount: artwork.likeCount - 1 }
      });
    } else {
      await Like.create({ userId: req.user.id, artworkId: id });
      await artwork.increment('likeCount');
      
      res.json({
        success: true,
        message: 'Like added',
        data: { isLiked: true, likeCount: artwork.likeCount + 1 }
      });
    }
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle like'
    });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findOne({
      where: { id, status: 'active' }
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }

    const existingFavorite = await Favorite.findOne({
      where: { userId: req.user.id, artworkId: id }
    });

    if (existingFavorite) {
      await existingFavorite.destroy();
      
      res.json({
        success: true,
        message: 'Removed from favorites',
        data: { isFavorited: false }
      });
    } else {
      await Favorite.create({ userId: req.user.id, artworkId: id });
      
      res.json({
        success: true,
        message: 'Added to favorites',
        data: { isFavorited: true }
      });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle favorite'
    });
  }
};