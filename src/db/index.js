import mongoose from "mongoose";
import {DB_name} from "../constants.js";

const connectDB = async () => {
    try {
        // mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`).then(console.log("Connected..."))
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        console.log(`\n MongoDB connected!! DB HOST: ${process.env.MONGODB_URI}`);
    } catch (error) {
        console.log("mongoDB error", error);
        process.exit(1)
    }
}

export default connectDB;