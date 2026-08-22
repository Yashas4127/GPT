import User from "../model/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// login
// logout
// signup
// profie


//Payload,secret key,expires
const createToken=(id,email)=>{
    if(! process.env.JWT_KEY){
        throw new Error("JWT Secret key is missing")
    }
    jwt.sign(
        {id,email},
        process.env.JWT_KEY,
        {expiresIn:"1h"})
}


//Cookies option
const cookieOption={
    httpOnly:true,
    secure:false,
    maxAge:60*60*1000
}


export const signup = async (req,res)=>{
    try{
        const {name,age,email,password}=req.body

        if(!name||!password ||!email|| !age){
           return res.status(400).json({
                message:"Some fileds are missing"
            })
        }
        //Same email wala exist nahi karta
        const user=await User.findOne({email});
        if(user){
            return res.status(409).json({
                message:"Email already exists"
            })
        }
        const hashPassword=await bcrypt.hash(password,12);

        const userCreated= await User.create({
            name,age,email,password:hashPassword
        });

        //create token
        const token=createToken(userCreated._id,email);
        
        res.cookie("token",token,cookieOption);

        res.status(201).json({
            message:"User Created succesfully",
            name,age,email
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal Error"
        })
        
    }
}


export const login  = async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!password ||!email){
           return res.status(400).json({
                message:"Some fileds are missing"
            })
        }

        //verify Password
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({
                message:"Invalid Credtials"
            })
        };

       
       const isMatch=await bcrypt.compare(password,existingUser.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid Credtials"
            })
        }
        const token=createToken(existingUser._id,email);

        res.cookie("token",token,cookieOption);

        res.status(200).json({
            message:"User Logged in SuccessFully",
            name: existingUser.name,
            age: existingUser.age,
            email: existingUser.email,
            usage: existingUser.usage
        });
    }
    catch{
        console.log(err);
        res.status(500).json({
            message:"Internal Error"
        })
    }
}

 
export const logout = async (req,res)=>{
    try{
          
    }
    catch{
        
    }
}

export const profile = async (req,res)=>{
    try{

    }
    catch{
        
    }
}