import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./configs/axios.config";

const App = () => {
	const { data: authData } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			const res = await axiosInstance.get("/auth/me");
			return res.data;
		},
		retry: false,
	});
	const authUser = authData?.data.user;

	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						authUser ? <HomePage /> : <Navigate to="/signin" />
					}
				/>
				<Route
					path="/signup"
					element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/signin"
					element={!authUser ? <SignInPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/onboarding"
					element={
						authUser ? (
							<OnboardingPage />
						) : (
							<Navigate to="/signin" />
						)
					}
				/>
				<Route
					path="/notifications"
					element={
						authUser ? (
							<NotificationsPage />
						) : (
							<Navigate to="/signin" />
						)
					}
				/>
				<Route
					path="/chat"
					element={
						authUser ? <ChatPage /> : <Navigate to="/signin" />
					}
				/>
				<Route
					path="/call"
					element={
						authUser ? <CallPage /> : <Navigate to="/signin" />
					}
				/>
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
