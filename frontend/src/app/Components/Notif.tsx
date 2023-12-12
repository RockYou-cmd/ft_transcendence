"use client"

import { useMe , useSocket } from '../Components/Log/LogContext'
import { useEffect, useState } from 'react';
import '../assest/navbar.css';



export default function Notif({content} : {content?: string}) {

	const [show, setShow] = useState(false);

	// useEffect(() => {
	// 	if (show){
	// 		const timer = setTimeout(() => {
	// 			setShow(false);
	// 		}, 5100);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [show]);

	return (
		<>
			<button onClick={()=>setShow(!show)}>show</button>

		{ show &&
			<div id="NotifBar">
				<h1>ibra has send friend request</h1>
				<button className="accept" onClick={()=>setShow(!show)} >Accept</button>
				<button className="reject" onClick={()=>setShow(!show)}>Cancel</button>
			</div>
		}
		</>
	)
}