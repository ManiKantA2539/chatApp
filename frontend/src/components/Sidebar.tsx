import { useEffect, useState } from "react";
import Card from "./ReusableComponents/Card";
import { Users } from "lucide-react";
import { useChat } from "../store/useChat";
import SidebarSkeleton from "./SkeletonLoaders/SidebarSkeleton"; // Import SidebarSkeleton
import { useAuth } from "../store/useAuth";

export interface User {
	fullName: string;
	profilePic: string;
	_id: string;
}

const Sidebar = () => {
	const { users, isUsersLoading, getUsers, selectedUser, setSelectedUser } =
		useChat();
	const selectedUserTyped = selectedUser as User | null;
	const { onlineUsers } = useAuth();
	const [showOnlineusers, setShowOnlineUsers] = useState<boolean>(false);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	useEffect(() => {
		try {
			getUsers();
		} catch (error) {
			console.log("error while fetching users", error);
		}
	}, [getUsers]);

	const filteredUsers = showOnlineusers
		? users?.filter((user) => onlineUsers?.includes(user._id))
		: users;
	return (
		<div>
			{isUsersLoading ? (
				<SidebarSkeleton /> // Use SidebarSkeleton component
			) : (
				<aside className="h-full w-20 lg:w-72 md:w-60 sm:w-36 xs:w-24 border-r border-base-300 flex flex-col transition-all duration-200">
					<div className="border-b border-base-300 w-full p-5 lg:block hidden">
						<div className="flex items-center gap-2">
							<Users className="size-6" />
							<span className="font-medium lg:block hidden">Contacts</span>
						</div>
					</div>
					<div className="overflow-y-auto w-full py-3">
						<div className="flex justify-center gap-1">
							<label className="flex gap-1">
								<input
									type="checkbox"
									onChange={(e) => setShowOnlineUsers(e.target.checked)}
									checked={showOnlineusers}
								/>
								<span className="text-center opacity-50 ">
									show Online ({onlineUsers?.length - 1}
									{" online"})
								</span>
							</label>
						</div>
						{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
						{filteredUsers?.map((user: any, index) => (
							<div
								key={`${index + 1}`}
								onClick={() => setSelectedUser(user)}
								onKeyUp={() => setSelectedUser(user)}
							>
								<Card
									fullName={user.fullName}
									userStatus={
										onlineUsers?.includes(user._id) ? "online" : "offline"
									}
									image={user.profilePic}
									sx={{ cursor: "pointer" }}
									selectedUser={selectedUserTyped?._id === user._id}
								/>
							</div>
						))}
						{filteredUsers?.length === 0 && (
							<div>
								<p className="text-center text-base-500 mt-10">
									No users found
								</p>
							</div>
						)}
					</div>
				</aside>
			)}
		</div>
	);
};

export default Sidebar;
