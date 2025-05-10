import jwt from "jsonwebtoken";
import settings from "../configs/settings.config.js";

export function createToken(user) {
	const payload = { sub: user.id };
	const expiry = settings.ACCESS_TOKEN_EXPIRY;

	return jwt.sign(payload, settings.SECRET_KEY, { expiresIn: expiry });
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
