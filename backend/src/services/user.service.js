import User from "../models/User.js";

class UserService {
	static findByEmail(email) {
		return User.findOne({ email });
	}

	static create(data) {
		const randIdx = Math.floor(Math.random() * 100) + 1;
		const randPic = `https://avatar.iran.liara.run/public/${randIdx}.png`;
		return User.create({ ...data, profilePic: randPic });
	}
}

export default UserService;
