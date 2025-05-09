import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import FriendsPage from "./pages/FriendsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
	const { theme } = useThemeStore();
	const { isLoading, authUser } = useAuthUser();
	const isAuthenticated = Boolean(authUser);
	const isOnboarded = authUser?.isOnboarded;

	if (isLoading) return <PageLoader />;
	return (
		<div className="min-h-screen" data-theme={theme}>
			<Routes>
				<Route
					path="/"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showSidebar={true}>
								<HomePage />
							</Layout>
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
					path="/friends"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showSidebar={true}>
								<FriendsPage />
							</Layout>
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
					path="/notifications"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showSidebar={true}>
								<NotificationsPage />
							</Layout>
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
					path="/chat/:id"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout>
								<ChatPage />
							</Layout>
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
					path="/call/:id"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout>
								<CallPage />
							</Layout>
						) : (
							<Navigate
								to={
									!isAuthenticated ? "/signin" : "/onboarding"
								}
							/>
						)
					}
				/>
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
