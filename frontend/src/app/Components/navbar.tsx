"use client"
import avatar from "../../../public/avatar.jpeg";
import Image from "next/image";
import Link from "next/link";
import Logout, { Disconnect } from "./Log/Logout";
import { GetData } from "./Log/CheckLogin";
import { useEffect, useRef, useState } from "react";
import '../assest/navbar.css';
import { useLogContext , useSocket, useMe, useSilence} from "./Log/LogContext";
import SearchBar from "./Fetch/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser ,faMessage , faTableTennisPaddleBall , faBell, faBellSlash} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

// import { WebSocket } from "./Log/LogContext";
// import { useContext } from "react";

export default function Navbar() {

	
	// const socket = useSocket();
	const {me, setMe} = useMe();
	const {silence, setSilence} = useSilence();
	const router  = useRouter();
	const {socket} = useSocket();
	

	let photo = avatar;
	const { online, setOnline } = useLogContext();

	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);

	async function fetchData() {
		const data = await GetData({Api : "Navbar", user: ""}) as any;
		if (data == undefined) {
			Disconnect({setOnline : setOnline, socket : socket, router : router});
		}
		setData(data);
		setMe(data);
	}

	useEffect(() => {
		checkwait(true);
		if (online == "ON") {
			console.log("fetching data");
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

					{/* <div> */}
					{/* </div> */}
						
					<Link href="/" ><li><FontAwesomeIcon icon={faUser} className="NavbarIcons"/>Profile</li></Link>
					<Link href="/chat"><li><FontAwesomeIcon icon={faMessage} className="NavbarIcons" /> Chat</li></Link>
					<Link href="/game"><li><FontAwesomeIcon icon={faTableTennisPaddleBall} className="NavbarIcons"  /> Game</li></Link>
				</nav>
				 
				<button className="NotifBtn absolute right-40 top-10" onClick={()=>setSilence(!silence)}>
				{silence == false ? <FontAwesomeIcon icon={faBell} className="icon" /> : <FontAwesomeIcon icon={faBellSlash} className="icon" style={{color : "#ff2638"}}/>}
				</button>
				<div className="absolute right-8 top-7 ">

				<Logout />
				</div>
			</header>

		</>
	);
}