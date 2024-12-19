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
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				await getMessages(authState._id);
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		fetchMessages();
	}, [authState]);

	return (
		<div className="flex flex-col w-full">
			<div className="h-[10%] border-b border-base-300 flex justify-between items-center p-2">
				<MessageHeader selectedUser={selectedUser} />
			</div>
			<div className="h-[80%] border-b border-base-300">
				{isMessagesLoading ? <MessageSkeleton /> : (
					<div className="overflow-y-auto p-2 flex-1">
						{messages.map((message) => (
							<div
								key={message._id}
								className={`chat ${message.senderId === authState._id ? "start" : "end"}`}
							>
								<div className="chat-image avatar">
									<div className="size-10 rounded-full border">
										<img src={`${message.senderId === authState?._id ? authState.profilePic || "src/assets/react.svg" : selectedUser.profilePic || "src/assets/react.svg"}`} alt="profilePic" />
									</div>
								</div>
								<div className="chat-header">abc</div>
							</div>
						))}
					</div>
				)}
			</div>
			<MessageInput selectedUser={selectedUser} />
		</div>
	);
};

export default ChatContainer;
