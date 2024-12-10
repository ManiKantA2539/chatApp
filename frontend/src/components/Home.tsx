import { useChat } from "../store/useChat";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import NoChatContainer from "./NoChatContainer";

const Home = () => {
	const { selectedUser } = useChat();
	return (
		<>
			<div className="h-screen bg-base-200">
				<div className="flex items-center justify-center gap-2 pt-10 px-4">
					<div className="bg-base-100 rounded-lg shadow-xl w-full h-[calc(100vh-8rem)]">
						<div className="flex flex-row h-full rounded-lg overflow-hidden">
							<Sidebar />
							{!selectedUser ? <NoChatContainer /> : <ChatContainer />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
