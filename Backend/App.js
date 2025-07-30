// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env variables
dotenv.config();

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const commentRoutes = require('./routes/commentRoutes');
const followRoutes = require('./routes/followRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Optional: custom error middleware
// const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route prefixes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/upload', uploadRoutes);

// (Optional) Root route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Inkspira API!" });
});

// Error handling middleware (should be last)
// app.use(errorMiddleware);

module.exports = app;
