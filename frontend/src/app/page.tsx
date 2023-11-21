"use client"
import React from 'react';
import Image from 'next/image';

import './assest/login.css';
import Link from 'next/link';
import Form from './profile/form';
import { MouseEvent } from 'react';
import CheckLogin from './Components/CheckLogin';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Loading_hook from './hooks/loading_hook';

export default function Home() {

	// var {log, render} = Form();
	const [wait, checkwait] = useState(false);
	const router = useRouter();
	const [sign, setSign] = useState(false);

	
	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setSign(true);
		router.push("/profile");
	}
	
	

	
	useEffect(() => {
		checkwait(true);
	}, []);



	if (!wait)
		return (<div>loading...</div>);

	return (
		<>
			<React.StrictMode>

				<h1 className='Ping'>Ping Pong</h1>
				{Cookies.get("access_token") == undefined && <button className='bg-black text-white p-2 rounded mt-12 ml-96 flex justify-center items-center' onClick={handleClick}>Sing In</button>}
			</React.StrictMode>
		</>
	)
}
