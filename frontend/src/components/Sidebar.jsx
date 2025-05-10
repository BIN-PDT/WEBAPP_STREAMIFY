import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";
import Logo from "./Logo";
import useAuthUser from "../hooks/useAuthUser";

const Sidebar = () => {
	const { authUser } = useAuthUser();
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
			{/* LOGO */}
			<div className="mb-4 p-6">
				<Logo />
			</div>
			{/* USER PROFILE */}
			<div className="flex flex-col items-center gap-3">
				<div className="avatar">
					<div className="size-20">
						<img src={authUser.profilePic} alt="User Avatar" />
					</div>
				</div>
				<p className="font-barlowCondensed font-semibold">
					{authUser.fullName}
				</p>
			</div>
			{/* CHOICES */}
			<nav className="flex-1 p-5 space-y-3">
				<Link
					to="/"
					className={`sidebar-choice ${
						currentPath === "/" ? "btn-active" : ""
					}`}
				>
					<HomeIcon />
					<span>Home</span>
				</Link>

				<Link
					to="/friends"
					className={`sidebar-choice ${
						currentPath === "/friends" ? "btn-active" : ""
					}`}
				>
					<UsersIcon />
					<span>Friends</span>
				</Link>

				<Link
					to="/notifications"
					className={`sidebar-choice ${
						currentPath === "/notifications" ? "btn-active" : ""
					}`}
				>
					<BellIcon />
					<span>Notifications</span>
				</Link>
			</nav>
		</aside>
	);
};

export default Sidebar;
