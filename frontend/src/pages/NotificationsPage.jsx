import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellIcon, ClockIcon, UserCheckIcon } from "lucide-react";
import NoNotificationFound from "./../components/NoNotificationFound";
import { acceptFriendRequest, getFriendRequests } from "../common/api";
import { capitialize, timeSince } from "./../common/utils";

const NotificationsPage = () => {
	const queryClient = useQueryClient();
	const { isLoading, data: friendRequests } = useQuery({
		queryKey: ["friendRequests"],
		queryFn: getFriendRequests,
		initialData: {},
	});
	const { isPending, mutate: mutateAcceptFriendRequest } = useMutation({
		mutationFn: acceptFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		},
	});

	const { incomingRequests = [], acceptedRequests = [] } = friendRequests;

	return (
		<div className="p-4 sm:p-6 lg:p-8">
			<div className="container mx-auto max-w-4xl space-y-8">
				<h1 className="font-lobster text-2xl sm:text-3xl tracking-wide mb-5">
					Notifications
				</h1>

				{isLoading ? (
					<div className="flex justify-center py-12">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				) : (
					<>
						{/* INCOMING REQUESTS */}
						{incomingRequests.length > 0 && (
							<section className="space-y-4">
								{/* HEADER */}
								<h2 className="font-newAmsterdam text-xl tracking-wide flex items-center gap-2">
									<UserCheckIcon className="size-5 text-primary" />
									New Connections
									<span className="badge badge-primary ml-2">
										{incomingRequests.length}
									</span>
								</h2>
								{/* REQUESTS */}
								<div className="space-y-3">
									{incomingRequests.map((request) => (
										<div
											key={request.id}
											className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
										>
											<div className="card-body p-4">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3">
														{/* SENDER PROFILEPIC */}
														<div className="avatar size-14 rounded-full bg-base-300">
															<img
																src={
																	request
																		.sender
																		.profilePic
																}
																alt={
																	request
																		.sender
																		.fullName
																}
															/>
														</div>
														{/* SENDER LANGUAGES */}
														<div className="font-barlowCondensed">
															{/* SENDER FULLNAME */}
															<h3 className="font-semibold">
																{
																	request
																		.sender
																		.fullName
																}
															</h3>

															<div className="flex flex-wrap gap-1.5 mt-2">
																<span className="badge badge-secondary badge-md p-3 italic">
																	Native:{" "}
																	{capitialize(
																		request
																			.sender
																			.nativeLanguage
																	)}
																</span>
																<span className="badge badge-outline badge-md p-3 italic">
																	Learning:{" "}
																	{capitialize(
																		request
																			.sender
																			.learningLanguage
																	)}
																</span>
															</div>
															{/* TIMESINCE */}
															<p className="mt-3 text-xs flex items-center opacity-70">
																<ClockIcon className="size-3 mr-1" />
																{timeSince(
																	request.createdAt
																)}
															</p>
														</div>
													</div>
													{/* ACTION BUTTON */}
													<button
														className="btn btn-primary btn-sm min-w-20 font-newAmsterdam tracking-wider"
														onClick={() =>
															mutateAcceptFriendRequest(
																request.id
															)
														}
														disabled={isPending}
													>
														Accept
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</section>
						)}
						{/* ACCEPTED REQUESTS */}
						{acceptedRequests.length > 0 && (
							<section className="space-y-4">
								{/* HEADER */}
								<h2 className="font-newAmsterdam text-xl tracking-wide flex items-center gap-2">
									<BellIcon className="size-5 text-success" />
									New Friends
								</h2>
								{/* REQUESTS */}
								<div className="space-y-3 font-barlowCondensed">
									{acceptedRequests.map((notification) => (
										<div
											key={notification.id}
											className="card bg-base-200 shadow-sm"
										>
											<div className="card-body p-4">
												<div className="flex items-start gap-3">
													<div className="avatar mt-1 size-10 rounded-full">
														<img
															src={
																notification
																	.recipient
																	.profilePic
															}
															alt={
																notification
																	.recipient
																	.fullName
															}
														/>
													</div>
													<div className="flex-1">
														<p className="text-sm my-1">
															<h3 className="inline font-semibold">
																{
																	notification
																		.recipient
																		.fullName
																}
															</h3>{" "}
															accepted your friend
															request.
														</p>
														<p className="text-xs flex items-center opacity-70">
															<ClockIcon className="size-3 mr-1" />
															{timeSince(
																notification.createdAt
															)}
														</p>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</section>
						)}
						{/* NO REQUESTS */}
						{incomingRequests.length === 0 &&
							acceptedRequests.length === 0 && (
								<NoNotificationFound />
							)}
					</>
				)}
			</div>
		</div>
	);
};

export default NotificationsPage;
