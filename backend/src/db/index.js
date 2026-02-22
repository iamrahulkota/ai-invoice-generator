import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "../constants.js";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${DB_URL}/${DB_NAME}`);
        console.log(`\n Mongoose connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGOOSE CONNECTION ERORR >>>", error);
        process.exit(1);
    }
};