import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

let cached = (global as any).mongoose || { con: null, promise: null };

export const Connect = async () => {
  if (cached.con) return cached.con;
  if (!URI) throw new Error("URI empty!!!");

  cached.promise =
    cached.promise ||
    mongoose.connect(URI, {
      dbName: "chat",
      bufferCommands: false,
    });

  cached.con = await cached.promise;

  return cached.con;
};
