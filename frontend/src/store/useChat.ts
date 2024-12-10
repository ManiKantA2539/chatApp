import { create } from "zustand";
import instance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

interface data {
	id: string | null;
}

interface ChatStore {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	messages: Array<Object> | null;
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	users: Array<Object> | null;
	selectedUser: null;
	isUsersLoading: boolean | null;
	isMessagesLoading: boolean | null;
	getUsers: () => Promise<void>;
	getMessages: (data: data) => Promise<void>;
	setSelectedUser: (selectedUser: ChatStore["selectedUser"]) => void;
}

export const useChat = create<ChatStore>((set) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,
	getUsers: async () => {
		try {
			set({ isUsersLoading: true });
			const response = await instance("message/users");
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
			const response = await instance(`message/${data.id}`);
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
	setSelectedUser: (selectedUser: null | undefined) => set({ selectedUser }),
}));
