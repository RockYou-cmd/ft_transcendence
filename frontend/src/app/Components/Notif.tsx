"use client"

import { useMe , useSocket } from '../Components/Log/LogContext'
import { useEffect, useState } from 'react';
import '../assest/navbar.css';



export default function Notif({content} : {content?: string}) {

	const [show, setShow] = useState(false);


	return (
		<>
			<button onClick={()=>setShow(!show)}>show</button>

		{ show &&
			<div id="NotifBar">
				<h1>ibra has send friend request</h1>
				<button className="accept">Accept</button>
				<button className="reject">Cancel</button>
			</div>
		}
		</>
	)
}