import streamClient from "../configs/stream.config.js";

export async function upsertStreamUser(data) {
	const result = { data: null, error: null };
	try {
		result.data = await streamClient.upsertUser(data);
	} catch (error) {
		result.error = error;
	}
	return result;
}
