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



export default function App() {

	const { online, setOnline } = useLogContext();
	const [SignIn, setSignIn] = useState(false);
	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },
		waitHook: { state: wait, setState: checkwait },
	}

	// const {SignIn, homeRender} = Home();
	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	useEffect(() => {
		hooks.waitHook.setState(true);
	}, []);

	useEffect(() => {
		if (online != "ON") {
			hooks.logInHook.setState(false);
		}
	}, [online]);

	if (!hooks.waitHook.state) {
		return (<div>loading...</div>)
	}
	return (
		<>
			<div>
				{!hooks.logInHook.state && Cookies.get("access_token") == undefined ? (!SignIn && (online == "ELSE" || online == "OFF") ? <Home setSignIn={setSignIn} /> : render) : <Profile user={""} />}
				{/* {!logIn  && Cookies.get("access_token") == undefined? (<>
				<h1 className='Ping'>Ping Pong</h1>
				<button className='bg-black text-white p-2 rounded mt-12 ml-96 flex justify-center items-center' onClick={()=>setLog(true)}>Sing In</button>
				</>) : render}
				
				{logIn && <Profile />} */}
			</div>
			{SignIn && <button className='bg-black text-white p-2 rounded mt-12 ml-96 flex justify-center items-center' onClick={() => setSignIn(false)}>back</button>}
		</>
	)
}
