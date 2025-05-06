import { Router } from "express";
import ErrorHandlerMiddleware from "../middlewares/error-handler.middleware.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use(ErrorHandlerMiddleware);

export default router;
