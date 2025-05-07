import APIResponse from "../utils/APIResponse.js";
import UserService from "../services/user.service.js";

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
