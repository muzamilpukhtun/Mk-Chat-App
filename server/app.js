const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const app=express();

    require("dotenv").config({path:"server/config/config.env"})


//using middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));   


//import Routes
const authRoutes =require('./routes/authRoutes')
const messageRoutes =require('./routes/messageRoutes')
const userRoutes=require('./routes/userRoutes')
//auth Routes
app.use("/api/v1",authRoutes)
app.use("/api/v1/message",messageRoutes)
app.use("/api/v1/users",userRoutes)


module.exports=app;