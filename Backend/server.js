import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';

import authRoutes from './routes/auth.js';
import artworkRoutes from './routes/artworks.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import reportRoutes from './routes/reports.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synchronized.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
