import { Link } from "react-router";
import LanguageInfo from "./LanguageInfo";

const FriendCard = ({ friend }) => {
	return (
		<div className="card bg-base-200 hover:shadow-md transition-shadow">
			<div className="card-body p-5 flex flex-col items-center gap-3 font-barlowCondensed">
				{/* USER INFO */}
				<div className="avatar size-20">
					<img src={friend.profilePic} alt={friend.fullName} />
				</div>
				<h3 className="font-semibold truncate">{friend.fullName}</h3>
				{/* LANGUAGE */}
				<div className="mb-4">
					<LanguageInfo
						nativeLanguage={friend.nativeLanguage}
						learningLanguage={friend.learningLanguage}
					/>
				</div>
				{/* CHAT LINK */}
				<Link
					to={`/chat/${friend.id}`}
					className="mt-auto btn btn-outline w-full font-newAmsterdam tracking-wider !font-normal"
				>
					Message
				</Link>
			</div>
		</div>
	);
};

export default FriendCard;
