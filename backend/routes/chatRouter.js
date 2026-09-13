//getRecentChat: top 20
//getSingleChat 
//createChat
//deleteChat

import express from "express"
import {deleteChat,createChat,getSingleChat,getRecentChat} from "../controllers/chatController.js"
import authUserMiddleware from "../middleware/authUserMiddleware.js";
import { fr } from "zod/locales";
const chatRouter=express.Router();
chatRouter.use(authUserMiddleware);
chatRouter.post("/createChat",createChat);
chatRouter.get("/getRecentChat",getRecentChat);
chatRouter.get("/:chatId",getSingleChat);
chatRouter.delete("/:chatId",deleteChat);

export default chatRouter;