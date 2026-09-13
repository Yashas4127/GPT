import express from "express";
import dotenv from "dotenv/config"
import ConnectDb from "./config/database.js";
import dns from "node:dns";

import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js"
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chatRouter.js";


dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app=express();
app.use(express.json());
app.use(cookieParser())

app.use("/user",userRouter)
app.use("/msg",messageRouter)
app.use("/chat",chatRouter)

const startServer=async()=>{
    try{
        await ConnectDb();
        app.listen(process.env.PORT,()=>{
            console.log("Server listing at 5000");
        }) 
    } 
    catch(err){
        console.log(err);
        }  
}
   
startServer();


