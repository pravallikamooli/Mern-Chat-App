import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'

import authrouter from './routes/auth.routes.js';
import MessageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDb from './db/connecttiMongoDb.js';
import { app,server } from './Socket/Socket.js';

app.use(express.json())
app.use(cookieParser())

const PORT= process.env.PORT ||5000;
const __dirname=path.resolve()
dotenv.config()



app.use("/api/auth",authrouter)
app.use("/api/messages",MessageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/Frontend/dist")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,()=>{
    connectToMongoDb()
    console.log(`Server is running on port ${PORT}`)})

    // server.js

