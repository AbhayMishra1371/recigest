import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB Connected");
      return mongoose;
    });
  }

  try {
    if (cached) {
      cached.conn = await cached.promise;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }

  return cached ? cached.conn : null;
}
