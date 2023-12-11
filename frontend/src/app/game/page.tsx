"use client";
;
import '../assest/game.css';
import Canvas from "./canvas";
import { MouseEvent, use } from 'react';
import { useState, useEffect, useRef } from 'react';
import LoG from '../Components/Log/Log';
import { useLogContext } from '../Components/Log/LogContext';
import Loading from '../loading';
import LeaderBoard from './Components/LeaderBoard';
import Game from './Game';



export default function GamePage() {
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	const [opp, setOpp] = useState("");
	const { online, setOnline } = useLogContext();

	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}

	const clickHandler = (e: MouseEvent, choice: string) => {
		e.preventDefault();
		setOpp(choice);
	};



	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	if (!hooks.waitHook.state) {
		return (<Loading />)
	}


	return (
		<>
			{online == "OFF" ? render :
				(<>
					{opp == "" ? <div className='GameMain'>
						
						<LeaderBoard />
						
						<div className='gameMode'>
							<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "computer") }}> play with the computer</button>
							<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "invite") }}> play with the frined</button>
							<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "rank") }}> play rank</button>

						</div>
						<div className='online'>
						</div>

							
					</div>
					
					: <Game Mode={opp} setMode={setOpp}/> }

				</>)}
		</>
	)
}