import '../assest/chat.css';
import Image from 'next/image';
import { useEffect, useState, useRef } from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';
import { Get } from '../Components/Fetch/Fetch'
import { APIs } from '../Props/APIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import avatar from '../../../public/avatar.png';
import { Post } from '../Components/Fetch/Fetch';
import { useLogContext, useSocket, useMe } from '../Components/Log/LogContext';
import { MouseEvent, KeyboardEvent } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function Leave(GroupId: any) {
	const res = Post({ id: GroupId?.id }, APIs.LeaveRoom);

}

function Block(User: any) {
	const res = Post({ id: User?.id }, APIs.Block);
}


const chatSettings: ChatOptions = { Option: ["invite", "block", "view"], desc: ["invite for a game", "Block user", "View profile"] };

const AdminSettings: ChatOptions = {
	Option: ["leave", "see"],
	desc: ["Leave Group", "See Members"]
};
const SuperSettings: ChatOptions = {
	Option: ["leave", "see", "settings"],
	desc: ["Leave Group", "See Members", "Group Settings"]
};



export default function Cnvs({ User, Role, OptionHandler }: { User: any, Role: any, OptionHandler: any }) {

	const { socket, setSocket } = useSocket();
	const { me, setMe } = useMe() as any;
	const [refresher, setRefresher] = useState(false);
	const scroll = useRef(null) as any;
	const [chat, setChat] = useState({} as any);
	const router = useRouter();
	const msgImg = useRef(null) as any;
	const [input, setInput] = useState("");
	const [option, setOption] = useState(false);

	//hooks for chat settings
	const [group, setGroup] = useState(false);
	const [role, setRole] = useState("ADMIN" || "OWNER" || "MEMBER" || "");
	const content: ChatOptions = (group ? (role == "OWNER" ? SuperSettings : AdminSettings) : chatSettings);



	async function getChat(chat: any) {
		let name = "";
		let Api = "";
		if (chat?.username != undefined) {
			name = chat?.username;
			setGroup(false);
			Role("");
			setRole("");
			Api = APIs.getChat + name;
		}
		else {
			name = chat?.name;
			setGroup(true);
			Api = APIs.RoomChat + chat?.id;
		}
		const data = await Get(Api);
		if (data?.id == undefined) {
			const res = await Post({ username: chat?.username }, APIs.createChat);
			if (res.status == 201) {
				const data = res.json();
				setChat(data);
			}
		}
		else
			setChat(data);

		if (chat?.name) {
			Role(data?.members[0]?.role);
			setRole(data?.members[0]?.role);
		}


	}


	useEffect(() => {
		if (Object.keys(User).length != 0)
			getChat(User);
	}, [User])


	const visible = useRef(null) as any;

	async function send(e: (MouseEvent | KeyboardEvent)) {
		if (e.type == "click" || (e.type == "keydown" && ((e as KeyboardEvent).key == "Enter" as any))) {
			const msg = { content: input, senderId: me?.username }
			// const res = await Post(data, APIs.sendMsg);
			if (input != "") {
				setInput("");
				setChat((chat: { messages: any; }) => ({ ...chat, messages: [...chat.messages, msg] }));
				let message: Object;
				if (chat?.id)
					message = { content: input, sender: me?.username, receiver: User?.username, chatId: chat?.id }
				else
					message = { content: input, sender: me?.username, receiver: User?.name }

				socket.emit("message", message);
				console.log("chat id in send ", chat?.messages[0]?.chatId);
			}

		}

	}

	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollTop = scroll.current.scrollHeight;
		}
		socket.on("message", (data: any) => {
			const msg = { content: data.content, senderId: data.sender, chatId: data.chatId }
			// console.log("data id",  data.chatId);
			// console.log("chat id", chat?.messages[0]?.chatId);
			if (data?.chatId == chat?.chatId) {
				setChat((chat: { messages: any; }) => ({ ...chat, messages: [...chat.messages, msg] }));
			}
		})
		return () => {
			socket.off("message");
		};
	}, [socket, chat]);

	function PrintMsg(msgs: any) {
		const msg = msgs?.msgs;

		const message = <>
			<div className={msg?.senderId == me.username ? "my_msg" : "usr_msg"}>
				{msg?.senderId != me?.username && <h4>{msg?.senderId}</h4>}
				<section>

					<p>{msg?.content}</p>
				</section>
				{/* <span >{msg?.createdAt}</span> */}
				<div className='triangle'></div>
			</div>
		</>
		return <div>{message}</div>

	}

	return (
		<>

			<section className='User'>

				<Image className='g_img' src={User?.photo ? User?.photo : avatar} priority={true} alt="img" width={75} height={75} />
				<h1 onClick={() => { User?.username ? router.push("/users/" + User?.username) : null }}>{User?.username ? User?.username : User?.name}</h1>
				<span>{User?.username ? (User?.status ? "online" : "offline") : null}</span>
				<div className="line"></div>
				{User?.status && <div className="status"></div>}

				{Object.keys(User).length != 0 && <button ref={visible} onClick={() => { setOption(!option) }} className="Options">
					<div className='point'></div><div className='point'></div><div className='point'></div>
				</button>}
				{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={content} />}
			</section>
			<div className="Msg" ref={scroll}>
				{chat?.messages?.map((msg: any, index: number) => (<PrintMsg key={index} msgs={msg} />))}
			</div>
			<div className="Send" >
				<div className="line"></div>
				<section>
					<input type="text" placeholder="Type a message" value={input} onChange={(e) => { setInput(e.target.value) }} onKeyDown={(e: KeyboardEvent) => send(e)} />
					<input ref={msgImg} className='sendImg' type="file" /><FontAwesomeIcon icon={faCamera} className="icon" />
				</section>
				<button onClick={(e: MouseEvent) => send(e)}><FontAwesomeIcon icon={faPaperPlane} style={{
					width: "20px",
					height: "20px"
				}} /></button>
			</div>

		</>

	)
}
