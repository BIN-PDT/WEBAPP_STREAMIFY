import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../utils/password.util.js";

const schema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		bio: {
			type: String,
			default: "",
		},
		profilePic: {
			type: String,
			default: "",
		},
		nativeLanguage: {
			type: String,
			default: "",
		},
		learningLanguage: {
			type: String,
			default: "",
		},
		location: {
			type: String,
			default: "",
		},
		isOnboarded: {
			type: Boolean,
			default: false,
		},
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

schema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = doc._id;
		delete ret._id;
		delete ret.__v;
		delete ret.createdAt;
		delete ret.updatedAt;
		delete ret.password;
		return ret;
	},
});

schema.methods.matchPassword = function (plain) {
	return comparePassword(plain, this.password);
};

schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		this.password = await hashPassword(this.password);
		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model("User", schema);

export default User;
