import { LANGUAGE_TO_FLAG } from "../common/constants";
import { capitialize } from "../common/utils";

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
		<div className="flex flex-wrap justify-center gap-2 italic">
			<span className="badge badge-secondary text-sm px-3 py-4 flex-grow">
				{getLanguageFlag(nativeLanguage)}
				Native: {capitialize(nativeLanguage)}
			</span>
			<span className="badge badge-outline text-sm px-3 py-4 flex-grow">
				{getLanguageFlag(learningLanguage)}
				Learning: {capitialize(learningLanguage)}
			</span>
		</div>
	);
};

export default LanguageInfo;
