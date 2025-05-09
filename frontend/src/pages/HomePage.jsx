import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import {
	getOutgoingFriendRequests,
	getRecommendedUsers,
	sendFriendRequest,
} from "../common/api";
import { getLanguageFlag } from "../components/FriendCard";
import NoRecommendedUserFound from "./../components/NoRecommendedUserFound";
import { capitialize } from "./../common/utils";

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
				<div className="mb-6 sm:mb-8">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<h2 className="text-2xl sm:text-3xl font-lobster">
								Meet New Learners
							</h2>
							<p className="opacity-70 font-barlowCondensed italic">
								Discover perfect language exchange partners
								based on your profile
							</p>
						</div>
					</div>
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
							const hasReqSent = outgoingReqIds.has(user.id);
							return (
								<div
									key={user.id}
									className="card bg-base-200 hover:shadow-lg transition-all duration-300 font-barlowCondensed"
								>
									<div className="card-body p-5 space-y-4">
										<div className="flex flex-col justify-center items-center gap-3">
											{/* PROFILEPIC */}
											<div className="avatar size-20 rounded-full">
												<img
													src={user.profilePic}
													alt={user.fullName}
												/>
											</div>
											{/* FULLNAME */}
											<div>
												<h3 className="font-semibold text-lg">
													{user.fullName}
												</h3>
											</div>
											{/* LANGUAGES WITH FLAGS */}
											<div className="flex flex-wrap gap-2 italic">
												<span className="badge badge-secondary text-sm px-3 py-4">
													{getLanguageFlag(
														user.nativeLanguage
													)}
													Native:{" "}
													{capitialize(
														user.nativeLanguage
													)}
												</span>
												<span className="badge badge-outline text-sm px-3 py-4">
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
											<div className="mt-2">
												<p className="opacity-70">
													{user.bio}
												</p>
											</div>
										</div>
										{/* LOCATION */}
										<div className="absolute left-4 top-0 flex items-center text-sm opacity-70">
											<MapPinIcon className="size-4 mr-1" />
											<p className="max-w-20 overflow-hidden text-ellipsis">
												{user.location}
											</p>
										</div>
										{/* ACTION BUTTON */}
										<button
											className={`btn w-full mt-2 font-newAmsterdam tracking-wider !font-normal ${
												hasReqSent
													? "btn-disabled"
													: "btn-primary"
											}`}
											onClick={() =>
												mutateSendFriendRequest(user.id)
											}
											disabled={hasReqSent || isPending}
										>
											{hasReqSent ? (
												<>
													<CheckCircleIcon className="size-4" />
													Request Sent
												</>
											) : (
												<>
													<UserPlusIcon className="size-4" />
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
			</div>
		</div>
	);
};

export default HomePage;
