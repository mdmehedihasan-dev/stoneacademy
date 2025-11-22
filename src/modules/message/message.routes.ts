import { Router } from "express";
import { auth } from "../../middleware/auth";
import { sendMessage, getMessages } from "./message.controller";

const router = Router();

//=================== Send a message ===================
router.post("/", auth, sendMessage);

//=================== Get messages for activity between users ===================
router.get("/", auth, getMessages);

export default router;
