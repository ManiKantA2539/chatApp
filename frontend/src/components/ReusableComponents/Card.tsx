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
	console.log(sx);
	return (
		<>
			<div
				className={`flex flex-row w-full p-3 items-center gap-3 ${typeof selectedUser === "boolean" ? "hover:bg-base-300" : ""} 
					transition-colors ${selectedUser ? "bg-base-300 ring-1 ring-base-300" : ""} `}
				style={sx}
			>
				<img
					src={image ? image : "src/assets/react.svg"}
					alt=""
					className={`rounded-full size-${sx ? "12" : "8"} bg-black object-cover`}
				/>
				<div className="flex flex-col">
					<h3>{fullName}</h3>
					<p>{userStatus}</p>
				</div>
			</div>
		</>
	);
};

export default Card;
