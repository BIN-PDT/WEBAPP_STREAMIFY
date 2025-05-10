import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
	StreamVideo,
	StreamVideoClient,
	StreamCall,
	CallControls,
	SpeakerLayout,
	StreamTheme,
	CallingState,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import useAuthUser from "./../hooks/useAuthUser";
import CallLoader from "../components/loaders/CallLoader";
import { getStreamToken } from "../common/api";
import { toastErrorMessage } from "../common/utils";

const GETSTREAM_API_KEY = import.meta.env.VITE_GETSTREAM_API_KEY;

const CallPage = () => {
	const { id: callId } = useParams();
	const { authUser, isLoading } = useAuthUser();

	const [client, setClient] = useState(null);
	const [call, setCall] = useState(null);
	const [connecting, setConnecting] = useState(true);

	const { data: tokenData } = useQuery({
		queryKey: ["streamToken"],
		queryFn: getStreamToken,
		enabled: !!authUser,
	});

	useEffect(() => {
		async function initCall() {
			if (!authUser || !tokenData?.token) return;

			try {
				const client = new StreamVideoClient({
					apiKey: GETSTREAM_API_KEY,
					user: {
						id: authUser.id,
						name: authUser.fullName,
						image: authUser.profilePic,
					},
					token: tokenData.token,
				});

				const callInstance = client.call("default", callId);
				await callInstance.join({ create: true });

				setClient(client);
				setCall(callInstance);
			} catch (error) {
				console.error(error);
				toastErrorMessage({
					message: "Couldn't establish connection. Please try again!",
				});
			} finally {
				setConnecting(false);
			}
		}

		initCall();
	}, [callId, authUser, tokenData]);

	if (isLoading || connecting) return <CallLoader />;
	return (
		<div className="px-6 py-4 h-full flex flex-col items-center justify-center">
			<div className="relative h-full">
				{client && call ? (
					<StreamVideo client={client}>
						<StreamCall call={call}>
							<CallContent />
						</StreamCall>
					</StreamVideo>
				) : (
					<div className="flex items-center justify-center h-full">
						<p className="font-newAmsterdam text-xl tracking-wider">
							Couldn't initialize call. Please refresh or try
							again later!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

const CallContent = () => {
	const navigate = useNavigate();
	const { useCallCallingState } = useCallStateHooks();
	const callingState = useCallCallingState();

	if (callingState === CallingState.LEFT) return navigate("/");
	return (
		<StreamTheme>
			<SpeakerLayout />
			<CallControls />
		</StreamTheme>
	);
};

export default CallPage;
