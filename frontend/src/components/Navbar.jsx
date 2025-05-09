import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon } from "lucide-react";
import Logo from "./Logo";
import ThemeSelector from "./ThemeSelector";
import useSignOut from "./../hooks/useSignOut";

const Navbar = () => {
	const location = useLocation();
	const isChatPage = location.pathname?.startsWith("/chat");

	const { mutateSignOut } = useSignOut();

	return (
		<nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-[72px] flex items-center">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-end w-full gap-1.5">
					{/* LOGO - ONLY IN THE CHAT PAGE */}
					{isChatPage && (
						<div className="pl-5">
							<Logo />
						</div>
					)}
					{/* NOTIFICATION */}
					<div className="flex items-center gap-3 sm:gap-4 ml-auto">
						<Link to="/notifications">
							<button className="navbar-choice">
								<BellIcon />
							</button>
						</Link>
					</div>
					{/* THEME */}
					<ThemeSelector />
					{/* LOGOUT BUTTON */}
					<button className="navbar-choice" onClick={mutateSignOut}>
						<LogOutIcon />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
