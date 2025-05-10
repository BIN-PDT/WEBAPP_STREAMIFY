import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import LanguageInfo from "../components/LanguageInfo";

const RecommendedUserCard = ({ user, isPending, handleSendFriendRequest }) => {
	return (
		<div className="card bg-base-200 hover:shadow-lg transition-all duration-300 font-barlowCondensed">
			<div className="card-body p-5 space-y-4">
				<div className="flex flex-col justify-center items-center gap-3">
					{/* PROFILEPIC */}
					<div className="avatar size-20">
						<img src={user.profilePic} alt={user.fullName} />
					</div>
					{/* FULLNAME */}
					<div>
						<h3 className="font-semibold text-lg">
							{user.fullName}
						</h3>
					</div>
					{/* LANGUAGES WITH FLAGS */}
					<LanguageInfo
						nativeLanguage={user.nativeLanguage}
						learningLanguage={user.learningLanguage}
					/>
					{/* BIO */}
					<div className="mt-2">
						<p className="font-lobster opacity-70">{user.bio}</p>
					</div>
				</div>
				{/* LOCATION */}
				<div className="absolute left-4 top-0 flex items-center text-sm opacity-70">
					<MapPinIcon className="size-4 mr-1" />
					<p className="font-newAmsterdam tracking-wide max-w-20 overflow-hidden text-ellipsis">
						{user.location}
					</p>
				</div>
				{/* ACTION BUTTON */}
				<button
					className={`btn w-full mt-2 font-newAmsterdam tracking-wider !font-normal ${
						user.hasReqSent ? "btn-disabled" : "btn-primary"
					}`}
					onClick={() => handleSendFriendRequest(user.id)}
					disabled={user.hasReqSent || isPending}
				>
					{user.hasReqSent ? (
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
};

export default RecommendedUserCard;
