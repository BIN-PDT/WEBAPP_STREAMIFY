import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import settings from "../configs/settings.config.js";
import { TokenService } from "../services/token.service.js";

export function createToken(user) {
	const payload = { jti: uuid(), sub: user.id };
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

export function revokeToken(payload) {
	const data = { jti: payload.jti, expiresAt: new Date(payload.exp * 1000) };
	return TokenService.create(data);
}

export function checkRevocation(jti) {
	return TokenService.findOne({ jti });
}
