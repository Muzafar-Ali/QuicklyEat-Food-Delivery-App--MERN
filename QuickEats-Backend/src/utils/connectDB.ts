import mongoose from "mongoose"
import config from "../config/config.js";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(config.dbUri as string);
    console.log(`MongoDB connected with ${connection.host}`);
    
    return connection.host;
    
  } catch (error) {
    console.log('DB connection :',error);
    process.exit(1);
  }
}