import express from "express"
import {login,logout,signup,profie} from "./controllers/useController.js"
import authUserMiddleware from "../middleware/authUserMiddleware.js";
const userRouter = express.Router();


// login , logout, signup, profile

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/signup", signup);
userRouter.get("/profile",authUserMiddleware,profie);

export default userRouter;