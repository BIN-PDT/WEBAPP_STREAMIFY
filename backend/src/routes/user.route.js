import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { authenticateJWTMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticateJWTMiddleware);

router.get("/", controller.getRecommendedUsers);

router.get("/friends", controller.getMyFriends);

router.get("/friends/outgoing-requests", controller.getOutgoingFriendRequests);

router.get("/friends/requests", controller.getFriendRequests);

router.post("/friends/requests/:id/send", controller.sendFriendRequest);

router.put("/friends/requests/:id/accept", controller.acceptFriendRequest);

export default router;
