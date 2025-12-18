import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from './redis';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 60, // per 60 seconds by default
});

export const rateLimit = async (key: string) => {
  try {
    await rateLimiter.consume(key);
    return { success: true };
  } catch (rejRes) {
    return { success: false };
  }
};
