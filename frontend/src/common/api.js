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

export async function getRecommendedUsers() {
	const res = await axiosInstance.get("/users");
	const resData = res.data;
	return resData.data;
}

export async function getUserFriends() {
	const res = await axiosInstance.get("/users/friends");
	const resData = res.data;
	return resData.data;
}

export async function getFriendRequests() {
	const res = await axiosInstance.get("/users/friends/requests");
	const resData = res.data;
	return resData.data;
}

export async function getOutgoingFriendRequests() {
	const res = await axiosInstance.get("/users/friends/outgoing-requests");
	const resData = res.data;
	return resData.data;
}

export async function sendFriendRequest(id) {
	const res = await axiosInstance.post(`/users/friends/requests/${id}/send`);
	return res.data;
}

export async function acceptFriendRequest(id) {
	const res = await axiosInstance.put(`/users/friends/requests/${id}/accept`);
	return res.data;
}

export async function getStreamToken() {
	const res = await axiosInstance.get("/chat/token");
	const resData = res.data;
	return resData.data;
}
