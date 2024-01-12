"use client"
import React from 'react';
import './assest/login.css';
import { useState } from 'react';
import Profile from './profile/profile';
import Home from './profile/home';
import LoG from './Components/Log/Log';
import { useLogContext } from './Components/Log/LogContext';
import Loading from './loading';


export default function App() {
	const { online} = useLogContext();
	const [SignIn, setSignIn] = useState(false);
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}
	
	let render = LoG({ page: "Profile", LogIn: hooks, back : setSignIn }) as any;
	
	
	if (!hooks.waitHook.state) {
		return (<Loading />)
	}
	return (
		<>

			{/* <Head>
				<link rel="icon" type="image/x-icon" href="./favicon.ico"></link>
			</Head> */}

			<div>
				{online == "OFF" ? (!SignIn && online == "OFF" ? <Home setSignIn={setSignIn} /> : render) : <Profile User={""} />}
			</div>
		</>
	)
}
