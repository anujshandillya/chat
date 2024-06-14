import mongoose from "mongoose";

export default async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.URI, {
            dbName: "chat-app",
            bufferCommands: false,
        });
        console.log("Connected to database");
    } catch (error) {
        console.log(`Error encountered: ${error}`);
    }
}