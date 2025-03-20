import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

// Global cache to prevent multiple connections
let cached = global.mongoose || { conn: null, promise: null};

const dbConnect = async () => {

    // return existing connection
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {});
    }

    cached.conn = await cached.promise;

    // cache the connection
    global.mongoose = cached;

    return cached.conn;
};

export default dbConnect;
