import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connection Established with mongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.error("Error in mongoDB connection. ", error);
    }
}