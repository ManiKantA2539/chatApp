import { create } from "zustand";
import instance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

interface data {
	id: string | null;
}

interface messageDetails {
	_id?:string
	senderId?: data["id"]
	receiverId?: data["id"]
    image?: string | ArrayBuffer | null | undefined
	text?: string
	created_at?:Date
}

interface ChatStore {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	messages: Array<messageDetails> ;
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	users: Array<Object> | null;
	selectedUser: null;
	isUsersLoading: boolean | null;
	isMessagesLoading: boolean | null;
	isSendingMessage: boolean | null;
	getUsers: () => Promise<void>;
	getMessages: (data: data) => Promise<void>;
	sendMessages: (message: messageDetails) => Promise<void>;
	setSelectedUser: (selectedUser: ChatStore["selectedUser"]) => void;
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
			set({ messages: response.data });
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

			set({ messages: [...messages, response.data] })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					`Error while sending message . ${error?.response?.data.message}`,
				);
			} else {
				toast.error("Error while sending message.");
			}
		} finally {
			set({ isSendingMessage: false });
		}
	},
	setSelectedUser: (selectedUser: null | undefined) => set({ selectedUser }),
}));
