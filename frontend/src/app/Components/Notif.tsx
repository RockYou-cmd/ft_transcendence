"use client"

import { useMe , useSocket } from '../Components/Log/LogContext'
import { useEffect, useState } from 'react';
import '../assest/navbar.css';
import Image from 'next/image';



export default function Notif({content} : {content?: string}) {

	const [show, setShow] = useState(false);
	const { socket, setSocket } = useSocket();

	// useEffect(() => {
	// 	if (show){
	// 		const timer = setTimeout(() => {
	// 			setShow(false);
	// 		}, 5100);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [show]);

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on("message", (data: any) => {
				
	// 			setShow(true);
	// 		})
	// 	}
	// }, [socket]);



	return (
		<>
			<button onClick={()=>setShow(!show)}>show</button>

		{ show &&
			<div id="NotifBar">
				<h1>ibra has send friend request</h1>
				<section>
					<button className="accept" onClick={()=>setShow(!show)} >Accept</button>
					<button className="reject" onClick={()=>setShow(!show)} >Cancel</button>
				</section>
			</div>
		}
		</>
	)
}