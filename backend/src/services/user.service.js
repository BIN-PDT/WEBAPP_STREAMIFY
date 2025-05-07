import User from "../models/User.js";

class UserService {
	static find(filter) {
		return User.find(filter);
	}

	static findById(id) {
		return User.findById(id);
	}

	static findByEmail(email) {
		return User.findOne({ email });
	}

	static create(data) {
		const randIdx = Math.floor(Math.random() * 100) + 1;
		const randPic = `https://avatar.iran.liara.run/public/${randIdx}.png`;
		return User.create({ ...data, profilePic: randPic });
	}

	static findByIdAndUpdate(id, data, options) {
		return User.findByIdAndUpdate(id, data, options);
	}
}

export default UserService;
