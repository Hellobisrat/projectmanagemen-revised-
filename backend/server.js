import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './route/userRoute.js';
import dbConnect from './config/db.js';
import taskRouter from './route/taskRoute.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter);
app.use('/api/tasks',taskRouter)
app.get('/',(req,res)=>{
  res.json('well come to Home')
})
app.listenerCount(PORT,()=>{
  dbConnect();
  console.log(`app start listening at http://localhost:${PORT}`)
})