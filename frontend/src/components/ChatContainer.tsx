import "regenerator-runtime/runtime";
import { Mic, Paperclip, Send, X } from "lucide-react";
import { useState, useEffect } from "react";
import Card from "./ReusableComponents/Card";
import type { User } from "./Sidebar";
import { useChat } from "../store/useChat";
import { Input } from "@mui/material";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const ChatContainer = ({ selectedUser }: { selectedUser: User }) => {
	const { fullName, profilePic } = selectedUser;
	const { setSelectedUser } = useChat();
	const [message, setMessage] = useState<string>("");
	const handleCloseClick = () => {
		setSelectedUser(null);
	};
	const startListnening = () =>
		SpeechRecognition.startListening({
			continuous: true,
			language: "en-IN",
		});
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	useEffect(() => {
		console.log("Listening:", listening);
		console.log("Transcript:", transcript);
		setMessage(transcript);
	}, [transcript, listening]);

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}
	return (
		<div className="flex flex-col w-full">
			<div className="h-[10%] border-b border-base-300 flex justify-between items-center p-2">
				<Card fullName={fullName} userStatus={"offline"} image={profilePic} />
				<X
					className="w-6 h-6 text-gray-500 cursor-pointer"
					onClick={handleCloseClick}
				/>
			</div>
			<div className="h-[80%] border-b border-base-300">{transcript}</div>
			<div className="h-[10%] flex flex-row items-center gap-10 p-2">
				<Input
					type="text"
					placeholder="Enter Message ..."
					className="w-[80%] bg-transparent border rounded-lg border-gray-500 placeholder-gray-500 text-white px-4 py-1"
					inputProps={{ style: { color: "white" } }}
					disableUnderline
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Mic
					className="w-6 h-6 text-gray-500 cursor-pointer"
					onClick={() => {
						console.log("Starting listening");
						startListnening();
					}}
				/>
				<X
					className="w-6 h-6 text-gray-500 cursor-pointer"
					onClick={SpeechRecognition.stopListening}
				/>
				<Paperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
				<Send className="w-6 h-6 text-gray-500 cursor-pointer" />
			</div>
		</div>
	);
};

export default ChatContainer;
