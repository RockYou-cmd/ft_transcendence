"use client"

import { useMe , useSocket } from '../Components/Log/LogContext'
import { useEffect, useState } from 'react';
import '../assest/navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Msg{
	content : string,
	sender : string,
	chatId : string,
}

export default function Notif({content} : {content?: string}) {

	const [show, setShow] = useState(false);
	const { socket, setSocket } = useSocket();
	const [msg, setMsg] = useState<Msg>();
	const router = useRouter();
	// const [Reply, setReply] = useState(false);
	const { me, setMe } = useMe() as any;

	useEffect(() => {
		if (show){
			const timer = setTimeout(() => {
				setShow(false);
			}, 5100);
			return () => clearTimeout(timer);
		}
	}, [show]);

	useEffect(() => {
		console.log("socket",socket)
		if (socket) {
			socket.on("message", (data: any) => {
				setMsg(data);
				setShow(true);
			})
			console.log("on");
		}
		return () => {
			socket?.off("message");
			console.log("off");
		}
	}, [socket]);

	console.log("show ", show);

	// <Link href={"/chat/?user=" + msg?.sender} >Reply</Link>
	return (
		<>
			{/* <button onClick={()=>setShow(!show)}>show</button> */}

		{ show &&
			<div id="NotifBar">
				<h1>{msg?.sender} : {msg?.content}</h1>
				<section>
					<button className="accept" onClick={()=>setShow(false)}><Link href={"/chat/?user=" + msg?.sender} >Reply</Link></button>
					<button className="reject" onClick={()=>setShow(false)} >Cancel</button>
				</section>


			</div>
		}
		</>
	)
}