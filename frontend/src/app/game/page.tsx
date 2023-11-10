"use client";


import '../assest/game.css';
import Canvas from "./canvas";
import Link from 'next/link';
import { MouseEvent, use } from 'react';
import { useState, useEffect, useRef} from 'react';




export default function Game(){
	// var opp = useRef("");
	const [opp, setOpp] = useState("");
	const [play, setPlay] = useState(false);


	const clickHandler = (e : MouseEvent, choice: string) => {
		e.preventDefault();
		setOpp(choice);
		setPlay(true);
	};


	return (
		<>
			<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "computer")}}> play with the computer</button>
			<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "invite")}}> play with the frined</button>
			<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => { clickHandler(e, "rank")}}> play rank</button>
			{/* {opp == "computer" && <Canvas/>} */}
			
			{ play == true ? (opp == "computer" ? <Canvas COM={true}/> : <Canvas COM={false}/>) : null}
			</>
	)
}