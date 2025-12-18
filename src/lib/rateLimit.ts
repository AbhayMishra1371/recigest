import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis.
   *
   * @default "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});
