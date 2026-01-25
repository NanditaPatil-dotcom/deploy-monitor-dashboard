import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      autoIndex: env.NODE_ENV === "development",
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);

    // FAIL FAST — kill the process
    process.exit(1);
  }
};
