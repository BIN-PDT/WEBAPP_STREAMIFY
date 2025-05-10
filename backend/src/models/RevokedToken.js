import mongoose from "mongoose";

const schema = new mongoose.Schema({
	jti: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: true,
	},
	expiresAt: {
		type: mongoose.Schema.Types.Date,
		index: { expires: "0s" },
	},
});

const RevokedToken = mongoose.model("RevokedToken", schema);

export default RevokedToken;
