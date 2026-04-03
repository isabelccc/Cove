import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import dotenv from 'dotenv';
import { metricsHandler } from './utils/metrics.js';
import { metricsMiddleware } from './middleware/metrics.js';
import { getRedisClient } from './config/redis.js';
dotenv.config();

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
import groupRoutes from './routes/groups.js';
import healthRouter from './routes/health.js';

const app = express();

// Get Redis client for rate limiting
const redisClient = getRedisClient();

if (redisClient) {
  console.log('✅ Rate limiting: Redis (shared across instances, sliding window)');
} else if (process.env.NODE_ENV === 'production') {
  console.warn(
    '⚠️  REDIS_URL not set: rate limits use in-memory storage (not shared across servers / replicas). Set REDIS_URL in production.',
  );
} else {
  console.log('Rate limiting: in-memory (local dev). Set REDIS_URL to use Redis.');
}

// Helper function to create rate limiter with Redis store (sliding window)
const createRateLimiter = (max: number, windowMs: number, message?: string) => {
  const config: any = {
    windowMs,
    max,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: message || `Too many requests from this IP, please try again after ${Math.round(windowMs / 60000)} minutes.`,
  };

  if (redisClient) {
    config.store = new RedisStore({
      sendCommand: async (...args: (string | number)[]): Promise<any> => {
        const [command, ...commandArgs] = args;
        return redisClient!.call(command as string, ...commandArgs);
      },
      prefix: 'rl:',
    });
  }

  return rateLimit(config);
};

// Rate limiting for authentication endpoints (stricter - prevents brute force)
const authLimiter = createRateLimiter(
  5, // 5 requests
  15 * 60 * 1000, // per 15 minutes
  'Too many authentication attempts from this IP, please try again after 15 minutes.'
);

// Rate limiting for write operations (creating, updating, deleting posts)
const writeLimiter = createRateLimiter(
  50, // 50 requests
  15 * 60 * 1000, // per 15 minutes
  'Too many write requests from this IP, please try again after 15 minutes.'
);

// Rate limiting for read operations (getting posts)
const readLimiter = createRateLimiter(
  100, // 100 requests
  1 * 60 * 1000, // per 1 minute (more lenient for reads)
  'Too many read requests from this IP, please try again after 1 minute.'
);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(metricsMiddleware);

app.get('/', (_req, res) => {
  res.json({
    service: 'cove-api',
    health: '/health',
    hint: 'JSON API only — open the React app (e.g. http://localhost:3000) for the web UI.',
  });
});

app.use('/health', healthRouter);

// Apply rate limiting to authentication routes
app.post('/user/signin', authLimiter);
app.post('/user/signup', authLimiter);
app.post('/user/google', authLimiter);

// Apply rate limiting to posts routes
// Read operations (GET) - more lenient
app.get('/posts', readLimiter);
app.get('/posts/search', readLimiter);
app.get('/posts/creator', readLimiter);
app.get('/posts/:id', readLimiter);

app.get('/groups/mine', readLimiter);
app.get('/groups/:id', readLimiter);
app.post('/groups', writeLimiter);
app.post('/groups/join', writeLimiter);

// Write operations (POST, PATCH, DELETE) - stricter
app.post('/posts', writeLimiter);
app.patch('/posts/:id', writeLimiter);
app.delete('/posts/:id', writeLimiter);
app.post('/posts/:id/commentPost', writeLimiter);
app.patch('/posts/:id/comment/:commentId', writeLimiter);
app.delete('/posts/:id/comment/:commentId', writeLimiter);
app.patch('/posts/:id/likePost', writeLimiter);

// Mount routes (rate limiters are applied above, routes handle the actual logic)
app.use('/posts', postRoutes);
app.use('/groups', groupRoutes);
app.use('/user', userRouter);
app.get('/metrics', metricsHandler);
const PORT = process.env.PORT || 5001;

// Start server (Prisma connection is handled automatically when first query is made)
app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
});
