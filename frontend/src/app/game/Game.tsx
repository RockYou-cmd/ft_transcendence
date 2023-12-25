
import Canvas from "./canvas"
import '../assest/game.css';
import { useMe, useSocket } from "../Components/Log/LogContext";
import { useEffect, useState ,useRef } from "react";
import Image from 'next/image';
import { APIs } from "../Props/APIs";
import avatar from '../../../public/avatar.png';
import { MouseEvent } from "react";
import GameSettings from "./Components/gameSettings";
import PingPong from "./Components/PingPong";

export default function Game({Mode, setMode, setGame} : {Mode : string, setMode : any, setGame : any}){
	
	const { me, setMe } = useMe() as any;
	const [map, setMap] = useState("shark");
	const { socket } = useSocket();
	const [setting, setSetting] = useState(true);
	const [ballColor, setBallColor] = useState("white");
	const [paddleColor, setPaddleColor] = useState("white");
	const [startGame, setStart] = useState(false);
	const player1 = useRef("");
	const player2 = useRef("");
	const roomName = useRef("");
	

	function MatchMaking(){
		
		async function startgame(e : MouseEvent){
			e.preventDefault();
			socket?.emit("matchmaking", {});
		}

		useEffect(() => {
			socket?.on("start", (data: any) => {
				setStart(true);
				player1.current = data.player1;
				player2.current = data.player2;
				console.log(" in play Rank player1", data.player1, "player2", data.player2);
				roomName.current = data.roomName;
				if (data.player1 == me.username){
					socket?.emit("start", data);
					console.log("start game", me.username);
				}
			})

			return () => {socket?.off("start"), ()=>{}}
		},[socket])

		
		return(
			<>
				<div className="MatchMaking">
					<h1>FINDING PLAYER</h1>

					<section>
						<Image className="g_img" src={me?.photo ? me.photo : avatar} priority={true} alt="img" width={60} height={60}/>
						<h1>VS</h1>
						<Image className="g_img" src={avatar} priority={true} alt="img" width={60} height={60}/>					
					</section>
					<button onClick={startgame} className='bg-green-500 text-white p-2 rounded m-5'> PLAY</button>
				</div>
			</>
		)
	}

	useEffect(() => {
		if (!setting)
			setGame(true);
	},[setting])
	
	return(
		<>
		{ setting ? <GameSettings Map={setMap} Ball={setBallColor} Paddle={setPaddleColor} close={setSetting} setMode={setMode}/> :

			<div className="GamePage">


				{Mode == "computer" && <Canvas COM={true} Map={map} ballColor={ballColor} paddleColor={paddleColor} />}
				<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => {console.log("back to black", roomName.current);socket?.emit("leaveMatch", {roomName : roomName.current});setMode("");}}> BACK</button>
				{Mode == "rank" && !startGame && <MatchMaking />}
				{startGame && <PingPong map={map} ballColor={ballColor} paddleColor={paddleColor} PLAYER1={player1.current} PLAYER2={player2.current} close={setMode}/>}
			</div>
		}
		</>
	)
}