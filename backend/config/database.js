import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const ConnectDb=async()=>{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");

}
export default ConnectDb