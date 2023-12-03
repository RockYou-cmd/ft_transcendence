"use client";

import Navbar from '../Components/navbar';
import '../assest/game.css';
import Canvas from "./canvas";
import { MouseEvent, use } from 'react';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import LoG from '../Components/Log/Log';



export default function Game() {
	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	const [opp, setOpp] = useState("");
	const [play, setPlay] = useState(false);

	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },
		waitHook: { state: wait, setState: checkwait },
	}

	const clickHandler = (e: MouseEvent, choice: string) => {
		e.preventDefault();
		setOpp(choice);
		setPlay(true);
	};



	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	useEffect(() => {
		hooks.waitHook.setState(true);
	}, []);


	if (!hooks.waitHook.state) {
		return (<div>loading...</div>)
	}


	return (
		<>
			{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render :
				(<>
					<div className='GameMain'>

						<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "computer") }}> play with the computer</button>
						<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "invite") }}> play with the frined</button>
						<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "rank") }}> play rank</button>
						{/* {opp == "computer" && <Canvas/>} */}

						{play == true ? (opp == "computer" ? <Canvas COM={true} /> : <Canvas COM={false} />) : null}
					</div>
				</>)}
		</>
	)
}