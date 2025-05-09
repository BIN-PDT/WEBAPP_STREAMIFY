const Illustration = () => {
	return (
		<div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
			<div className="max-w-md p-10">
				{/* ILLUSTRATION */}
				<div className="relative aspect-square max-w-sm mx-auto">
					<img
						src="/signup-fg.png"
						alt="Language connection illustration"
						className="w-full h-full"
					/>
				</div>

				<div className="text-center space-y-3 mt-6">
					<h2 className="font-newAmsterdam text-xl tracking-wide">
						Connect with language partners worldwide
					</h2>
					<p className="font-barlowCondensed italic opacity-70">
						Practice conversations, make friends, and improve your
						language skills together
					</p>
				</div>
			</div>
		</div>
	);
};

export default Illustration;
