import { create } from "zustand";
import instance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { ReactNode } from "react";
import { useAuth } from "./useAuth";
import { Socket } from "socket.io-client";

interface data {
	id: string | null;
}

interface messageDetails {
	_id?:string
	senderId?: data["id"]
	receiverId?: data["id"]
    image?: string | ArrayBuffer | null | undefined
	text?: string
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	createdAt?:any
}

interface user{
	_id:string
	fullName:string
	profilePic:string
	emsil:string
}

interface ChatStore {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	messages: Array<messageDetails> ;
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	users: Array<user> | null;
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	selectedUser: user | null;
	isUsersLoading: boolean | null;
	isMessagesLoading: boolean | null;
	isSendingMessage: boolean | null;
	getUsers: () => Promise<void>;
	getMessages: (data: data) => Promise<void>;
	sendMessages: (message: messageDetails) => Promise<void>;
	setSelectedUser: (selectedUser: ChatStore["selectedUser"]) => void;
	onlineMessages:()=>void
	noOnlineMessages:()=>void
}

export const useChat = create<ChatStore>((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,
	isSendingMessage: false,
	getUsers: async () => {
		try {
			set({ isUsersLoading: true });
			const response = await instance.get("message/users");
			set({ users: response?.data?.data });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					`Error while fetching users . ${error?.response?.data.message}`,
				);
			} else {
				toast.error("Error in fetching is users data.");
			}
		} finally {
			set({ isUsersLoading: false });
		}
	},
	getMessages: async (data: data) => {
		try {
			set({ isMessagesLoading: true });
			const response = await instance.get(`message/${data.id}`);
			set({ messages: response?.data?.data });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					`Error while fetching messages . ${error?.response?.data.message}`,
				);
			} else {
				toast.error("Error in fetching messages.");
			}
		} finally {
			set({ isMessagesLoading: false });
		}
	},
	sendMessages: async (message: messageDetails) => {
		try {
			set({ isSendingMessage: true })
			const { messages } = get()
			const { senderId, receiverId, text, image } = message
			const response = await instance.post(`message/send/${receiverId}`, {
				image,
				text
			})
			
			set({ messages: [...messages, response.data.data] })
			console.log(messages)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					`Error while sending message . ${error?.response?.data}`,
				);
			} else {
				toast.error("Error while sending message.");
			}
		} finally {
			set({ isSendingMessage: false });
		}
	},
	onlineMessages:()=>{
		const {selectedUser} = get()
		if(!selectedUser) return
		const socket = useAuth.getState().socket;
		
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		socket.on("newMessage",(message: messageDetails)=>{
			console.log(selectedUser)
			if(message.senderId !== selectedUser._id) return
			set({messages:[...get().messages,message]})
		})
		console.log("messages",get().messages)
	},
	noOnlineMessages:()=>{
		const socket = useAuth.getState().socket;
		socket.off("newMessage")
	},
	setSelectedUser: (selectedUser: user | null) => set({ selectedUser }),
}));
