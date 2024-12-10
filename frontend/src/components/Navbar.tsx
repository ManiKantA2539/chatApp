import { Tooltip } from "@mui/material";
import { LogOut, MessagesSquare, Settings, User } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { authState, logOut } = useAuth();
	return (
		<>
			<div className="flex justify-between flex-row p-5 bg-transparent">
				<Link to="/">
					<div className="flex flex-row cursor-pointer">
						<MessagesSquare />
						<span className="mx-2">ChatApp</span>
					</div>
				</Link>
				<div className="flex flex-row items-center space-x-4">
					<Link to="/settings" className="flex items-center space-x-1">
						<Tooltip title="Settings">
							<Settings className="cursor-pointer" />
						</Tooltip>
						<span className="cursor-pointer">Settings</span>
					</Link>
					{authState && (
						<>
							<Link to="/profile" className="flex items-center space-x-1">
								<Tooltip title="Profile">
									<User className="cursor-pointer" />
								</Tooltip>
								<span className="cursor-pointer">Profile</span>
							</Link>
							<div
								className="flex items-center space-x-1 cursor-pointer"
								onClick={logOut}
							>
								<Tooltip title="Logout">
									<LogOut className="cursor-pointer" />
								</Tooltip>
								<span>Logout</span>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
