import { Router } from "express";
import { registerUser, loginUser, getMyProfile } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

// ============= Auth =====================
router.post("/register", registerUser);
router.post("/login", loginUser);

// ============== Profile ==================
router.get("/me", auth, getMyProfile);

export default router;
