"use client"
import React from 'react';
import Image from 'next/image';
import RootLayout from './layout';
import './assest/login.css';
import { MouseEvent } from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Profile from './profile/profile';
import Home from './profile/home';
import LoG from './Components/Log/Log';
import { useLogContext } from './Components/Log/LogContext';
import Loading from './loading';
import favicon from '/..favicon.ico';
import Head from 'next/head';






export default function App() {
	const { online, setOnline } = useLogContext();
	const [SignIn, setSignIn] = useState(false);
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}
	
	let render = LoG({ page: "Profile", LogIn: hooks, back : setSignIn }) as any;
	
	// console.log(online);
	
	if (!hooks.waitHook.state) {
		return (<Loading />)
	}
	return (
		<>
			<Head>
				<link rel="icon" type="image/x-icon" href="./favicon.ico"></link>

			</Head>

			<div>
				{online == "OFF" ? (!SignIn && online == "OFF" ? <Home setSignIn={setSignIn} /> : render) : <Profile User={""} />}
			</div>
			{/* {SignIn && <button className='bg-black text-white p-2 rounded mt-12 ml-96 flex justify-center items-center' onClick={() => setSignIn(false)}>back</button>} */}
		</>
	)
}
