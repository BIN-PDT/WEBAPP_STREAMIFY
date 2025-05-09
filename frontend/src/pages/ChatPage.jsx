import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import {
	Channel,
	ChannelHeader,
	Chat,
	MessageInput,
	MessageList,
	Thread,
	Window,
} from "stream-chat-react";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import ChatLoader from "./../components/ChatLoader";
import CallButton from "./../components/CallButton";
import { getStreamToken } from "../common/api";

const GETSTREAM_API_KEY = import.meta.env.VITE_GETSTREAM_API_KEY;

const ChatPage = () => {
	const { id: targetUserId } = useParams();
	const { authUser } = useAuthUser();

	const [chatClient, setChatClient] = useState(null);
	const [channel, setChannel] = useState(null);
	const [loading, setLoading] = useState(true);

	const { data: tokenData } = useQuery({
		queryKey: ["streamToken"],
		queryFn: getStreamToken,
		enabled: !!authUser,
	});

	useEffect(() => {
		async function initChat() {
			if (!authUser || !tokenData?.token) return;
			console.log(tokenData.token);
			try {
				const client = StreamChat.getInstance(GETSTREAM_API_KEY);
				// OPEN WEBSOCKET CONNECTION.
				await client.connectUser(
					{
						id: authUser.id,
						name: authUser.fullName,
						image: authUser.profilePic,
					},
					tokenData.token
				);
				// CREATE CHANNEL.
				const channelId = [authUser.id, targetUserId].sort().join("-");
				const channel = client.channel("messaging", channelId, {
					members: [authUser.id, targetUserId],
				});
				await channel.watch();
				//
				setChatClient(client);
				setChannel(channel);
			} catch (error) {
				console.error(error);
				toast.error("Couldn't establish connection. Please try again!");
			} finally {
				setLoading(false);
			}
		}

		initChat();
	}, [targetUserId, authUser, tokenData]);

	const handleVideoCall = () => {
		if (channel) {
			const callUrl = `${window.location.origin}/call/${channel.id}`;
			channel.sendMessage({
				text: `I've started a video call. Join me here: ${callUrl}`,
			});
		}
	};

	if (loading || !chatClient || !channel) return <ChatLoader />;
	return (
		<div className="h-[91vh]">
			<Chat client={chatClient}>
				<Channel channel={channel}>
					<div className="w-full relative">
						<CallButton handleVideoCall={handleVideoCall} />
						<Window>
							<ChannelHeader />
							<MessageList />
							<MessageInput focus />
						</Window>
					</div>
					<Thread />
				</Channel>
			</Chat>
		</div>
	);
};

export default ChatPage;
