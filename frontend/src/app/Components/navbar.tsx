"use client"
import avatar from "../../../public/avatar.jpeg";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Log/Logout";
import { GetData } from "./Log/CheckLogin";
import { useEffect, useRef, useState } from "react";
import '../assest/navbar.css';
import { useLogContext } from "./Log/LogContext";
import SearchBar from "./Fetch/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function Navbar() {

	let photo = avatar;
	const { online, setOnline } = useLogContext();

	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);

	async function fetchData() {
		const data = await GetData({Api : "Navbar", user: ""}) as any;
		setData(data);
	}

	useEffect(() => {
		checkwait(true);
		if (online == "ON") {
			fetchData();
		}
	}, [online]);


	if (data?.photo != null) {
		photo = data.photo;
	}

	if (!wait || online == "OFF")
		return (<></>);
	return (
		<>
			<header id="header" >
				<Link href="/"><Image id="avatar" src={photo} alt="username" priority={true} width={60} height={60}></Image></Link>
				<SearchBar title={"profile"} />
				<nav className="nav">

					{/* <div>
						<FontAwesomeIcon icon={["fas", "user"]} />
					</div> */}
					<Link href="/" ><li> Profile</li></Link>
					<Link href="/chat" ><li> Chat</li></Link>
					<Link href="/game" ><li> Game</li></Link>
				</nav>

				<Logout />
			</header>

		</>
	);
}