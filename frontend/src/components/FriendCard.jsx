import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "./../common/constants";
import { capitialize } from "./../common/utils";

const FriendCard = ({ friend }) => {
	return (
		<div className="card bg-base-200 hover:shadow-md transition-shadow">
			<div className="card-body p-4 font-barlowCondensed">
				{/* USER INFO */}
				<div className="flex items-center gap-3 mb-3">
					<div className="avatar size-12">
						<img src={friend.profilePic} alt={friend.fullName} />
					</div>
					<h3 className="font-semibold truncate">
						{friend.fullName}
					</h3>
				</div>
				{/* LANGUAGE */}
				<div className="flex flex-wrap gap-2 mb-4 italic">
					<span className="badge badge-secondary text-sm px-3 py-4">
						{getLanguageFlag(friend.nativeLanguage)}
						Native: {capitialize(friend.nativeLanguage)}
					</span>
					<span className="badge badge-outline text-sm px-3 py-4">
						{getLanguageFlag(friend.learningLanguage)}
						Learning: {capitialize(friend.learningLanguage)}
					</span>
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

export function getLanguageFlag(language) {
	if (!language) return null;

	const langLower = language.toLowerCase();
	const countryCode = LANGUAGE_TO_FLAG[langLower];

	if (countryCode) {
		return (
			<img
				src={`https://flagcdn.com/24x18/${countryCode}.png`}
				alt={`${langLower} flag`}
				className="h-3 mr-1 inline-block"
			/>
		);
	}
	return null;
}
