import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToDatabase from './db/connectToDatabase.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app=express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});