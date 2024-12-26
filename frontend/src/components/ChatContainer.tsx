import "regenerator-runtime/runtime";
import Card from "./ReusableComponents/Card";
import type { User } from "./Sidebar";
import { useChat } from "../store/useChat";
import MessageSkeleton from "./SkeletonLoaders/MessageSkeleton";
import MessageInput from "./chatContainer/MessageInput";
import MessageHeader from "./chatContainer/MessageHeader";
import { useAuth } from "../store/useAuth";
import dayjs from "dayjs";
import { useEffect } from "react";


const ChatContainer = ({ selectedUser }: { selectedUser: User }) => {
	const { getUsers, getMessages, messages, isMessagesLoading, isUsersLoading, sendMessages, isSendingMessage } = useChat();
	const { authState } = useAuth();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(`fecthing messages of ${selectedUser._id}`);
		const fetchMessages = async () => {
			try {
				await getMessages({id:selectedUser._id});
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		fetchMessages();
	}, [selectedUser]);

	return (
		<div className="flex flex-col w-full">
			<div className="h-[10%] border-b border-base-300 flex justify-between items-center p-2">
				<MessageHeader selectedUser={selectedUser} />
			</div>
			{/* <div className="h-[80%] border-b border-base-300"> */}
				{isMessagesLoading ? <MessageSkeleton /> : (
					<div className="overflow-y-auto p-2 flex-1 space-y-4">
						{messages.map((message) => (
							<div
								key={message._id}
								className={`chat ${message.senderId === authState.id ? "chat-end":"chat-start"}`}
							>
							

								<div className="chat-image avatar">
									<div className="size-10 rounded-full border">
										<img src={`${message.senderId === authState?.id ? authState.profilePic || "src/assets/react.svg" : selectedUser.profilePic || "src/assets/react.svg"}`} alt="profilePic" />
									</div>
								</div>
								<div className="chat-header">
									<time className="text-xs opacity-50 ml-1">{message.createdAt}</time>
								</div>
								<div className="chat-bubble flex flex-col gap-2">
								{message.image && (
									<img src={`${message.image}`} alt="img" className="rounded-md sm:max-w-[300px] mb-2"/>
								)}
									<p>{message.text}</p>
								</div>
								
							</div>
						))}
					</div>
				)}
			{/* </div>v */}
			<MessageInput selectedUser={selectedUser} />
		</div>
	);
};

export default ChatContainer;
