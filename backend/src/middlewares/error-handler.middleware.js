import APIResponse from "../common/APIResponse.js";

function ErrorHandlerMiddleware(err, req, res, next) {
	console.log(err);
	return new APIResponse(500, false)
		.setMessage("Whoops! Something went wrong.")
		.send(res);
}

export default ErrorHandlerMiddleware;
