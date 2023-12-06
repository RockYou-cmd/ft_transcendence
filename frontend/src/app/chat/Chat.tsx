import '../assest/chat.css';
import Image from 'next/image';
import { useEffect, useState, useRef, use } from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';
import Add from './Components/Add';
import GroupSettings from './Components/Group_settings';
import Confirm from './Components/Confirm';
import Invite from './Components/Invite';
import { Get } from '../Components/Fetch/post'
import { APIs } from '../Props/APIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import avatar from '../../../public/avatar.png';
import { Post } from '../Components/Fetch/post';
import { useLogContext, useSocket } from '../Components/Log/LogContext';
import OwnerSettings from './Components/Settings';
import { socket } from '../Components/Log/LogContext';
import { MouseEvent , KeyboardEvent } from 'react';
import StartChat from './Components/StartChat';

function Leave(GroupId : any){
	const res = Post({id: GroupId?.id}, APIs.LeaveRoom);
	
}

function Block(User : any){
	const res = Post({id: User?.id}, APIs.Block);
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



export default function Cnvs({ User, Role, OptionHandler }: { User: any, Role: any, OptionHandler :any}) {

	const socket = useSocket();
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
		if (chat?.username != undefined){
			name = chat?.username;
			setGroup(false);
			Role("");
			setRole("");
			Api = APIs.getChat + name;
		}
		else{
			name = chat?.name;
			setGroup(true);
			Api = APIs.RoomChat + chat?.id;
		}
		const data = await Get(Api);
		setChat(data);
		if (chat?.name){
			Role(data?.members[0]?.role);
			setRole(data?.members[0]?.role);
		}
	}
	

	useEffect(() => {
		if (Object.keys(User).length != 0)
			getChat(User);
	}, [User, refresher])


	const visible = useRef(null) as any;
	
	async function send(e : (MouseEvent | KeyboardEvent)) {
		if (e.type == "click" || (e.type == "keydown" && ((e as KeyboardEvent).key == "Enter" as any ))){
			const data = { message: input, username: User.username };
			const msg = {content : input, snederId : ""}
			// const res = await Post(data, APIs.sendMsg);
			setInput("");
			setChat((chat: { messages: any; }) => ({ ...chat, messages: [...chat.messages, msg]}));
			socket.emit("message",  {message : input});
		}
		
		// setRefresher(!refresher);
	}
	
	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollTop = scroll.current.scrollHeight;
		}
	}, [chat]);

	useEffect(() => {
		socket.on("message", (data: any) => {
			console.log("data", data);
			setChat((chat: { messages: any; }) => ({ ...chat, messages: [...chat.messages, data]}));
		})

		return () => {
			socket.off("message");
		};
	}, [socket]);

	function PrintMsg(msgs: any) {

		const msg = msgs?.msgs;
		const message = <>
			<div className={msg?.senderId == User.username ? "usr_msg" : "my_msg"}>
				<p>{msg?.content}</p>
				{/* <span >{msg?.createdAt}</span> */}
				<div className='triangle'></div>
			</div>
		</>
		return <div>{message}</div>

	}

	return (
		<>

			<div className="Chat">
			{Object.keys(User).length != 0 ? <>
				<section className='User'>

					<Image className='g_img' src={User?.photo ? User?.photo : avatar} priority={true} alt="img" width={75} height={75} />
					<h1 onClick={() => {User?.username ? router.push("/users/" + User?.username) : null}}>{User?.username ? User?.username : User?.name}</h1>
					<span>{User?.username ? (User?.status ? "online" : "offline") : null}</span>
					<div className="line"></div>
					{User?.status && <div className="status"></div>}

					{Object.keys(User).length != 0 && <button ref={visible} onClick={() => { setOption(!option) }} className="Options">
						<div className='point'></div><div className='point'></div><div className='point'></div>
					</button>}
					{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={content}/>}
				</section>
				<div className="Msg" ref={scroll}>
					{chat?.messages?.map((msg: any, index : number) => (<PrintMsg key={index} msgs={msg} />))}
				</div>
				<div className="Send" >
					<div className="line"></div>
					<section>
						<input type="text" placeholder="Type a message" value={input} onChange={(e) =>{ setInput(e.target.value) }} onKeyDown={(e : KeyboardEvent)=>send(e)} />
						<input ref={msgImg} className='sendImg' type="file" /><FontAwesomeIcon icon={faCamera} className="icon" />
					</section>
					<button onClick={(e : MouseEvent)=>send(e)}><div></div></button>
				</div></> : null}
			</div>	
			
			
			
		</>

	)
}
