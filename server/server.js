import express from 'express'
import userApp from './routes/userRoutes.js';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import blogApp from './routes/blogRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
const PORT=3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use('/user',userApp);
app.use('/blog',blogApp)

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
})