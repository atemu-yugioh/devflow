import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return console.log("MongoDB Cloud is already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
