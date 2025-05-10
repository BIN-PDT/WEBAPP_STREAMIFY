import express from "express";
import cookieParser from "cookie-parser";

import settings from "./configs/settings.config.js";
import { frontendCORS } from "./configs/cors.config.js";
import connectDatabase from "./configs/database.config.js";
import router from "./routes/index.route.js";

const app = express();

if (process.env.NODE_ENV !== "production") app.use(frontendCORS);
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

app.listen(settings.PORT, async () => {
	console.log(`Server is running on port ${settings.PORT}.`);
	await connectDatabase();
});
