
import avatar from "../../../public/bboulhan.jpg";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { GetData } from "./CheckLogin";
import { useEffect , useState } from "react";
import '../assest/navbar.css';


export default function Navbar() {

	const [data, setData] = useState({} as any);
	
	useEffect(() => {
		async function fetchData() {
			const data = await GetData("Navbar") as any;
			setData(data);
		}
		fetchData();
	}, []);

	return (
		<>
			<header className="header">
				<div>
					<Image id="avatar" src={avatar} alt="bboulhan" priority={true} width={60} height={60}></Image>
				</div>
				<nav className="nav">
					<Link href="./Profile" ><li> Profile</li></Link>
					<Link href="./chat" ><li> Chat</li></Link>
					<Link href="./game" ><li> Game</li></Link>
					<li>{data?.username}</li>
				</nav>
				
				<Logout />
			</header>

		</>
	);
}