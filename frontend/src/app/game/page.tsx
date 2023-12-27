"use client";

import '../assest/game.css';
import Canvas from "./canvas";
import { MouseEvent, use } from 'react';
import { useState, useEffect, useRef } from 'react';
import LoG from '../Components/Log/Log';
import { useLogContext, useSocket, useMe } from '../Components/Log/LogContext';
import Loading from '../loading';
import LeaderBoard from './Components/LeaderBoard';
import MatchMaking from './Game';
import GameSettings from './Components/gameSettings';
import PingPong from './Components/PingPong';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SelectFriend from './Components/FriendlyGame';
import Invite from '../chat/Components/Invite';


interface GameInfo {
	roomName: string,
	player1: string,
	player2: string,
}


export default function GamePage() {
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState<boolean>(false);
	const [inGame, setInGame] = useState<boolean>(false);
	const [Mode, setMode] = useState<string>("");
	const { online } = useLogContext();
	const [gameSet, setGameSet] = useState<boolean>(true);
	const [matchMake, setMatchMake] = useState<boolean>(false);
	const [gameInfo, setGameInfo] = useState<GameInfo>();
	const [Style, setStyle] = useState<any>({});
	const { me } = useMe() as any;
	const d = useRef(false);
	const router = useRouter();
	const [selectedFriend, setSelectedFriend] = useState("");
	const invite = useRef(false);
	const [inviteComp, setInviteComp] = useState(false);

	const param = useSearchParams();
	const { socket } = useSocket();

	useEffect(() => {
		
		if (param.get("mode") != null){
			setMode(param.get("mode") as string);

		}

		if (param.get("player1") != null && param.get("player2") != null){
			setGameInfo({roomName : param.get("roomName") as string, player1 : param.get("player1") as string, player2 : param.get("player2") as string});
			setSelectedFriend(param.get("player2") as string);
			if (param.get("invite") == "true")
				invite.current = true;
			// console.log("invite", invite.current, "param", param.get("invite"));
		}
		router.replace("/game");
	},[])


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
		let datas : any = null;
		// if (param.get("player1") != null && param.get("player2") != null){
		// 	setGameInfo({roomName : param.get("roomName") as string, player1 : param.get("player1") as string, player2 : param.get("player2") as string});
		// 	setSelectedFriend(param.get("player2") as string);
		// 	if (param.get("invite") == "true")
		// 		invite.current = true;
		// 	router.replace("/game");
		// 	data = {roomName : param.get("roomName") as string, player1 : param.get("player1") as string, player2 : param.get("player2") as string};
		// }
		if(datas == null){
			socket?.on("invite", (data: any) => {
				console.log("invite", data);
				datas = data;
				setSelectedFriend(data?.player1);
				setInviteComp(true);
			});
		}
		

		if ((datas != null || gameInfo != undefined) && (gameInfo?.player2 == me?.username || datas?.player2 == me?.username) && !d.current){
			console.log("accept", gameInfo, datas);
			if (gameInfo)
				socket?.emit("accept", gameInfo);
			else if (datas)
				socket?.emit("accept", datas);
			d.current = true;

		}

		return () => {socket?.off("accept"), ()=>{}
			socket?.off("invite"), ()=>{}	
	}
	},[socket]);

	function FriendlyMatch(){
		console.log("whatttttttt");
		if (invite.current === false && selectedFriend != "" ){
			console.log("invite", selectedFriend);
			socket?.emit("invite", {player2 : selectedFriend, player1 : me?.username});
		}
		useEffect(() => {
			if (gameInfo?.player1 == me?.username){
				console.log("start player1", gameInfo);
				socket?.emit("start", gameInfo);
				setInGame(true);
			}
			socket?.on("start", (data: any) => {
				console.log("start data", data);
				setGameInfo(data);
				if (data?.player1 == me?.username){
					console.log("start player1 in data", data);	
					socket?.emit("start", data);
				}
				setInGame(true);
			})
	
			

			return () => {socket?.off("start"), ()=>{}}
		},[])
		return (<Loading />)
	}

	useEffect(() => {
		if (!gameSet && Mode != "rank" && Mode != "friend") {
			setMatchMake(false);
		}
		if (!gameSet && Mode == "computer") {
			setInGame(true);
		}
		if (!inGame && Mode == ""){
			invite.current = false;
			setGameInfo(undefined);
			setSelectedFriend("");
			setGameSet(true);
		}

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
		if (inGame)
			invite.current = false;
	}, [gameSet, Mode, inGame, matchMake])
	


	
	let render = LoG({ page: "Profile", LogIn: hooks }) as any;
	
	// console.log("invite", invite.current, "selectedFriend", selectedFriend, "gameSet", gameSet, "matchMake", matchMake, "inGame", inGame, "Mode", Mode);

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

					{!inGame && Mode != "" && (Mode == "friend" && selectedFriend == "" ? false : true) && gameSet && <GameSettings setMode={setMode} save={setMatchMake} close={setGameSet} Options={setOptions} />}		
					{!inGame && Mode == "rank" && matchMake && <MatchMaking GameInfo={setGameInfo} close={setMatchMake} setMode={setMode} startGame={setInGame} />}
					{!inGame && Mode == "friend" && matchMake &&  <FriendlyMatch/>}
					{!inGame && Mode == "friend" && !invite.current && selectedFriend == "" && !matchMake && <SelectFriend close={setMatchMake} setMode={setMode} select={setSelectedFriend}/>}
					{!inGame && inviteComp && <Invite User={selectedFriend} close={setInviteComp} data={gameInfo}/>}
					</div>

					{inGame && Mode == "computer" && <Canvas setMode={setMode} close={setInGame} gameSettings={gameSettings}/>}
					{inGame && (Mode == "rank" || Mode == "friend") && <PingPong gameSettings={gameSettings} gameInfo={gameInfo} close={setInGame} setMode={setMode}/>}
				</>)}
		</>
	)
}