import { axiosInstance } from "../configs/axios.config";

export async function signUp(data) {
	const res = await axiosInstance.post("/auth/signup", data);
	return res.data;
}
