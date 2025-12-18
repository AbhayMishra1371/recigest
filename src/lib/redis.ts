import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

if (!process.env.NEXT_RUNTIME) { // Prevent connection in build time or edge if not needed, though usually safe
    redisClient.connect();
} else {
    // For Next.js dev hot reloading, we might want a global singleton to avoid too many connections
    // But for simplicity in this task, direct connection is okay, or use a global variable pattern
}

// Singleton pattern for Next.js to prevent multiple connections in dev mode
declare global {
  var redis: ReturnType<typeof createClient> | undefined;
}

const client = global.redis || redisClient;

if (process.env.NODE_ENV !== 'production') {
    if (!global.redis) {
       global.redis = client;
       client.connect(); // Connect only if not already connected (effectively)
    }
} else {
    // In production, just connect
    if (!client.isOpen) client.connect();
}

export default client;
