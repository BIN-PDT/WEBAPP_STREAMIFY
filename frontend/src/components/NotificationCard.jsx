import { ClockIcon } from "lucide-react";
import { capitialize, timeSince } from "../common/utils";

const NotificationCard = ({
	request,
	isPending,
	handleAcceptFriendRequest,
}) => {
	return (
		<div className="card bg-base-200">
			<div className="card-body p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						{/* PROFILEPIC */}
						<div className="avatar size-14">
							<img
								src={request.user.profilePic}
								alt={request.user.fullName}
							/>
						</div>

						<div className="font-barlowCondensed">
							{/* TITLE */}
							<p className="text-sm my-1">
								<span className="inline font-semibold">
									{request.user.fullName}
								</span>{" "}
								{!handleAcceptFriendRequest &&
									"accepted your friend request!"}
							</p>
							{/* LANGUAGES */}
							<div className="flex flex-wrap gap-1.5 mt-2">
								<span className="badge badge-secondary badge-md p-3 italic">
									Native:{" "}
									{capitialize(request.user.nativeLanguage)}
								</span>
								<span className="badge badge-outline badge-md p-3 italic">
									Learning:{" "}
									{capitialize(request.user.learningLanguage)}
								</span>
							</div>
							{/* TIMESINCE */}
							<p className="mt-3 text-xs flex items-center opacity-70">
								<ClockIcon className="size-3 mr-1" />
								{timeSince(request.createdAt)}
							</p>
						</div>
					</div>
					{/* ACTION BUTTON */}
					{handleAcceptFriendRequest && (
						<button
							className="btn btn-primary btn-sm min-w-20 font-newAmsterdam font-normal tracking-wider"
							onClick={() =>
								handleAcceptFriendRequest(request.id)
							}
							disabled={isPending}
						>
							Accept
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationCard;
