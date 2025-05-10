import { useState } from "react";
import { Link } from "react-router";
import Logo from "../components/generals/Logo";
import Illustration from "../components/generals/Illustration";
import useSignIn from "./../hooks/useSignIn";

const SignInPage = () => {
	const [signInData, setSignInData] = useState({
		email: "",
		password: "",
	});

	const { isPending, mutateSignIn } = useSignIn();

	const handleSignIn = (e) => {
		e.preventDefault();
		mutateSignIn(signInData);
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
						<form onSubmit={handleSignIn}>
							{/* TITLE */}
							<div className="space-y-4">
								<div className="font-barlowCondensed">
									<h2 className="text-xl font-semibold">
										Welcome Back
									</h2>
									<p className="italic opacity-70">
										Sign in to your account to continue your
										language journey
									</p>
								</div>
							</div>
							{/* FIELDS */}
							<div className="mt-2 flex flex-col gap-2">
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
										value={signInData.email}
										onChange={(e) =>
											setSignInData({
												...signInData,
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
										value={signInData.password}
										onChange={(e) =>
											setSignInData({
												...signInData,
												password: e.target.value,
											})
										}
										required
									/>
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
									"Sign In"
								)}
							</button>
							{/* SIGNUP LINK */}
							<div className="text-center mt-4">
								<p className="font-barlowCondensed">
									Don't have an account?{" "}
									<Link
										to="/signup"
										className="text-primary hover:underline"
									>
										Create one
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

export default SignInPage;
