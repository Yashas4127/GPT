import express from "express"
import {login,logout,signup,profie} from "./controllers/useController.js"

const userRouter = express.Router();


// login , logout, signup, profile

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/signup", signup);
userRouter.get("/profile",profie);

export default userRouter;