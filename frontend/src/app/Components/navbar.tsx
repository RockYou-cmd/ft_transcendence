// "use client"
import avatar from "../../../public/avatar.jpeg";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { GetData } from "./CheckLogin";
import { useEffect, useRef, useState } from "react";
import '../assest/navbar.css';


export default function Navbar() {

	let photo = avatar;
	const [data, setData] = useState({} as any);
	useEffect(() => {
		async function fetchData() {
			const data = await GetData("Navbar") as any;
			setData(data);
			// 	setData({ ...data, photo: avatar});
			// else
			
		}

		fetchData();
	}, []);
	
	if (data?.photo != null){
		photo = data.photo;
	}
	
	return (
		<>
			<header className="header">
				<div>
					
					<Image id="avatar" src={photo} alt="username" priority={true} width={60} height={60}></Image>
				</div>
				<nav className="nav">
					<Link href="./profile" ><li> Profile</li></Link>
					<Link href="./chat" ><li> Chat</li></Link>
					<Link href="./game" ><li> Game</li></Link>
					<li>{data?.username}</li>
				</nav>

				<Logout />
			</header>

		</>
	);
}