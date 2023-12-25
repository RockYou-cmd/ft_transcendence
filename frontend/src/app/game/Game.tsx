
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

export default function MatchMaking({GameInfo, close, setMode, startGame} : {setMode :any ,GameInfo : any, close : any, startGame : any}){
	
	const { me, setMe } = useMe() as any;
	const { socket } = useSocket();
	
	// const [startGame, setStart] = useState(false);
	
		
		// async function startgame(e : MouseEvent){
		// 	e.preventDefault();
		// }
		let n = 0;
		useEffect(() => {
			if (n == 0)
				socket?.emit("matchmaking", {});
			n++;
		},[]);

		
		useEffect(() => {
			// let n = 0;
			// if (n == 0)
			// 	socket?.emit("matchmaking", {});

			socket?.on("start", (data: any) => {
		
				console.log(" in play Rank player1", data.player1, "player2", data.player2);
				GameInfo(data);
				if (data.player1 == me.username){
					socket?.emit("start", data);
					console.log("start game", me.username);
				}
				close(false);
				startGame(true);
			})
			// n++;
			return () => {socket?.off("start"), ()=>{}}
		},[socket])

		
	return(
		<>
			<div className="MatchMaking">
				<button id='backBtn' onClick={()=>{setMode("");close(true);}}><FontAwesomeIcon icon={faCircleLeft} id="icon" /></button>
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