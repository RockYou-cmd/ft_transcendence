// "use client"
import React from "react";
import avatar from "../../../public/bboulhan.jpg";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import GetCookie from "./Cookies";
// import { useState, useEffect } from "react";

export default function Navbar(){
	
	// const hasCookie = GetCookie();
	// if (hasCookie == false)
	// 	return (<></>);

	
	return (
		<>
			<header className="header">
				<div>
					<Image id="avatar" src={avatar} alt="bboulhan" priority={true} width={60} height={60}></Image>
				</div>
				<nav className="nav">
					<li><Link href="./login" > Profile</Link></li>
					<li><Link href="./chat" > Chat</Link></li>
					<li><Link href="./game" > game</Link></li>
				</nav>
				{/* <button id="logout" onClick={(e)=> {e.preventDefault(); document.cookie.replace("username", "")}}>Logout</button> */}
				<Logout />
			</header>

		</>
	);
}