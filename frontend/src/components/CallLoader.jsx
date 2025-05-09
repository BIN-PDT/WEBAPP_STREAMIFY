import { LoaderIcon } from "lucide-react";

function CallLoader() {
	return (
		<div className="h-full flex flex-col items-center justify-center p-4">
			<LoaderIcon className="animate-spin size-10 text-primary" />
			<p className="mt-4 text-center text-lg font-newAmsterdam tracking-wider">
				Connecting to call...
			</p>
		</div>
	);
}

export default CallLoader;
