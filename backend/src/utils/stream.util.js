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

export function generateStreamToken(id) {
	const result = { data: null, error: null };
	try {
		result.data = streamClient.createToken(id);
	} catch (error) {
		result.error = error;
	}
	return result;
}
