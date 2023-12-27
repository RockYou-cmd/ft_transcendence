"use client"

import { useMe , useSocket , useSilence } from '../Components/Log/LogContext'
import { useEffect, useState } from 'react';
import '../assest/navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import Invite from '../chat/Components/Invite';

// interface Msg{
// 	content : string,
// 	sender : string,
// 	chatId : string,

// }

export default function Notif({content} : {content?: string}) {

	const [show, setShow] = useState(false);
	const { socket, setSocket } = useSocket();
	const [msg, setMsg] = useState<any>();
	const { silence, setSilence } = useSilence();
	const [invite, setInvite] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	// const [Reply, setReply] = useState(false);
	const { me, setMe } = useMe() as any;

	useEffect(() => {
		Notification.requestPermission();
	},[]);
	useEffect(() => {
		if (show){
			if ('Notification' in window && Notification.permission == 'granted'){
				const notification = new Notification(msg?.type == "message" ? "New Message" : "New Notification", {
					body: msg?.sender + " : " + msg?.content,
					icon: "/logo.png",
					silent : false,
				});
				notification.onclick = (e) => {
					e.preventDefault();
					setShow(false);
					if (msg?.type == "friendship"){
						window.open("http://localhost:3000/users/" + msg?.sender);
					}
					else{
						window.open("http://localhost:3000/chat/?user=" + msg?.sender);
					}
				}
			}
			const timer = setTimeout(() => {
				setShow(false);
				setMsg({});
			}, 5100);
			return () => clearTimeout(timer);
		}
	}, [show]);

	useEffect(() => {
		if (socket) {
			// console.log("socket on");
			if (pathname != "/chat"){
				socket.on("message" , (data: any) => {
					setMsg(data);
					if (!silence && pathname != "/chat")
					setShow(true);
				})
			}
			if (pathname != "/game"){
				socket.on("invite", (data :any)=>{
					// console.log("oppp");
					setMsg(data);
					// if (!silence)
						setInvite(true);
				})
			}
			if(pathname != "/game"){
				socket.on("start", (data :any)=>{
					console.log("start game in notify", data)
					router.push("/game?roomName=" + data.roomName + "&player1=" + data.player1 + "&player2=" + data.player2 + "&mode=friend"+ "&invite=true");
				})
			}
			if (pathname != "/game"){

				socket.on("update" , (data: any) => {
					if (data?.option == "request friend" || data?.option == "accept request"){
						setMsg(data);
						if (!silence)
						setShow(true);
				}
			})
			}
		}
		return () => {socket?.off("message");
			socket?.off("update");
		}
	}, [socket, silence, show]);

	
	function NotifEvent(e :MouseEvent){
		e.preventDefault();
		setShow(false);
		if (msg?.type == "friendship"){
			router.push("/users/" + msg?.sender);
		}
		else{
			router.push("/chat/?user=" + msg?.sender);
		}
	}

	if (invite)
		return <Invite User={{username : msg.sender}} close={setInvite} data={msg}/>

	return (
		<>
			{/* <button onClick={()=>setShow(!show)}>show</button> */}

		{ show && !silence &&
			<div id="NotifBar">
				<h1>{msg?.type == "message" ? "New Message" : "New Notification"}</h1>
				<h1>{msg?.sender} : {msg?.content}</h1>
				<section>
					<button className="accept" onClick={(e :MouseEvent) => NotifEvent(e)} >{msg?.type == "message" ? "Reply" : "Open"}</button>
					<button className="reject" onClick={()=>setShow(false)} >Close</button>9
				</section>


			</div>
		}
		</>
	)
}