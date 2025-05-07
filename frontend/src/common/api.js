import { axiosInstance } from "../configs/axios.config";

export async function getAuthUser() {
	const res = await axiosInstance.get("/auth/me");
	return res.data;
}

export async function signUp(data) {
	const res = await axiosInstance.post("/auth/signup", data);
	return res.data;
}

export async function completeOnboarding(data) {
	const res = await axiosInstance.post("/auth/onboarding", data);
	return res.data;
}
