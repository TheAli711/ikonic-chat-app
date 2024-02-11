import { Router } from "express";
import { getProfile, login, signup } from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

export default router;
