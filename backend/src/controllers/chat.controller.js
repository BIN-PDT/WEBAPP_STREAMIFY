import APIResponse from "../common/APIResponse.js";
import { generateStreamToken } from "../utils/stream.util.js";

export function getStreamToken(req, res) {
	const { user } = req;

	const token = generateStreamToken(user.id);

	return new APIResponse(200).setData({ token }).send(res);
}
