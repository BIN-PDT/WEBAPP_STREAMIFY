import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import NoRecommendedUserFound from "./../components/NoRecommendedUserFound";
import RecommendedUserCard from "../components/RecommendedUserCard";
import {
	getOutgoingFriendRequests,
	getRecommendedUsers,
	sendFriendRequest,
} from "../common/api";
import { toastErrorMessage } from "../common/utils";

const HomePage = () => {
	const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());

	const queryClient = useQueryClient();
	const { isLoading: isLoadingUsers, data: users } = useQuery({
		queryKey: ["users"],
		queryFn: getRecommendedUsers,
		initialData: [],
	});
	const { data: outgoingFriendReqs } = useQuery({
		queryKey: ["outgoingFriendRequests"],
		queryFn: getOutgoingFriendRequests,
		initialData: [],
	});
	const { isPending, mutate: mutateSendFriendRequest } = useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ["outgoingFriendRequests"],
			}),
		onError: (error) => toastErrorMessage(error.response.data),
	});

	useEffect(() => {
		setOutgoingReqIds(
			new Set(outgoingFriendReqs.map((req) => req.recipient.id))
		);
	}, [outgoingFriendReqs]);

	return (
		<div className="p-4 sm:p-6 lg:p-8">
			<div className="container mx-auto space-y-10">
				{/* HEADER */}
				<div className="flex flex-row justify-between gap-4">
					<div>
						<h2 className="text-2xl sm:text-3xl font-lobster">
							Meet New Learners
						</h2>
						<p className="opacity-70 font-barlowCondensed italic">
							Discover perfect language exchange partners based on
							your profile
						</p>
					</div>
					<Link
						to="/friends"
						className="btn btn-outline btn-sm font-newAmsterdam tracking-wider !font-normal !px-5 !min-h-11"
					>
						<MessageSquare className="mr-2 size-4" />
						Chat With Friends
					</Link>
				</div>
				{/* USERS */}
				{isLoadingUsers ? (
					<div className="flex justify-center py-12">
						<span className="loading loading-spinner loading-lg" />
					</div>
				) : users.length === 0 ? (
					<NoRecommendedUserFound />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{users.map((user) => {
							user.hasReqSent = outgoingReqIds.has(user.id);
							return (
								<RecommendedUserCard
									key={user.id}
									user={user}
									isPending={isPending}
									handleSendFriendRequest={
										mutateSendFriendRequest
									}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
