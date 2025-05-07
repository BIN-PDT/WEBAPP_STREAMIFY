import { Router } from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import { authenticateJWTMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/token", authenticateJWTMiddleware, getStreamToken);

export default router;
