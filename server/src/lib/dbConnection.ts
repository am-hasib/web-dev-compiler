
import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, { dbName: "web-compiler" });
    console.log(`Connection Established with mongodb`)
  } catch (error) {
    console.log(`Error to Establised a connection with Database`, error);
  }
};
