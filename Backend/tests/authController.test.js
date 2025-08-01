import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { User } from '../models/index.js';
import { signup, login, getProfile, refreshToken } from '../controllers/authController.js';

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../models/index.js');

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      user: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'viewer'
      };

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'viewer'
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        where: {
          [Op.or]: [
            { email: 'test@example.com' },
            { username: 'testuser' }
          ]
        }
      });
      expect(User.create).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'viewer'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User created successfully. Please login to continue.',
        data: {
          user: mockUser
        }
      });
    });

    it('should return error if email already exists', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const existingUser = {
        email: 'test@example.com',
        username: 'existinguser'
      };

      User.findOne.mockResolvedValue(existingUser);

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email already registered'
      });
    });

    it('should return error if username already exists', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const existingUser = {
        email: 'different@example.com',
        username: 'testuser'
      };

      User.findOne.mockResolvedValue(existingUser);

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Username already taken'
      });
    });

    it('should handle server errors', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockRejectedValue(new Error('Database error'));
      console.error = jest.fn();

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to create user'
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        isActive: true,
        comparePassword: jest.fn().mockResolvedValue(true),
        update: jest.fn().mockResolvedValue(true)
      };

      const mockToken = 'mock-jwt-token';

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue(mockToken);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
      expect(mockUser.update).toHaveBeenCalledWith({ lastLoginAt: expect.any(Date) });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Login successful',
        data: {
          user: mockUser,
          token: mockToken
        }
      });
    });

    it('should return error for invalid user', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should return error for inactive user', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        isActive: false
      };

      User.findOne.mockResolvedValue(mockUser);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should return error for invalid password', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        isActive: true,
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne.mockResolvedValue(mockUser);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });
  });

  describe('getProfile', () => {
    it('should return user profile successfully', async () => {
      req.user = { id: 1 };

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'viewer'
      };

      User.findByPk.mockResolvedValue(mockUser);

      await getProfile(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1, {
        attributes: { exclude: ['password'] }
      });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { user: mockUser }
      });
    });

    it('should handle server errors', async () => {
      req.user = { id: 1 };

      User.findByPk.mockRejectedValue(new Error('Database error'));
      console.error = jest.fn();

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to get profile'
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      req.user = { id: 1 };

      const mockUser = {
        id: 1,
        isActive: true
      };

      const mockToken = 'new-jwt-token';

      User.findByPk.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue(mockToken);

      await refreshToken(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { token: mockToken }
      });
    });

    it('should return error for inactive user', async () => {
      req.user = { id: 1 };

      const mockUser = {
        id: 1,
        isActive: false
      };

      User.findByPk.mockResolvedValue(mockUser);

      await refreshToken(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found or inactive'
      });
    });

    it('should return error for non-existent user', async () => {
      req.user = { id: 1 };

      User.findByPk.mockResolvedValue(null);

      await refreshToken(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found or inactive'
      });
    });
  });
});
