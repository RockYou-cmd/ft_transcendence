
import avatar from "../../../public/bboulhan.jpg";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import CheckLogin, { GetData } from "./CheckLogin";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect , useState } from "react";



export default function Navbar() {

	const [data, setData] = useState({} as any);
	// const data = GetData("Navbar", Cookies.get("user") || "") as any;
	console.log("navbar", data);


	useEffect(() => {
		async function fetchData() {
			const data = await GetData("Navbar", Cookies.get("user") || "") as any;
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
					<li><Link href="./Profile" > Profile</Link></li>
					<li><Link href="./chat" > Chat</Link></li>
					<li><Link href="./game" > game</Link></li>
					<li>{data.username}</li>
				</nav>
				{/* <button id="logout" onClick={(e)=> {e.preventDefault(); document.cookie.replace("username", "")}}>Logout</button> */}
				<Logout />
			</header>

		</>
	);
}