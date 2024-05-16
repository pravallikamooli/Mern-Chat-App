import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authrouter from './routes/auth.routes.js';
import MessageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDb from './db/connecttiMongoDb.js';


const app=express();

dotenv.config()
app.use(express.json())
app.use(cookieParser())

const PORT= process.env.PORT ||5000;

app.use("/api/auth/",authrouter)
app.use("/api/messages",MessageRoutes)
app.use("/api/users/",userRoutes)


app.listen(PORT,()=>{
    connectToMongoDb()
    console.log(`Server is running on port ${PORT}`)})