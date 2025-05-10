import { Link } from "react-router";
import { Star } from "lucide-react";

const Logo = () => {
	return (
		<Link to="/" className="flex items-center justify-start gap-3">
			<Star className="size-8 text-primary" />
			<span className="text-3xl font-bold font-lobster bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
				Streamify
			</span>
		</Link>
	);
};

export default Logo;
