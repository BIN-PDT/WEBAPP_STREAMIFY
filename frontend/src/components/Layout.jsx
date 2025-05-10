import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({
	children,
	showSidebar = false,
	constraintWindow = false,
}) => {
	return (
		<div className="min-h-screen">
			<div className="flex">
				{/* SIDEBAR */}
				{showSidebar && <Sidebar />}

				<div className="flex-1 flex flex-col">
					{/* NAVBAR */}
					<Navbar />
					{/* DISPLAY */}
					<main
						className={`flex-1 min-h-[calc(100vh-72px)] ${
							constraintWindow ? "max-h-[calc(100vh-72px)]" : ""
						}`}
					>
						{children}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
