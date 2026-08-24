import jwt from "jsonwebtoken"
import User  from "../model/userSchema.js";
const authUserMiddleware= async(req,res,next)=>{
    try{
        const token =req.cookies;
        const payload=jwt.verify(token,process.env.JWT_KEY);

        const existingUser=await User.findById(payload._id);

        if(!existingUser){
            res.status(404).json({
                message:"User Does Not exits"
            })
        }
        req.user=existingUser
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server erorr"
        })
        
    }
    
}

export default authUserMiddleware