import RevokedToken from "../models/RevokedToken.js";

export class TokenService {
	static findOne(filter) {
		return RevokedToken.findOne(filter);
	}

	static create(data) {
		return RevokedToken.create(data);
	}
}
