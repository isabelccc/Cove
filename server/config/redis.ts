import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Redis client configuration for rate limiting
 * Uses sliding window algorithm for accurate rate limiting
 */
let redisClient: Redis | null = null;

export const getRedisClient = (): Redis | null => {
  if (redisClient) {
    return redisClient;
  }

  // If Redis URL is not provided, return null (caller logs once; in-memory rate limit is fine for local dev)
  if (!process.env.REDIS_URL?.trim()) {
    return null;
  }

  try {
    redisClient = new Redis(process.env.REDIS_URL, {
      // Connection options
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      // Enable ready check
      enableReadyCheck: true,
      // Reconnect on error
      reconnectOnError: (err: Error) => {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          return true; // Reconnect when Redis is in readonly mode
        }
        return false;
      },
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected for rate limiting');
    });

    redisClient.on('error', (err: Error) => {
      console.error('❌ Redis connection error:', err.message);
      // Don't throw - allow fallback to in-memory store
    });

    redisClient.on('close', () => {
      console.warn('⚠️  Redis connection closed');
    });

    redisClient.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });

    return redisClient;
  } catch (error) {
    console.error('❌ Failed to create Redis client:', error);
    return null;
  }
};

export const closeRedisConnection = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    console.log('✅ Redis connection closed');
  }
};
