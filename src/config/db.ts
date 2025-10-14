import mongoose from "mongoose";
import { DB_URI } from "./env";


const connectDB = async () => {
    try {
        await mongoose.connect( DB_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB