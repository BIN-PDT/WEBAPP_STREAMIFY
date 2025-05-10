import settings from "../configs/settings.config.js";

export function setTokenToCookies(res, value) {
	res.cookie(settings.ACCESS_TOKEN_COOKIE_KEY, value, {
		maxAge: settings.ACCESS_TOKEN_EXPIRY_IN_MS,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});
}

export function delTokenOfCookies(res) {
	res.clearCookie(settings.ACCESS_TOKEN_COOKIE_KEY);
}
