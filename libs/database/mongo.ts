import mongoose from "mongoose";

const MONGOOSE_URL = process.env.MONGO_CONNECTION?.replace(
  "<db_password>",
  process.env.MONGO_PASSWORD as string
) as string;
console.log(MONGOOSE_URL);

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}
if (!MONGOOSE_URL) {
  throw new Error("please define mongo URL");
}

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    try {
      cached.promise = mongoose
        .connect(MONGOOSE_URL)
        .then((mongoose) => mongoose.connection);
      cached.conn = await cached.promise;
    } catch (error) {
      throw new Error("failed to connect mongo");
    }
  }

  return cached.conn;
}
