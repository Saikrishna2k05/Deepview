import express from 'express'
import userApp from './routes/userRoutes.js';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app=express();
const PORT=3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use('/user',userApp);

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
})