"use client";

import '../assest/game.css';
import Canvas from "./canvas";
import { MouseEvent, use } from 'react';
import { useState, useEffect, useRef } from 'react';
import LoG from '../Components/Log/Log';
import { useLogContext } from '../Components/Log/LogContext';
import Loading from '../loading';
import LeaderBoard from './Components/LeaderBoard';
import MatchMaking from './Game';
import GameMode from './Components/GameMode';
import GameSettings from './Components/gameSettings';
import PingPong from './Components/PingPong';


interface GameInfo {
	roomName: string,
	player1: string,
	player2: string,
}


export default function GamePage() {
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	const [inGame, setInGame] = useState(false);
	const [Mode, setMode] = useState("");
	const { online } = useLogContext();
	const [gameSet, setGameSet] = useState(true);
	const [matchMake, setMatchMake] = useState(false);
	const [gameInfo, setGameInfo] = useState<GameInfo>();
	const [Style, setStyle] = useState<any>({});
	
	const [gameSettings, setGameSettings] = useState({
		map : "shark",
		ballColor : "white",
		paddleColor : "white",
	})

	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}

	function setOptions(map : string, ballColor : string, paddleColor : string){
		setGameSettings({
			map : map,
			ballColor : ballColor,
			paddleColor : paddleColor,
		})
	}

	useEffect(() => {
		if (!gameSet && Mode != "rank" && Mode != "friend") {
			setMatchMake(false);
		}
		if (!gameSet && Mode == "computer") {
			setInGame(true);
		}
		if (!inGame && Mode == "")
			setGameSet(true);

		if (matchMake || (Mode != "" && gameSet) ) {
			setStyle({
				"filter": "blur(4px)",
				"opacity": "0.5",
				"pointerEvents": "none",
			});
		}
		else{
			setStyle({});
		}

	}, [gameSet, Mode, inGame, matchMake])
	


	// console.log("gameInfo", gameInfo);
	// console.log("gameSet", gameSet, "Mode", Mode, "matchMake", matchMake, "inGame", inGame);
	let render = LoG({ page: "Profile", LogIn: hooks }) as any;
	
	if (!hooks.waitHook.state) {
		return (<Loading />)
	}
	return (
		<>
			{online == "OFF" ? render :
				(<><div id="gameRootDir">

					{!inGame && <div className='GameMain' style={Style}>
					
						<LeaderBoard />
						<div className="GameMode">
							{ Mode == "" && <>
								<button onClick={()=>setMode("computer")}> PLAY VS COMPUTER</button>
								<button onClick={()=>setMode("friend")}> PLAY VS FRIEND</button>
								<button onClick={()=>setMode("rank")}> PLAY RANK</button>
								</>
							} 
						</div>

						<div className='online'>
						</div>

					</div>
					}

					{!inGame && Mode != "" && gameSet && <GameSettings setMode={setMode} save={setMatchMake} close={setGameSet} Options={setOptions} />}		
					{!inGame &&  Mode == "rank" && matchMake && <MatchMaking GameInfo={setGameInfo} close={setMatchMake} setMode={setMode} startGame={setInGame}/>}
					</div>

					{inGame && Mode == "computer" && <Canvas setMode={setMode} close={setInGame} gameSettings={gameSettings}/>}
					{inGame && Mode == "rank" && <PingPong gameSettings={gameSettings} gameInfo={gameInfo} close={setInGame} setMode={setMode}/>}
				</>)}
		</>
	)
}