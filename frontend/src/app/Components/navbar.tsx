"use client"
import avatar from "../../../public/avatar.jpeg";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { GetData } from "./CheckLogin";
import { useEffect, useRef, useState } from "react";
import '../assest/navbar.css';
import Cookies from "js-cookie";


export default function Navbar() {

	let photo = avatar;
	const [location, setLocation] = useState("");

	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	useEffect(() => {
		setLocation(window.location.pathname);
		async function fetchData() {
			const data = await GetData("Navbar") as any;
			setData(data);	
		}

		fetchData();
	}, []);

	useEffect(() => {
		checkwait(true);
		setLocation(window.location.pathname);
	}, []);


	if (data?.photo != null) {
		photo = data.photo;
	}
	
	if (!wait)
		return (<></>);

	if (location == "/" || Cookies.get("access_token") == undefined)
		return (<></>);
	return (
		<>
			<header id="header">
				<div>
					
					<Link href="/profile"><Image id="avatar" src={photo} alt="username" priority={true} width={60} height={60}></Image></Link>
				</div>
				<nav className="nav">
					<Link href="./profile" ><li> Profile</li></Link>
					<Link href="./chat" ><li> Chat</li></Link>
					<Link href="./game" ><li> Game</li></Link>
				</nav>

				<Logout />
			</header>

		</>
	);
}