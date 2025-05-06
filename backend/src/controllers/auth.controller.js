import APIResponse from "../utils/APIResponse.js";
import UserService from "../services/user.service.js";
import { createAuthTokenPair } from "../utils/token.util.js";
import * as cookiesUtils from "../utils/cookies.util.js";
import { upsertStreamUser } from "../utils/stream.util.js";

export async function signup(req, res, next) {
	const { cleanedData } = req;

	if (await UserService.findByEmail(cleanedData.email)) {
		return new APIResponse(400, false)
			.setMessage("Email already exists.")
			.send(res);
	}

	const newUser = await UserService.create(cleanedData);
	const { error } = await upsertStreamUser({
		id: newUser.id,
		name: newUser.fullName,
		image: newUser.profilePic,
	});
	if (error) return next(error);

	const tokenPair = createAuthTokenPair(newUser);
	cookiesUtils.setAuthTokenPairToCookies(res, tokenPair);

	return new APIResponse(201)
		.setMessage("Signed up successfully.")
		.setData({ user: newUser })
		.send(res);
}

export async function signin(req, res) {
	const { cleanedData } = req;

	const existUser = await UserService.findByEmail(cleanedData.email);
	if (!existUser || !(await existUser.matchPassword(cleanedData.password))) {
		return new APIResponse(401, false)
			.setMessage("Invalid credentails.")
			.send(res);
	}

	const tokenPair = createAuthTokenPair(existUser);
	cookiesUtils.setAuthTokenPairToCookies(res, tokenPair);

	return new APIResponse(200)
		.setMessage("Signed in successfully.")
		.setData({ user: existUser })
		.send(res);
}

export function signout(req, res) {
	cookiesUtils.removeAuthTokenPairOfCookies(res);

	return new APIResponse(200)
		.setMessage("Signed out successfully.")
		.send(res);
}
