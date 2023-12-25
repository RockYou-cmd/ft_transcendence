"use client"

import { useMe , useSocket , useSilence } from '../Components/Log/LogContext'
import { useEffect, useState } from 'react';
import '../assest/navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

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
	const router = useRouter();
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
			socket.on("message" , (data: any) => {
				setMsg(data);
				if (!silence)
					setShow(true);
			})
			socket.on("update" , (data: any) => {
				if (data?.option == "request friend" || data?.option == "accept request"){
					setMsg(data);
					if (!silence)
						setShow(true);
				}
			})
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

	return (
		<>
			{/* <button onClick={()=>setShow(!show)}>show</button> */}

		{ show && !silence &&
			<div id="NotifBar">
				<h1>{msg?.type == "message" ? "New Message" : "New Notification"}</h1>
				<h1>{msg?.sender} : {msg?.content}</h1>
				<section>
					<button className="accept" onClick={(e :MouseEvent) => NotifEvent(e)} >{msg?.type == "message" ? "Reply" : "Open"}</button>
					<button className="reject" onClick={()=>setShow(false)} >Close</button>
				</section>


			</div>
		}
		</>
	)
}