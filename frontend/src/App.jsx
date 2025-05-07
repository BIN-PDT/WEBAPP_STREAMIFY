import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
	const { isLoading, authUser } = useAuthUser();
	const isAuthenticated = Boolean(authUser);
	const isOnboarded = authUser?.isOnboarded;

	if (isLoading) return <PageLoader />;
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						isAuthenticated && isOnboarded ? (
							<HomePage />
						) : (
							<Navigate
								to={
									!isAuthenticated ? "/signin" : "/onboarding"
								}
							/>
						)
					}
				/>
				<Route
					path="/signup"
					element={
						!isAuthenticated ? (
							<SignUpPage />
						) : (
							<Navigate to={isOnboarded ? "/" : "/onboarding"} />
						)
					}
				/>
				<Route
					path="/signin"
					element={
						!isAuthenticated ? (
							<SignInPage />
						) : (
							<Navigate to={isOnboarded ? "/" : "/onboarding"} />
						)
					}
				/>
				<Route
					path="/onboarding"
					element={
						isAuthenticated ? (
							!isOnboarded ? (
								<OnboardingPage />
							) : (
								<Navigate to="/" />
							)
						) : (
							<Navigate to="/signin" />
						)
					}
				/>
				<Route
					path="/notifications"
					element={
						isAuthenticated ? (
							<NotificationsPage />
						) : (
							<Navigate to="/signin" />
						)
					}
				/>
				<Route
					path="/chat"
					element={
						isAuthenticated ? (
							<ChatPage />
						) : (
							<Navigate to="/signin" />
						)
					}
				/>
				<Route
					path="/call"
					element={
						isAuthenticated ? (
							<CallPage />
						) : (
							<Navigate to="/signin" />
						)
					}
				/>
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
