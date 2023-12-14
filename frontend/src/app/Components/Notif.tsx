"use client"

import { useMe , useSocket , useSilence } from '../Components/Log/LogContext'
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
	const { silence, setSilence } = useSilence();
	const router = useRouter();
	// const [Reply, setReply] = useState(false);
	const { me, setMe } = useMe() as any;

	useEffect(() => {
		if (show){
			const timer = setTimeout(() => {
				setShow(false);
				setMsg({} as Msg);
			}, 5100);
			return () => clearTimeout(timer);
		}
	}, [show]);

	useEffect(() => {
		if (socket) {
			socket.on("message", (data: any) => {
				setMsg(data);
				if (!silence)
					setShow(true);
			})
		}
		return () => {socket?.off("message");}
	}, [socket]);

	// <Link href={"/chat/?user=" + msg?.sender} >Reply</Link>
	return (
		<>
			{/* <button onClick={()=>setShow(!show)}>show</button> */}

		{ show && !silence &&
			<div id="NotifBar">
				<h1>New Message</h1>
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