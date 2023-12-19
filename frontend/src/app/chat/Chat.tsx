import '../assest/chat.css';
import Image from 'next/image';
import { useEffect, useState, useRef } from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';
import { Get } from '../Components/Fetch/Fetch'
import { APIs } from '../Props/APIs';
import { Message } from '../Props/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import avatar from '../../../public/avatar.png';
import { Post } from '../Components/Fetch/Fetch';
import { useLogContext, useSocket, useMe } from '../Components/Log/LogContext';
import { MouseEvent, KeyboardEvent } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { fileUploadFunction } from '../Components/Fetch/ImageCloudUpload';

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



export default function Cnvs({ User, Role, OptionHandler ,refresh }: { User: any, Role: any, OptionHandler: any , refresh : boolean}) {

	const { socket, setSocket } = useSocket();
	const ChatID = useRef("");
	const Room = useRef("");
	const { me, setMe } = useMe() as any;
	const status = useRef({ status : "", sender : ""});
	const scroll = useRef(null) as any;
	const [chat, setChat] = useState({} as any);
	const router = useRouter();
	const msgImg = useRef(null) as any;
	const [input, setInput] = useState("");
	const [option, setOption] = useState(false);
	const Muted = useRef({ mute: false, id: "" });

	//hooks for chat settings
	const [group, setGroup] = useState(false);
	const [role, setRole] = useState("ADMIN" || "OWNER" || "MEMBER" || "");
	const content: ChatOptions = (group ? (role == "OWNER" ? SuperSettings : AdminSettings) : chatSettings);



	async function getChat(channel: any) {
		let name = "";
		let Api = "";
		if (channel?.username != undefined) {
			name = channel?.username;
			setGroup(false);
			Room.current = "message";
			Role("");
			setRole("");
			Api = APIs.getChat + name;
		}
		else {
			name = channel?.name;
			setGroup(true);
			Room.current = "roomMessage";
			Api = APIs.RoomChat + channel?.id;
		}
		const data = await Get(Api);
		console.log("data  ", data);
		if (channel?.username && data?.chats[0]?.id == undefined) {
			const res = await Post({ username: channel?.username }, APIs.createChat);
			if (res.status == 201) {
				
				const datas = await res.json();
				status.current.status = datas?.friends[0]?.status;
				ChatID.current = datas?.chats[0]?.id;
				setChat(datas?.chats[0]);
				
			}
		}
		else{
			if (channel?.username != undefined){
				setChat(data?.chats[0]);
				ChatID.current = data?.chats[0]?.id;
				status.current.status = data?.friends[0]?.status;
			}
			else{
				setChat(data);
				ChatID.current = channel?.id;
				
			}
		}

		if (channel?.name) {
			Role(data?.members.filter((member: any) => member?.userId == me?.username)[0]?.role);
			setRole(data?.members.filter((member: any) => member?.userId == me?.username)[0]?.role);
			if (data?.members.filter((member: any) => member?.userId == me?.username)[0]?.status == "MUTED") {
				Muted.current = { mute: true, id: channel?.id };	
			}
		}	
	}

	// console.log("block", status.current.status);

	useEffect(() => {
		if (Object.keys(User).length != 0)
			getChat(User);
	}, [refresh])

	useEffect(() => {
		async function fetchData() {
			const data = await Get(APIs.getChat + User?.username);
			// setChat(data?.chats[0]);
			status.current.status = data?.friends[0]?.status;
		}
		if (chat && Object.keys(chat).length != 0) {
			fetchData();
		}
	}, [refresh])
	
	
	const visible = useRef(null) as any;

	async function send(e: MouseEvent | KeyboardEvent) {
		if (
			e.type === "click" ||
			(e.type === "keydown" && (e as KeyboardEvent).key === "Enter")
		) {
			if ((input !== "" || msgImg.current?.files[0] != undefined)) {
				let img : string = "";
				if (msgImg.current?.files[0] != undefined)
					img = await fileUploadFunction(msgImg.current.files[0]);
				
					const s = img ? img : input;
				const msg = { content: s, senderId: me?.username };

				if (Muted.current.mute == false && status.current.status != "BLOCKED"){

					setChat((chat: { messages: any }) => ({
						...chat,
						messages: [...chat.messages, msg],
					}));
				}

				const message: Message = {
					type : "message",
					content: s,
					sender: me?.username,
					chatId: ChatID.current,
				};
				if (!group && status.current.status != "BLOCKED") {
					socket.emit(Room.current, { ...message, receiver: User?.username });
				} else if (group && Muted.current.mute == false){
					socket.emit(Room.current, { ...message, receivers: chat?.members });
				}
				else{
					if (group && Muted.current.mute == true)
						alert ("You are muted in this group");
					else
						alert("You are blocked by this user");	
				}
			}
			setInput("");
			msgImg.current.value = null;
		}
	}
	// console.log("");
	
	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollTop = scroll.current.scrollHeight;
		}
		socket?.on("update", (data: any) => {
			// console.log("update  ", data);
			if (data?.option == "Mute" && data?.groupId == ChatID.current && data?.receiver == me?.username) {
				Muted.current = { mute: true, id: data?.groupId };
			}
			else if (data?.option == "block" && data?.receiver == me?.username) {
				status.current.status = "BLOCKED";
			}
		});
		socket?.on("muted",(data : any) =>{
			
			if (data?.chatId == ChatID.current){
				Muted.current = { mute: true, id: data?.chatId };
			}
		});
		socket?.on(Room.current, (data: any) => {
			const msg = { content: data.content, senderId: data.sender, chatId: data.chatId }
			if (data?.chatId == ChatID.current) {
				setChat((chat: { messages: any; }) => ({ ...chat, messages: [...chat.messages, msg] }));
			}
		})
		return () => {
			socket?.off(Room.current);
		};
	}, [socket, chat]);

	function PrintMsg(msgs: any) {
		const msg = msgs?.msgs;

		const message = <>
			<div className={msg?.senderId == me.username ? "my_msg" : "usr_msg"}>
				{msg?.senderId != me?.username && <h4>{msg?.senderId}</h4>}
				<section>
					{
						(msg?.content as string).includes("https://res.cloudinary.com") ? <Image src={msg?.content} alt='img' width={100} height={100} style={{width: "fit-content" , height : "fit-content"}}/> : <p>{msg?.content}</p>
					}
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
				<span>{User?.username ? User?.status : null}</span>
				<div className="line"></div>
				{User?.status == "ONLINE" && <div className="status"></div>}

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
