const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register new user (artist/viewer)
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!['artist', 'viewer'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

    const exists = await User.findOne({ where: { [User.sequelize.Op.or]: [{ email }, { username }] } });
    if (exists) return res.status(409).json({ message: 'Email or username already in use.' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password_hash: hash, role });

    return res.status(201).json({ message: 'User registered successfully!', user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Login (returns JWT)
exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
      where: { [User.sequelize.Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }] }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Get current user profile (from JWT)
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password_hash'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get profile', error: err.message });
  }
};
