import bcrypt from "bcryptjs";

export async function hashPassword(plain) {
	const salt = await bcrypt.genSalt();
	return bcrypt.hash(plain, salt);
}
