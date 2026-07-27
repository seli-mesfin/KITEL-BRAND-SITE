import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Safely load dotenv only if not in Vercel (Vercel injects env vars automatically)
if (process.env.VERCEL !== '1') {
  dotenv.config();
}

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

import { MongoMemoryServer } from 'mongodb-memory-server';

// --- Database Connection (Serverless Optimized) ---
let cachedDb = null;

async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL: MONGODB_URI environment variable is missing in production.');
    }
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    };
    
    cachedDb = await mongoose.connect(MONGODB_URI, opts);
    console.log('Connected to MongoDB Database: Kitel');
    return cachedDb;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

// Ensure database connects before handling API requests on serverless
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
    } catch (e) {
      return res.status(500).json({ error: 'Database connection failed. Please try again shortly.' });
    }
  }
  next();
});

connectDB();

export default app;
