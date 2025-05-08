import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	CheckCircleIcon,
	MapPinIcon,
	UserPlusIcon,
	UsersIcon,
} from "lucide-react";
import {
	getOutgoingFriendRequests,
	getRecommendedUsers,
	getUserFriends,
	sendFriendRequest,
} from "../common/api";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "./../components/NoFriendFound";
import NoRecommendedUserFound from "./../components/NoRecommendedUserFound";
import { capitialize } from "./../common/utils";

const HomePage = () => {
	const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());

	const queryClient = useQueryClient();
	const { isLoading: isLoadingFriends, data: friends } = useQuery({
		queryKey: ["friends"],
		queryFn: getUserFriends,
		initialData: [],
	});
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
	});

	useEffect(() => {
		setOutgoingReqIds(
			new Set(outgoingFriendReqs.map((req) => req.recipient.id))
		);
	}, [outgoingFriendReqs]);

	return (
		<div className="p-4 sm:p-6 lg:p-8">
			<div className="container mx-auto space-y-10">
				{/* FRIEND HEADER */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
						Your Friends
					</h2>
					<Link
						to="/notifications"
						className="btn btn-outline btn-sm"
					>
						<UsersIcon className="mr-2 size-4" />
						Friend Requests
					</Link>
				</div>
				{/* FRIENDS */}
				{isLoadingFriends ? (
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
				<section>
					{/* USER HEADER */}
					<div className="mb-6 sm:mb-8">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
									Meet New Learners
								</h2>
								<p className="opacity-70">
									Discover perfect language exchange partners
									based on your profile
								</p>
							</div>
						</div>
					</div>
					{/* RECOMMENDED USERS */}
					{isLoadingUsers ? (
						<div className="flex justify-center py-12">
							<span className="loading loading-spinner loading-lg" />
						</div>
					) : users.length === 0 ? (
						<NoRecommendedUserFound />
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{users.map((user) => {
								const hasReqSent = outgoingReqIds.has(user.id);
								return (
									<div
										key={user.id}
										className="card bg-base-200 hover:shadow-lg transition-all duration-300"
									>
										<div className="card-body p-5 space-y-4">
											{/* PROFILEPIC */}
											<div className="flex items-center gap-3">
												<div className="avatar size-16 rounded-full">
													<img
														src={user.profilePic}
														alt={user.fullName}
													/>
												</div>
											</div>
											{/* FULLNAME & LOCATION */}
											<div>
												<h3 className="font-semibold text-lg">
													{user.fullName}
												</h3>
												{user.location && (
													<div className="flex items-center text-xs opacity-70 mt-1">
														<MapPinIcon className="size-3 mr-1" />
														{user.location}
													</div>
												)}
											</div>
											{/* LANGUAGES WITH FLAGS */}
											<div className="flex flex-wrap gap-1.5">
												<span className="badge badge-secondary">
													{getLanguageFlag(
														user.nativeLanguage
													)}
													Native:{" "}
													{capitialize(
														user.nativeLanguage
													)}
												</span>
												<span className="badge badge-outline">
													{getLanguageFlag(
														user.learningLanguage
													)}
													Learning:{" "}
													{capitialize(
														user.learningLanguage
													)}
												</span>
											</div>
											{/* BIO */}
											{user.bio && (
												<p className="text-sm opacity-70">
													{user.bio}
												</p>
											)}
											{/* ACTION BUTTON */}
											<button
												className={`btn w-full mt-2 ${
													hasReqSent
														? "btn-disabled"
														: "btn-primary"
												} `}
												onClick={() =>
													mutateSendFriendRequest(
														user.id
													)
												}
												disabled={
													hasReqSent || isPending
												}
											>
												{hasReqSent ? (
													<>
														<CheckCircleIcon className="size-4 mr-2" />
														Request Sent
													</>
												) : (
													<>
														<UserPlusIcon className="size-4 mr-2" />
														Send Friend Request
													</>
												)}
											</button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default HomePage;
