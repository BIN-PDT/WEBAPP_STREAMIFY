import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { authenticateJWTMiddleware } from "../middlewares/auth.middleware.js";
import SignupValidator from "../validators/signup.validator.js";
import SigninValidator from "../validators/signin.validator.js";
import OnboardValidator from "../validators/onboard.validator.js";

const router = Router();

router.post(
	"/signup",
	SignupValidator,
	validationMiddleware,
	controller.signup
);

router.post(
	"/signin",
	SigninValidator,
	validationMiddleware,
	controller.signin
);

router.post("/signout", authenticateJWTMiddleware, controller.signout);

router.post(
	"/onboarding",
	authenticateJWTMiddleware,
	OnboardValidator,
	validationMiddleware,
	controller.onboard
);

export default router;
