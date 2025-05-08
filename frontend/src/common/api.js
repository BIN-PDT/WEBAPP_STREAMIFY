import { axiosInstance } from "../configs/axios.config";

export async function getAuthUser() {
	try {
		const res = await axiosInstance.get("/auth/me");
		return res.data;
	} catch (error) {
		return null;
	}
}

export async function signUp(data) {
	const res = await axiosInstance.post("/auth/signup", data);
	return res.data;
}

export async function signIn(data) {
	const res = await axiosInstance.post("/auth/signin", data);
	return res.data;
}

export async function signOut() {
	const res = await axiosInstance.post("/auth/signout");
	return res.data;
}

export async function completeOnboarding(data) {
	const res = await axiosInstance.post("/auth/onboarding", data);
	return res.data;
}
