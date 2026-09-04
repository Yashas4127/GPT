import express from "express"
import authUserMiddleware from "../middleware/authUserMiddleware.js";
import { sendMessage,getMessage } from "../controllers/msgController.js";
const messageRouter = express.Router();

messageRouter.use(authUserMiddleware())
messageRouter.post("/",sendMessage)
messageRouter.get("/:chatId",getMessage);
messageRouter.post("/:chatId",sendMessage);
export default messageRouter