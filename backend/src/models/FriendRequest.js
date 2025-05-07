import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

schema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = doc._id;
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

const FriendRequest = mongoose.model("FriendRequest", schema);

export default FriendRequest;
