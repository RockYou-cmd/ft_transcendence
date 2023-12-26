
import Canvas from "./canvas"
import '../assest/game.css';
import { useMe, useSocket } from "../Components/Log/LogContext";
import { useEffect, useState ,useRef } from "react";
import Image from 'next/image';
import { APIs } from "../Props/APIs";
import avatar from '../../../public/avatar.png';
import { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function MatchMaking({GameInfo, close, setMode, startGame, friend} : {setMode :any ,GameInfo : any, close : any, startGame : any, friend? : boolean}){
	
	const { me, setMe } = useMe() as any;
	const { socket } = useSocket();
	const matchData = useRef({} as any);
	

		const n = useRef(false);
		useEffect(() => {
			if (n.current == false){
				console.log("matchmaking");
				socket?.emit("matchmaking", {});
			}
			n.current = true;
		},[]);

		
		useEffect(() => {
		

			socket?.on("start", (data: any) => {
		
				GameInfo(data);
				matchData.current = data;
				if (data.player1 == me.username){
					socket?.emit("start", data);
				}
				close(false);
				startGame(true);
			})
			return () => {socket?.off("start"), ()=>{}}
		},[socket])

		
	return(
		<>
			<div className="MatchMaking">
				<button id='backBtn' onClick={()=>{setMode("");close(true);
				socket?.disconnect();
				socket?.connect()}}><FontAwesomeIcon icon={faCircleLeft} id="icon" /></button>
				<h1>FINDING PLAYER</h1>

				<section>
					<Image className="g_img" src={me?.photo ? me.photo : avatar} priority={true} alt="img" width={60} height={60}/>
					<h1>VS</h1>
					<Image className="g_img" src={avatar} priority={true} alt="img" width={60} height={60}/>					
				</section>
				{/* <button onClick={startgame} className='bg-green-500 text-white p-2 rounded m-5'> PLAY</button> */}
			</div>
		</>
	)
}