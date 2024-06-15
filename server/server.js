import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToDatabase from './db/connectToDatabase.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT,()=>{
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});