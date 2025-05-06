import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import SignupValidator from "../validators/signup.validator.js";
import SigninValidator from "../validators/signin.validator.js";

const router = Router();

router.post("/signup", SignupValidator, validationMiddleware, signup);

router.post("/signin", SigninValidator, validationMiddleware, signin);

router.get("/signout", signout);

export default router;
