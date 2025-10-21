import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import adminPostRoutes from './routes/adminPosts.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { getUploadsDirectory } from './middleware/upload.js';

const app = express();

// Global middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || process.env.CLIENT_URL || '*',
    credentials: true
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads directory
app.use('/uploads', express.static(getUploadsDirectory()));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin/posts', adminPostRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Modifica la variabile PORT nel file .env o chiudi il processo che la sta occupando.`);
      } else {
        console.error('❌ Server start error:', err);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Unable to start server due to MongoDB connection failure:', error);
    process.exit(1);
  }
};

startServer();
