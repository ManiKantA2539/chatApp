import { useEffect } from "react";
import Card from "./ReusableComponents/Card";
import { Loader2, Users } from "lucide-react";
import { useChat } from "../store/useChat";
import SidebarSkeleton from "./SkeletonLoaders/SidebarSkeleton"; // Import SidebarSkeleton

interface User {
	fullName: string;
	profilePic: string;
	_id: string; // Add _id to User interface
}

const Sidebar = () => {
	const { users, isUsersLoading, getUsers, selectedUser, setSelectedUser } =
		useChat();

	useEffect(() => {
		try {
			getUsers();
		} catch (error) {}
	}, [getUsers]);

	return (
		<div>
			{isUsersLoading ? (
				<SidebarSkeleton /> // Use SidebarSkeleton component
			) : (
				<aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
					<div className="border-b border-base-300 w-full p-5">
						<div className="flex items-center gap-2">
							<Users className="size-6" />
							<span className="font-medium lg:block hidden">Contacts</span>
						</div>
					</div>

					<div className="overflow-y-auto w-full py-3">
						{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
						{users?.map((user: any, index) => (
							<div
								key={`${index + 1}`}
								onClick={() => setSelectedUser(user._id)}
								onKeyUp={() => setSelectedUser(user._id)}
							>
								<Card
									fullName={user.fullName}
									userStatus={"offline"}
									image={user.profilePic}
									sx={{ cursor: "pointer" }}
									selectedUser={selectedUser === user._id}
								/>
							</div>
						))}
					</div>
				</aside>
			)}
		</div>
	);
};

export default Sidebar;
