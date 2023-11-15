"use client"
import React from 'react';
import Image from 'next/image';

import './assest/login.css';
import Link from 'next/link';
import Form from './Profile/form';
import { MouseEvent } from 'react';
import CheckLogin from './Components/CheckLogin';
import Cookies from 'js-cookie';
import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Loading_hook from './hooks/loading_hook';

export default function Home() {
	
	// var {log, render} = Form();
	const [wait , checkwait] = useState(false);
	const router = useRouter();
	const [sign, setSign] = useState(false);

	const { log, render } = Form();

	function handler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		console.log(log);
		setSign(true);
	}

	useEffect(() => {
		checkwait(true);
	},[]);

	
	if (log == true)
		router.push("/Profile");

	if (!wait)
		return(<div>loading...</div>);

	return (
		<>
			<React.StrictMode>

				<h1 className='Ping'>Ping Pong</h1>
				{/* <p>welcome <Link href="/Profile"> sign in</Link> </p> */}
				{Cookies.get("access_token") == undefined && !sign ? <button className="button" onClick={handler}>Sing In</button> : null}
				{sign ? render : null}
			
				{/* <Login /> */}
			</React.StrictMode>
		</>
	)
}
