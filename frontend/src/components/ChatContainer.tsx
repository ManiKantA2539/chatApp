import "regenerator-runtime/runtime";
import Card from "./ReusableComponents/Card";
import type { User } from "./Sidebar";
import { useChat } from "../store/useChat";
import MessageSkeleton from "./SkeletonLoaders/MessageSkeleton";
import MessageInput from "./chatContainer/MessageInput";
import MessageHeader from "./chatContainer/MessageHeader";
import { useAuth } from "../store/useAuth";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";


const ChatContainer = ({ selectedUser }: { selectedUser: User }) => {
	const { getMessages, messages, isMessagesLoading, onlineMessages, noOnlineMessages } = useChat();
	const { authState,onlineUsers } = useAuth();
	const scrollRef = useRef<HTMLDivElement>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(`fecthing messages of ${selectedUser._id}`);
		getMessages({id:selectedUser._id});
		onlineMessages();

		return ()=>noOnlineMessages();
	}, [selectedUser,onlineMessages,noOnlineMessages,getMessages]);

	useEffect(()=>{
		if(scrollRef.current && messages){
			scrollRef.current?.scrollIntoView({behavior:"smooth"})
		}
	},[messages])

	return (
		<div className="flex flex-col w-full">
			<div className="h-[10%] border-b border-base-300 flex justify-between items-center p-2">
				<MessageHeader selectedUser={selectedUser} userStatus={onlineUsers?.includes(selectedUser._id)? "online" : "offline"}/>
			</div>
			{/* <div className="h-[80%] border-b border-base-300"> */}
				{isMessagesLoading ? <MessageSkeleton /> : (
					<div className="overflow-y-auto p-2 flex-1 space-y-4">
						
						{messages.map((message) => (
							<div
								key={message?._id}
								className={`chat ${message?.senderId === authState?.id ? "chat-end":"chat-start"}`}
								ref={scrollRef}
							>

								<div className="chat-image avatar">
									<div className="size-10 rounded-full border">
										<img src={`${message?.senderId === authState?.id ? authState.profilePic || "src/assets/react.svg" : selectedUser.profilePic || "src/assets/react.svg"}`} alt="profilePic" />
									</div>
								</div>
								<div className="chat-header">
									<time className="text-xs opacity-50 ml-1">{message?.createdAt}</time>
								</div>
								<div className="chat-bubble flex flex-col gap-2">
								{message?.image && (
									<img src={`${message?.image}`} alt="img" className="rounded-md sm:max-w-[300px] mb-2"/>
								)}
									<p>{message?.text}</p>
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
