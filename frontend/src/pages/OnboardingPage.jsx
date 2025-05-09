import { useState } from "react";
import {
	CameraIcon,
	LoaderIcon,
	ShipWheelIcon,
	ShuffleIcon,
} from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import useOnboarding from "./../hooks/useOnboarding";
import { LANGUAGES } from "../common/constants";

const OnboardingPage = () => {
	const { authUser } = useAuthUser();
	const [formState, setFormState] = useState({
		fullName: authUser?.fullName || "",
		bio: authUser?.bio || "",
		profilePic: authUser?.profilePic || "",
		nativeLanguage: authUser?.nativeLanguage || "",
		learningLanguage: authUser?.learningLanguage || "",
		location: authUser?.location || "",
	});

	const { isPending, mutateOnboarding } = useOnboarding();

	const handleSubmit = (e) => {
		e.preventDefault();
		mutateOnboarding(formState);
	};

	const handleRandomAvatar = () => {
		const randIdx = Math.floor(Math.random() * 100) + 1;
		const randPic = `https://avatar.iran.liara.run/public/${randIdx}.png`;
		setFormState({ ...formState, profilePic: randPic });
	};

	return (
		<div className="min-h-screen bg-base-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
			<div className="card bg-base-200 w-full max-w-3xl shadow-xl">
				<div className="card-body p-6 sm:p-8">
					{/* TITLE */}
					<h1 className="font-lobster text-2xl sm:text-3xl font-bold text-center mb-6">
						Complete Your Profile
					</h1>
					{/* FORM */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* PROFILE PIC CONTAINER */}
						<div className="flex flex-col items-center justify-center space-y-4">
							{/* IMAGE PREVIEW */}
							<div className="size-32 rounded-full bg-base-300 overflow-hidden">
								{formState.profilePic ? (
									<img
										src={formState.profilePic}
										alt="Profile Preview"
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="flex items-center justify-center h-full">
										<CameraIcon className="size-12 text-base-content opacity-40" />
									</div>
								)}
							</div>
							{/* GENERATE RANDOM AVATAR BUTTON */}
							<div className="flex items-center">
								<button
									type="button"
									onClick={handleRandomAvatar}
									className="btn btn-accent font-newAmsterdam tracking-wide !font-normal"
								>
									<ShuffleIcon className="size-4 mr-1" />
									Generate Random Avatar
								</button>
							</div>
						</div>
						{/* FULL NAME */}
						<div className="form-control">
							<label className="label">
								<span className="field-label">Full Name</span>
							</label>
							<input
								type="text"
								name="fullName"
								value={formState.fullName}
								onChange={(e) =>
									setFormState({
										...formState,
										fullName: e.target.value,
									})
								}
								className="field-input"
								required
							/>
						</div>
						{/* BIO */}
						<div className="form-control">
							<label className="label">
								<span className="field-label">Bio</span>
							</label>
							<textarea
								name="bio"
								placeholder="Tell others about yourself and your language learning goals"
								value={formState.bio}
								onChange={(e) =>
									setFormState({
										...formState,
										bio: e.target.value,
									})
								}
								className="field-textarea"
								required
							/>
						</div>
						{/* LANGUAGES */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* NATIVE LANGUAGE */}
							<div className="form-control">
								<label className="label">
									<span className="field-label">
										Native Language
									</span>
								</label>
								<select
									name="nativeLanguage"
									value={formState.nativeLanguage}
									onChange={(e) =>
										setFormState({
											...formState,
											nativeLanguage: e.target.value,
										})
									}
									className="field-select"
									required
								>
									<option value="">
										Select your native language
									</option>
									{LANGUAGES.map((lang) => (
										<option
											key={`native-${lang}`}
											value={lang.toLowerCase()}
										>
											{lang}
										</option>
									))}
								</select>
							</div>
							{/* LEARNING LANGUAGE */}
							<div className="form-control">
								<label className="label">
									<span className="field-label">
										Learning Language
									</span>
								</label>
								<select
									name="learningLanguage"
									value={formState.learningLanguage}
									onChange={(e) =>
										setFormState({
											...formState,
											learningLanguage: e.target.value,
										})
									}
									className="field-select"
									required
								>
									<option value="">
										Select language you're learning
									</option>
									{LANGUAGES.map((lang) => (
										<option
											key={`learning-${lang}`}
											value={lang.toLowerCase()}
										>
											{lang}
										</option>
									))}
								</select>
							</div>
						</div>
						{/* LOCATION */}
						<div className="form-control">
							<label className="label">
								<span className="field-label">Location</span>
							</label>
							<div>
								<input
									type="text"
									name="location"
									placeholder="City, Country"
									value={formState.location}
									onChange={(e) =>
										setFormState({
											...formState,
											location: e.target.value,
										})
									}
									className="field-input"
									required
								/>
							</div>
						</div>
						{/* SUBMIT BUTTON */}
						<button
							className="!mt-10 field-button"
							disabled={isPending}
							type="submit"
						>
							{isPending ? (
								<LoaderIcon className="animate-spin size-5 mr-2" />
							) : (
								<>
									<ShipWheelIcon className="size-5" />
									Complete Onboarding
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OnboardingPage;
