
// const cors=require('cors')
// const cookieParser=require('cookie-parser')
// // const express=require('express')
// // const app=express();
// const {app,server} =require('./socket/socket')
// const { connectMongoDb } = require('./config/database')

// if(process.env.NODE_ENV !== "production"){
//     require("dotenv").config({path:"server/config/config.env"})
// }
// //using middlewares
// app.use(cors());
// app.use(cookieParser());
// app.use(app.json());
// app.use(app.urlencoded({extended:true}));   

    
// //import Routes
// const authRoutes =require('./routes/authRoutes')
// const messageRoutes =require('./routes/messageRoutes')
// const userRoutes=require('./routes/userRoutes')
// //auth Routes
// app.use("/api/v1",authRoutes)
// app.use("/api/v1/message",messageRoutes)
// app.use("/api/v1/users",userRoutes)

// server.listen(process.env.PORT,()=>{
//     connectMongoDb();
//     console.log(`Server is running on http://localhost:${process.env.PORT}`)
// })

// module.exports=app;


// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";
// import { app, server } from "./socket/socket.js";

// dotenv.config();

// const __dirname = path.resolve();
// // PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
// const PORT = process.env.PORT || 5000;

// app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// server.listen(PORT, () => {
// 	connectToMongoDB();
// 	console.log(`Server Running on port ${PORT}`);
// });