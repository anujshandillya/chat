import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToDatabase from './db/connectToDatabase.js';
import cors from 'cors';
import { app, server } from './socketIO/socket.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT,()=>{
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});