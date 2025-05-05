import express from "express";
import "dotenv/config";

import router from "./routes/index.route.js";

const PORT = process.env.PORT;

const app = express();

app.use("/api", router);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
