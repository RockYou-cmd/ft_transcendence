



export default function ShowMsg({ msg, User }: { msg: any, User: any }) {
	return (
		<>
			<div className={msg?.receiverId !== User.username ? "usr_msg" : "my_msg"}>
				<p>{msg.content}</p>
				{/* <span>{msg?.receiverId}</span> */}
				<div className='triangle'></div>
			</div>
		</>
	);
};