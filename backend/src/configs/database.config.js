import mongoose from "mongoose";
import settings from "./settings.config.js";

async function connectDatabase() {
	try {
		const conn = await mongoose.connect(settings.MOGODB_URI);
		console.log("MongoDB connected successfully!", conn.connection.host);
	} catch (error) {
		console.log("MongoDB connected unsuccessfully!", error);
		process.exit(1);
	}
}

export default connectDatabase;
