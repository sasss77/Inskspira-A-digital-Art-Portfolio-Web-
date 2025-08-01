import { Comment, User, Artwork } from '../models/index.js';
import { getComments, createComment, updateComment, deleteComment } from '../controllers/commentController.js';

// Mock dependencies
jest.mock('../models/index.js');

describe('Comment Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      user: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getComments', () => {
    it('should get comments successfully', async () => {
      req.params = { artworkId: '1' };
      req.query = { page: '1', limit: '20' };

      const mockArtwork = {
        id: 1,
        status: 'active'
      };

      const mockComments = [
        {
          id: 1,
          content: 'Great artwork!',
          user: { id: 1, username: 'user1', profileImage: 'image1.jpg' },
          replies: []
        }
      ];

      Artwork.findOne.mockResolvedValue(mockArtwork);
      Comment.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockComments
      });

      await getComments(req, res);

      expect(Artwork.findOne).toHaveBeenCalledWith({
        where: { id: '1', status: 'active' }
      });
      expect(Comment.findAndCountAll).toHaveBeenCalledWith({
        where: {
          artworkId: '1',
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
            include: [{
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'profileImage']
            }],
            order: [['createdAt', 'ASC']]
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: 20,
        offset: 0
      });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          comments: mockComments,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 1,
            hasMore: false
          }
        }
      });
    });

    it('should return error if artwork not found', async () => {
      req.params = { artworkId: '999' };

      Artwork.findOne.mockResolvedValue(null);

      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Artwork not found'
      });
    });

    it('should handle server errors', async () => {
      req.params = { artworkId: '1' };

      Artwork.findOne.mockRejectedValue(new Error('Database error'));
      console.error = jest.fn();

      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch comments'
      });
    });
  });

  describe('createComment', () => {
    it('should create a comment successfully', async () => {
      req.params = { artworkId: '1' };
      req.body = { content: 'Nice artwork!' };
      req.user = { id: 1 };

      const mockArtwork = {
        id: 1,
        status: 'active',
        increment: jest.fn()
      };

      const mockComment = {
        id: 1,
        content: 'Nice artwork!',
        userId: 1,
        artworkId: 1
      };

      const mockCommentWithUser = {
        ...mockComment,
        user: { id: 1, username: 'user1', profileImage: 'image1.jpg' }
      };

      Artwork.findOne.mockResolvedValue(mockArtwork);
      Comment.create.mockResolvedValue(mockComment);
      Comment.findByPk.mockResolvedValue(mockCommentWithUser);

      await createComment(req, res);

      expect(Artwork.findOne).toHaveBeenCalledWith({
        where: { id: '1', status: 'active' }
      });
      expect(Comment.create).toHaveBeenCalledWith({
        content: 'Nice artwork!',
        userId: 1,
        artworkId: '1',
        parentId: null
      });
      expect(mockArtwork.increment).toHaveBeenCalledWith('commentCount');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Comment created successfully',
        data: { comment: mockCommentWithUser }
      });
    });

    it('should create a reply successfully', async () => {
      req.params = { artworkId: '1' };
      req.body = { content: 'Nice reply!', parentId: '2' };
      req.user = { id: 1 };

      const mockArtwork = {
        id: 1,
        status: 'active',
        increment: jest.fn()
      };

      const mockParentComment = {
        id: 2,
        artworkId: 1,
        status: 'active'
      };

      const mockComment = {
        id: 3,
        content: 'Nice reply!',
        userId: 1,
        artworkId: 1,
        parentId: 2
      };

      const mockCommentWithUser = {
        ...mockComment,
        user: { id: 1, username: 'user1', profileImage: 'image1.jpg' }
      };

      Artwork.findOne.mockResolvedValue(mockArtwork);
      Comment.findOne.mockResolvedValue(mockParentComment);
      Comment.create.mockResolvedValue(mockComment);
      Comment.findByPk.mockResolvedValue(mockCommentWithUser);

      await createComment(req, res);

      expect(Comment.findOne).toHaveBeenCalledWith({
        where: {
          id: '2',
          artworkId: '1',
          status: 'active'
        }
      });
      expect(Comment.create).toHaveBeenCalledWith({
        content: 'Nice reply!',
        userId: 1,
        artworkId: '1',
        parentId: '2'
      });
    });

    it('should return error if artwork not found', async () => {
      req.params = { artworkId: '999' };
      req.body = { content: 'Nice artwork!' };
      req.user = { id: 1 };

      Artwork.findOne.mockResolvedValue(null);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Artwork not found'
      });
    });

    it('should return error if parent comment not found', async () => {
      req.params = { artworkId: '1' };
      req.body = { content: 'Nice reply!', parentId: '999' };
      req.user = { id: 1 };

      const mockArtwork = {
        id: 1,
        status: 'active'
      };

      Artwork.findOne.mockResolvedValue(mockArtwork);
      Comment.findOne.mockResolvedValue(null);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Parent comment not found'
      });
    });
  });

  describe('updateComment', () => {
    it('should update comment successfully', async () => {
      req.params = { id: '1' };
      req.body = { content: 'Updated content' };
      req.user = { id: 1 };

      const mockComment = {
        id: 1,
        userId: 1,
        status: 'active',
        update: jest.fn()
      };

      const mockUpdatedComment = {
        id: 1,
        content: 'Updated content',
        isEdited: true,
        user: { id: 1, username: 'user1', profileImage: 'image1.jpg' }
      };

      Comment.findOne.mockResolvedValue(mockComment);
      Comment.findByPk.mockResolvedValue(mockUpdatedComment);

      await updateComment(req, res);

      expect(Comment.findOne).toHaveBeenCalledWith({
        where: {
          id: '1',
          userId: 1,
          status: 'active'
        }
      });
      expect(mockComment.update).toHaveBeenCalledWith({
        content: 'Updated content',
        isEdited: true
      });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Comment updated successfully',
        data: { comment: mockUpdatedComment }
      });
    });

    it('should return error if comment not found or unauthorized', async () => {
      req.params = { id: '1' };
      req.body = { content: 'Updated content' };
      req.user = { id: 2 };

      Comment.findOne.mockResolvedValue(null);

      await updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Comment not found or unauthorized'
      });
    });
  });

  describe('deleteComment', () => {
    it('should delete comment successfully', async () => {
      req.params = { id: '1' };
      req.user = { id: 1, role: 'user' };

      const mockComment = {
        id: 1,
        userId: 1,
        artworkId: 1,
        status: 'active',
        update: jest.fn(),
        artwork: { id: 1 }
      };

      const mockArtwork = {
        id: 1,
        decrement: jest.fn()
      };

      Comment.findOne.mockResolvedValue(mockComment);
      Artwork.findByPk.mockResolvedValue(mockArtwork);
      Comment.count.mockResolvedValue(0);

      await deleteComment(req, res);

      expect(mockComment.update).toHaveBeenCalledWith({ status: 'deleted' });
      expect(mockArtwork.decrement).toHaveBeenCalledWith('commentCount');
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Comment deleted successfully'
      });
    });

    it('should delete comment and replies successfully', async () => {
      req.params = { id: '1' };
      req.user = { id: 1, role: 'user' };

      const mockComment = {
        id: 1,
        userId: 1,
        artworkId: 1,
        status: 'active',
        update: jest.fn(),
        artwork: { id: 1 }
      };

      const mockArtwork = {
        id: 1,
        decrement: jest.fn()
      };

      Comment.findOne.mockResolvedValue(mockComment);
      Artwork.findByPk.mockResolvedValue(mockArtwork);
      Comment.count.mockResolvedValue(2);
      Comment.update.mockResolvedValue();

      await deleteComment(req, res);

      expect(Comment.update).toHaveBeenCalledWith(
        { status: 'deleted' },
        {
          where: {
            parentId: 1,
            status: 'active'
          }
        }
      );
      expect(mockArtwork.decrement).toHaveBeenCalledWith('commentCount', { by: 2 });
    });

    it('should return error if comment not found or unauthorized', async () => {
      req.params = { id: '1' };
      req.user = { id: 2, role: 'user' };

      Comment.findOne.mockResolvedValue(null);

      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Comment not found or unauthorized'
      });
    });
  });
});
