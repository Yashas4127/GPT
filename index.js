import express from "express";
import ConnectDb from "./config/database.js";
import dns from "node:dns";
import dotenv from "dotenv"
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js"
import cookieParser from "cookie-parser";



dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser())

app.use("/user",userRouter)
app.use("/msg",messageRouter)


const startServer=async()=>{
    try{
        await ConnectDb();
        app.listen(process.env.PORT,()=>{
            console.log("Server listing at 3000");
        }) 
    } 
    catch(err){
        console.log(err);
        }  
}
   
startServer();