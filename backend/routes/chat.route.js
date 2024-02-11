import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { createChat, getChats, sendMessage, getChat } from "../controllers/chat.controllers.js";

const router = Router();

router.post("/", verifyToken, createChat);
router.get("/", verifyToken, getChats);
router.post("/:id", verifyToken, sendMessage);
router.get("/:id", verifyToken, getChat);

export default router;
