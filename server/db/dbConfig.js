import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to MongoDB`);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
  }
};


