import { UsersIcon } from "lucide-react";

const NoRecommendedUserFound = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
				<UsersIcon className="size-8 text-base-content opacity-40" />
			</div>
			<h3 className="font-semibold text-lg mb-2 font-newAmsterdam tracking-wider">
				No recommendations available
			</h3>
			<p className="text-base-content opacity-70 font-barlowCondensed italic">
				Check back later for new language partners!
			</p>
		</div>
	);
};

export default NoRecommendedUserFound;
