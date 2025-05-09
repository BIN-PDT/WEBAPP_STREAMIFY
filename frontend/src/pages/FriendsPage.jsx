import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "./../components/NoFriendFound";
import { getUserFriends } from "../common/api";

const FriendsPage = () => {
	const { isLoading, data: friends } = useQuery({
		queryKey: ["friends"],
		queryFn: getUserFriends,
		initialData: [],
	});

	return (
		<div className="p-4 sm:p-6 lg:p-8">
			<div className="container mx-auto space-y-10">
				{/* HEADER */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<h2 className="text-2xl sm:text-3xl font-lobster">
						Your Friends
					</h2>
					<Link
						to="/"
						className="btn btn-outline btn-sm font-newAmsterdam tracking-wider !font-normal !px-5 !min-h-11"
					>
						<UsersIcon className="mr-2 size-4" />
						More Friends
					</Link>
				</div>
				{/* FRIENDS */}
				{isLoading ? (
					<div className="flex justify-center py-12">
						<span className="loading loading-spinner loading-lg" />
					</div>
				) : friends.length === 0 ? (
					<NoFriendsFound />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{friends.map((friend) => (
							<FriendCard key={friend.id} friend={friend} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendsPage;
