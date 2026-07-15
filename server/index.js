import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

import productRoutes from './routes/products.js';
import contactRoutes from './routes/contact.js';
import chatRoutes from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security & Middleware ---

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for local dev / 3D Canvas
}));

// Enable CORS — allow both possible Vite ports
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-production-url.com'
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Body parser, limit body size to prevent DOS
app.use(express.json({ limit: '10kb' }));

// Rate Limiting
const apiLimiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: { error: 'Too many requests from this IP, please try again in 15 minutes.' }
});

const formLimiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message: { error: 'Too many contact form submissions, please try again later.' }
});

// --- Routes ---
app.use('/api', apiLimiter);
app.use('/api/products', productRoutes);
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/chat', chatRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'An unexpected server error occurred.' });
});

// --- Start Server (if not in Vercel) ---
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Database Connection (non-blocking — server stays up regardless)
async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kitel';

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is unreachable
    });
    console.log('Connected to MongoDB Database: Kitel');
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL: MongoDB connection failed in production.', err.message);
      process.exit(1);
    } else {
      console.warn('WARNING: MongoDB is not running. The API will function but data will not persist.');
      console.warn('To enable persistence, start MongoDB or set MONGODB_URI in .env');
    }
  }
}

connectDB();

export default app;
