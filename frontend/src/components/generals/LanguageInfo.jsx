import { LANGUAGE_TO_FLAG } from "../../common/constants";
import { capitialize } from "../../common/utils";

function getLanguageFlag(language) {
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

const LanguageInfo = ({ nativeLanguage, learningLanguage }) => {
	return (
		<div className="px-5 space-y-2 italic">
			<div className="badge badge-secondary text-sm px-3 py-4 w-full">
				{getLanguageFlag(nativeLanguage)}
				Native: {capitialize(nativeLanguage)}
			</div>
			<div className="badge badge-outline text-sm px-3 py-4 w-full">
				{getLanguageFlag(learningLanguage)}
				Learning: {capitialize(learningLanguage)}
			</div>
		</div>
	);
};

export default LanguageInfo;
