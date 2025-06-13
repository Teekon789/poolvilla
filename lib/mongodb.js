import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('กรุณากำหนดค่า MONGODB_URI ใน .env file');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ เชื่อมต่อ MongoDB สำเร็จ');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    throw error;
  }
}