import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/onboarding" element={<OnboardingPage />} />
				<Route path="/signin" element={<SignInPage />} />
				<Route path="/notifications" element={<NotificationsPage />} />
				<Route path="/chat" element={<ChatPage />} />
				<Route path="/call" element={<CallPage />} />
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
