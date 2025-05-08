import APIResponse from "../common/APIResponse.js";
import UserService from "../services/user.service.js";
import FriendService from "../services/friend.service.js";

export async function getRecommendedUsers(req, res) {
	const { user } = req;

	const recommendedUsers = await UserService.find({
		$and: [
			{ isOnboarded: true },
			{ _id: { $ne: user.id } },
			{ _id: { $nin: user.friends } },
		],
	});

	return new APIResponse(200).setData(recommendedUsers).send(res);
}

export async function getMyFriends(req, res) {
	const { user } = req;

	const { friends } = await user.populate(
		"friends",
		"fullName profilePic nativeLanguage learningLanguage"
	);

	return new APIResponse(200).setData(friends).send(res);
}

export async function getOutgoingFriendRequests(req, res) {
	const { user } = req;

	const outgoingRequests = await FriendService.findWithPopulate(
		{
			sender: user.id,
			status: "pending",
		},
		["recipient", "fullName profilePic nativeLanguage learningLanguage"]
	);

	return new APIResponse(200).setData(outgoingRequests).send(res);
}

export async function getFriendRequests(req, res) {
	const { user } = req;

	const incomingRequests = await FriendService.findWithPopulate(
		{
			recipient: user.id,
			status: "pending",
		},
		["sender", "fullName profilePic nativeLanguage learningLanguage"]
	);
	const acceptedRequests = await FriendService.findWithPopulate(
		{
			sender: user.id,
			status: "accepted",
		},
		["recipient", "fullName profilePic"]
	);

	return new APIResponse(200)
		.setData({ incomingRequests, acceptedRequests })
		.send(res);
}

export async function sendFriendRequest(req, res) {
	const {
		user,
		params: { id: recipientId },
	} = req;

	if (user.id === recipientId) {
		return new APIResponse(400, false)
			.setMessage("You can't send friend request to yourself.")
			.send(res);
	}

	if (user.friends.includes(recipientId)) {
		return new APIResponse(400, false)
			.setMessage("You are already friend with this user.")
			.send(res);
	}

	const existRecipient = await UserService.findById(recipientId);
	if (!existRecipient) {
		return new APIResponse(404, false)
			.setMessage("Recipient not found.")
			.send(res);
	}

	const existRequest = await FriendService.findOne({
		$or: [
			{ sender: user.id, recipient: recipientId },
			{ sender: recipientId, recipient: user.id },
		],
	});
	if (existRequest) {
		return new APIResponse(400, false)
			.setMessage("A friend request of you and this user already exists.")
			.send(res);
	}

	const friendRequest = await FriendService.create({
		sender: user.id,
		recipient: recipientId,
	});

	return new APIResponse(201)
		.setMessage("Sended friend request successfully.")
		.setData(friendRequest)
		.send(res);
}

export async function acceptFriendRequest(req, res) {
	const {
		user,
		params: { id: requestId },
	} = req;

	const existRequest = await FriendService.findById(requestId);
	if (!existRequest) {
		return new APIResponse(404, false)
			.setMessage("Friend request not found.")
			.send(res);
	}

	if (existRequest.recipient.toString() !== user.id) {
		return new APIResponse(403, false)
			.setMessage("You aren't authorized to accept this request.")
			.send(res);
	}

	if (existRequest.status === "accepted") {
		return new APIResponse(400, false)
			.setMessage("This friend request already accepted.")
			.send(res);
	}

	existRequest.status = "accepted";
	await existRequest.save();

	await UserService.findByIdAndUpdate(existRequest.sender, {
		$addToSet: { friends: existRequest.recipient },
	});
	await UserService.findByIdAndUpdate(existRequest.recipient, {
		$addToSet: { friends: existRequest.sender },
	});

	return new APIResponse(200)
		.setMessage("Accepted friend request successfully.")
		.send(res);
}
