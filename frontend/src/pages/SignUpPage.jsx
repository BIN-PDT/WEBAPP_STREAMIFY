import { useState } from "react";
import { Link } from "react-router";
import Logo from "../components/Logo";
import Illustration from "./../components/Illustration";
import useSignUp from "./../hooks/useSignUp";

const SignUpPage = () => {
	const [signUpData, setSignUpData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const { isPending, mutateSignUp } = useSignUp();

	const handleSignUp = (e) => {
		e.preventDefault();
		mutateSignUp(signUpData);
	};

	return (
		<div
			className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
			data-theme="forest"
		>
			<div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
				{/* LEFT SIDE */}
				<div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
					{/* LOGO */}
					<div className="mb-4">
						<Logo />
					</div>
					{/* FORM */}
					<div className="w-full">
						<form onSubmit={handleSignUp}>
							{/* TITLE */}
							<div className="space-y-4">
								<div className="font-barlowCondensed">
									<h2 className="text-xl font-semibold">
										Create Account
									</h2>
									<p className="italic opacity-70">
										Join Streamify and start your language
										learning adventure!
									</p>
								</div>
							</div>
							{/* FIELDS */}
							<div className="mt-2 flex flex-col gap-2">
								{/* FULLNAME */}
								<div className="form-control w-full">
									<label className="label">
										<span className="field-label">
											Full Name
										</span>
									</label>
									<input
										type="text"
										className="field-input"
										value={signUpData.fullName}
										onChange={(e) =>
											setSignUpData({
												...signUpData,
												fullName: e.target.value,
											})
										}
										required
									/>
								</div>
								{/* EMAIL */}
								<div className="form-control w-full">
									<label className="label">
										<span className="field-label">
											Email
										</span>
									</label>
									<input
										type="email"
										className="field-input"
										value={signUpData.email}
										onChange={(e) =>
											setSignUpData({
												...signUpData,
												email: e.target.value,
											})
										}
										required
									/>
								</div>
								{/* PASSWORD */}
								<div className="form-control w-full">
									<label className="label">
										<span className="field-label">
											Password
										</span>
									</label>
									<input
										type="password"
										className="field-input tracking-wider"
										value={signUpData.password}
										onChange={(e) =>
											setSignUpData({
												...signUpData,
												password: e.target.value,
											})
										}
										required
									/>
								</div>
								{/* AGGREEMENT */}
								<div className="form-control">
									<label className="label cursor-pointer justify-start gap-2">
										<input
											type="checkbox"
											className="checkbox checkbox-sm"
											required
										/>
										<span className="text-sm leading-tight font-barlowCondensed italic">
											I agree to the{" "}
											<span className="text-primary hover:underline">
												Terms of Service
											</span>{" "}
											and{" "}
											<span className="text-primary hover:underline">
												Privacy Policy
											</span>
										</span>
									</label>
								</div>
							</div>
							{/* SUBMIT BUTTON */}
							<button
								className="field-button"
								type="submit"
								disabled={isPending}
							>
								{isPending ? (
									<span className="loading loading-spinner loading-xs"></span>
								) : (
									"Create Account"
								)}
							</button>
							{/* SIGNIN LINK */}
							<div className="text-center mt-4">
								<p className="font-barlowCondensed">
									Already have an account?{" "}
									<Link
										to="/signin"
										className="text-primary hover:underline"
									>
										Sign in
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
				{/* RIGHT SIDE */}
				<Illustration />
			</div>
		</div>
	);
};

export default SignUpPage;
