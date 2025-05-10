import settings from "../configs/settings.config.js";
import APIResponse from "../common/APIResponse.js";
import UserService from "../services/user.service.js";
import { decodeToken } from "../utils/token.util.js";

export async function authenticateJWTMiddleware(req, res, next) {
	const accessToken = req.cookies[settings.ACCESS_TOKEN_COOKIE_KEY];

	if (!accessToken) {
		return new APIResponse(401, false)
			.setMessage("Unauthorized - No token provided.")
			.send(res);
	}

	const { data, error } = decodeToken(accessToken);
	if (error) return next(error);
	if (!data) {
		return new APIResponse(401, false)
			.setMessage("Unauthorized - Invalid token.")
			.send(res);
	}

	const user = await UserService.findById(data.sub).select("-password");
	if (!user) {
		return new APIResponse(401, false)
			.setMessage("Unauthorized - User not found.")
			.send(res);
	}

	req.user = user;
	next();
}
