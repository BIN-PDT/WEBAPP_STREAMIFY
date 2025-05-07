import { Router } from "express";
import ErrorHandlerMiddleware from "../middlewares/error-handler.middleware.js";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use(ErrorHandlerMiddleware);

export default router;
