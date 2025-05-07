import FriendRequest from "../models/FriendRequest.js";

class FriendService {
	static find(filter) {
		return FriendRequest.find(filter);
	}

	static findOne(filter) {
		return FriendRequest.findOne(filter);
	}

	static findById(id) {
		return FriendRequest.findById(id);
	}

	static create(data) {
		return FriendRequest.create(data);
	}

	static findWithPopulate(filter, populate) {
		return FriendRequest.find(filter).populate(...populate);
	}
}

export default FriendService;
