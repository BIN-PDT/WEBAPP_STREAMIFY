import "dotenv/config";
import ms from "ms";

const settings = {
	PORT: process.env.PORT,
	MOGODB_URI: process.env.MONGODB_URI,
	SECRET_KEY: process.env.JWT_SECRET_KEY,
	ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
	ACCESS_TOKEN_EXPIRY_IN_MS: ms(process.env.JWT_ACCESS_TOKEN_EXPIRY),
	REFRESH_TOKEN_EXPIRY_IN_MS: ms(process.env.JWT_REFRESH_TOKEN_EXPIRY),
	GETSTREAM_API_KEY: process.env.GETSTREAM_API_KEY,
	GETSTREAM_API_SECRET: process.env.GETSTREAM_API_SECRET,
};

export default settings;
