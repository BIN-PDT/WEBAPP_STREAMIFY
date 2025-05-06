import settings from "../configs/settings.config.js";

export function setAuthTokenToCookies(res, key, value) {
	const expiry =
		key === "jwt-access"
			? settings.ACCESS_TOKEN_EXPIRY_IN_MS
			: settings.REFRESH_TOKEN_EXPIRY_IN_MS;

	res.cookie(key, value, {
		maxAge: expiry,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});
}

export function setAuthTokenPairToCookies(res, tokenPair) {
	setAuthTokenToCookies(res, "jwt-access", tokenPair.accessToken);
	setAuthTokenToCookies(res, "jwt-refresh", tokenPair.refreshToken);
}

export function removeAuthTokenOfCookies(res, key) {
	res.clearCookie(key);
}

export function removeAuthTokenPairOfCookies(res) {
	removeAuthTokenOfCookies(res, "jwt-access");
	removeAuthTokenOfCookies(res, "jwt-refresh");
}
