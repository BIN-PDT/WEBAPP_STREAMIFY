import settings from "../configs/settings.config.js";
import APIResponse from "../utils/APIResponse.js";
import UserService from "../services/user.service.js";
import { createAuthTokenPair } from "../utils/token.util.js";

export async function signup(req, res) {
	const { cleanedData } = req;

	if (await UserService.findByEmail(cleanedData.email)) {
		return new APIResponse(400, false)
			.setMessage("Email already exists.")
			.send(res);
	}

	const newUser = await UserService.create(cleanedData);
	const tokenPair = createAuthTokenPair(newUser);

	res.cookie("jwt-access", tokenPair.accessToken, {
		maxAge: settings.ACCESS_TOKEN_EXPIRY_IN_MS,
		httpOnly: true, // PREVENT XSS ATTACK.
		sameSite: "strict", // PREVENT CRSF ATTACK.
		secure: process.env.NODE_ENV === "production",
	});
	res.cookie("jwt-refresh", tokenPair.refreshToken, {
		maxAge: settings.REFRESH_TOKEN_EXPIRY_IN_MS,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});

	return new APIResponse(201)
		.setMessage("Signed up successfully.")
		.setData({ user: newUser })
		.send(res);
}

export function signin(req, res) {}

export function signout(req, res) {}
