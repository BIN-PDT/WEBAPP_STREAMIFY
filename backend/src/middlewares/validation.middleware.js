import { matchedData, validationResult } from "express-validator";
import APIResponse from "../utils/APIResponse.js";

function validationMiddleware(req, res, next) {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const errors = result.array().reduce((acc, err) => {
			const { location, path, msg } = err;

			acc[location] = acc[location] || {};
			acc[location][path] = acc[location][path] || [];
			acc[location][path].push(msg);

			return acc;
		}, {});

		return new APIResponse(400, false).setErrors(errors).send(res);
	}

	req.cleanedData = matchedData(req);
	next();
}

export default validationMiddleware;
