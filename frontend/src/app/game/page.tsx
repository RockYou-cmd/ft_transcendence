"use client";
;
import '../assest/game.css';
import Canvas from "./canvas";
import { MouseEvent, use } from 'react';
import { useState, useEffect, useRef } from 'react';
import LoG from '../Components/Log/Log';
import { useLogContext } from '../Components/Log/LogContext';
import Loading from '../loading';



export default function Game() {
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	const [opp, setOpp] = useState("");
	const [play, setPlay] = useState(false);
	const { online, setOnline } = useLogContext();

	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}

	const clickHandler = (e: MouseEvent, choice: string) => {
		e.preventDefault();
		setOpp(choice);
		setPlay(true);
	};



	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	if (!hooks.waitHook.state) {
		return (<Loading />)
	}


	return (
		<>
			{online == "OFF" ? render :
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