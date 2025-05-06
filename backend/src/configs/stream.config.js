import { StreamChat } from "stream-chat";
import settings from "./settings.config.js";

const streamClient = StreamChat.getInstance(
	settings.GETSTREAM_API_KEY,
	settings.GETSTREAM_API_SECRET
);

export default streamClient;
