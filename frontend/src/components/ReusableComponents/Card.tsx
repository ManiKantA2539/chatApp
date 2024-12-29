interface Card {
	fullName: string | null;
	userStatus: string | null;
	image: string | null;
	sx?: React.CSSProperties; // Add sx prop
	selectedUser?: boolean;
	header?: boolean;
}

const Card: React.FC<Card> = ({
	fullName,
	userStatus,
	image,
	selectedUser,
	sx,
}) => {
	return (
		<>
			<div
				className={`flex flex-row w-full p-3 items-center gap-3 ${typeof selectedUser === "boolean" ? "hover:bg-base-300" : ""} 
					transition-colors ${selectedUser ? "bg-base-300 ring-1 ring-base-300" : ""} `}
				style={sx}
			>
				<div className="relative">
					<img
						src={image ? image : "src/assets/react.svg"}
						alt="img"
						className={`rounded-full size-${sx ? "12" : "8"} bg-black object-cover ring-2 ring-gray-500`}
					/>
					{userStatus === "online"&&(
						<span
							className="absolute bg-green-500 size-3 bottom-0 right-0 rounded-full ring-2 ring-zinc-900"
						/>
					)}
				</div>
				<div className="flex flex-col">
					<h3>{fullName}</h3>
					<p>{userStatus}</p>
				</div>
			</div>
		</>
	);
};

export default Card;
