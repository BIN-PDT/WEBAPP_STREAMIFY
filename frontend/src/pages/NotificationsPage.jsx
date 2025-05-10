import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellIcon, UserCheckIcon } from "lucide-react";
import NotificationCard from "../components/cards/NotificationCard";
import NoNotificationFound from "../components/placeholders/NoNotificationFound";
import { acceptFriendRequest, getFriendRequests } from "../common/api";

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
								</h2>
								{/* REQUESTS */}
								<div className="space-y-3">
									{incomingRequests.map((request) => {
										request.user = request.sender;

										return (
											<NotificationCard
												key={request.id}
												request={request}
												isPending={isPending}
												handleAcceptFriendRequest={
													mutateAcceptFriendRequest
												}
											/>
										);
									})}
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
									{acceptedRequests.map((request) => {
										request.user = request.recipient;

										return (
											<NotificationCard
												key={request.id}
												request={request}
											/>
										);
									})}
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
