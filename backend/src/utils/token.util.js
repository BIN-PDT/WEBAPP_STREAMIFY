import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import settings from "../configs/settings.config.js";

function createToken(user, type, expiry) {
	const payload = { type: type, sub: user.id, jti: uuidv4() };
	return jwt.sign(payload, settings.SECRET_KEY, { expiresIn: expiry });
}

export function createAuthToken(user, type) {
	const expiry =
		type === "access"
			? settings.ACCESS_TOKEN_EXPIRY
			: settings.REFRESH_TOKEN_EXPIRY;
	return createToken(user, type, expiry);
}

export function createAuthTokenPair(user) {
	return {
		accessToken: createAuthToken(user, "access"),
		refreshToken: createAuthToken(user, "refresh"),
	};
}

export function decodeToken(token) {
	const result = { data: null, error: null };
	try {
		result.data = jwt.verify(token, settings.SECRET_KEY);
	} catch (error) {
		result.error = error;
	}
	return result;
}
