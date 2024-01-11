"use client";

import '../assest/game.css';
import Canvas from "./canvas";
import { MouseEvent } from 'react';
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
import React from 'react';
import swal from 'sweetalert';
import MatchHistory from '../Components/profile/matchHistory';
import { GetData } from '../Components/Log/CheckLogin';
import { get } from 'http';

interface GameInfo {
	roomName: string,
	player1: string,
	player2: string,
	photo?: string,
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
	const [accept, setAccept] = useState("");
	const [endGame, setEndGame] = useState(true);
	const [send, setSend] = useState(false);
	
	const param = useSearchParams();
	const { socket } = useSocket();
	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}
	
	let render = LoG({ page: "Profile", LogIn: hooks }) as any;
	const f = useRef(false);

	useEffect(() => {
		let n = false;
		
		if (!gameSet && Mode != "rank" && Mode != "friend") {
			setMatchMake(false);
		}
		if (!gameSet && Mode == "computer") {
			setInGame(true);			
		}
		if (!inGame && Mode == "" && !f.current){

			invite.current = false;
			setGameInfo(undefined);
			setSelectedFriend("");
			setGameSet(true);
			setAccept("");
			f.current = true;
			d.current = false;
			n = true;
			socket?.emit("update", {option : "refuse", receiver : gameInfo?.player1, sender : gameInfo?.player2});
		}
		if (Mode != "" && (matchMake || gameSet)){
			f.current = false;
		}
	
		if (matchMake || (Mode != "" && gameSet) || inviteComp) {
			setStyle({
				"filter": "blur(4px)",
				"opacity": "0.5",
				"pointerEvents": "none",
			});
		}
		else{
			setStyle({});
		}
	
		if (inGame){
			f.current = false;
			invite.current = false;
		}

		if (!inviteComp && accept == "refused"){
			setSelectedFriend("");
			setGameInfo(undefined);
			setMode("");
			setAccept("");
			invite.current = false;
		}
		else if (!inviteComp && accept == "accepted" && !n){
			setMode("friend");
		}
	}, [gameSet, inGame, matchMake, Mode ,inviteComp, accept, endGame]);

	useEffect(() => {	
		if (param.get("player1") != null && param.get("player2") != null){
			setMode(param.get("mode") as string);
			const data = {roomName : param.get("roomName") as string, player1 : param.get("player1") as string, player2 : param.get("player2") as string};
			GetOpp(data);
			// setGameInfo({roomName : param.get("roomName") as string, player1 : param.get("player1") as string, player2 : param.get("player2") as string});
			setSelectedFriend(param.get("player2") as string);
			if (param.get("invite") == "true")
			invite.current = true;
	}
	router.replace("/game");
	},[])
	

	async function GetOpp( data : any){
		const name = data.player1 == me?.username ? data.player2 : data.player1;
		const Opp = await GetData({ Api: "User", user: name });
		const matchInfo = data;
		matchInfo.photo = Opp?.photo;
		setGameInfo(matchInfo);
	}

	useEffect(() => {

		socket?.on("invite", (data: any) => {
			if (inGame){
				socket?.emit("update", {option : "refuse", receiver : data.player1, sender : data.player2});
				return;
			}
			else{

				invite.current = true;

				setMode("");
				setInviteComp(true);

				// setGameInfo(data);
				GetOpp(data);
				setSelectedFriend(data.player1);
			}
			
		});
		socket?.on("start", (data: any) => {
			if (inGame) return;
			if (Mode == "friend"){
				GetOpp(data);
			}
			else{
				setGameInfo(data);
			}
		});
	
				
		return () => {socket?.off("invite"), ()=>{}}
	},[socket, accept, inGame]);


	const [gameSettings, setGameSettings] = useState({
		map : "shark",
		ballColor : "white",
		paddleColor : "white",
	})


	function setOptions(map : string, ballColor : string, paddleColor : string){
		setGameSettings({
			map : map,
			ballColor : ballColor,
			paddleColor : paddleColor,
		})
	}
	
	



	function FriendlyMatch(){
		const [refuse, setRefuse] = useState(false);
		
		if (send && !inGame && gameInfo?.player1 == me?.username){
			socket?.emit("invite", gameInfo);
		}
		useEffect(() => {
			if (gameInfo?.player2 == me?.username && !d.current){
				socket?.emit("accept", gameInfo);
				d.current = true;
			}
			if (gameInfo?.player1 == me?.username && gameInfo?.roomName){
				socket?.emit("start", gameInfo);
				setInGame(true);
			}
			socket?.on("start", (data: any) => {
				GetOpp(data);
				if (data?.player1 == me?.username && data?.roomName){
					socket?.emit("start", data);
				}
				if (data?.roomName){
					setInGame(true);
					setAccept("");
				}
			})
			socket?.on("update", (data: any) => {

				if (data?.option == "refuse"){
					setAccept("");
					setRefuse(true);
					setGameSet(true);
					setMode("");
					setMatchMake(false);
					setSelectedFriend("");
					setGameInfo(undefined);
					setSend(false);
					swal(`${data?.receiver} refused your invitation`, "your friend is busy or he already in game", "info");
				}
			})
			return () => {socket?.off("start"), ()=>{}
				socket?.off("update"), ()=>{}
			}
		},[])

		if (refuse)
			return (null)
		return (<>
			<div className="Waiting">
				<h1>Waiting for {gameInfo?.player2}</h1>
			</div>
		</>)
	}
	

	if (!hooks.waitHook.state) {
		return (<Loading />)
	}
	return (
		<>
			{online == "OFF" ? render :
				(<><div id="gameRootDir">
					{!inGame && <div className='GameMain bg-gradient-to-r from-black via-blue-900 to-black' style={Style}>
					
					
						<LeaderBoard />
						<div className="GameMode">
							{ Mode == "" && <>
								<button onClick={()=>setMode("computer")}> PLAY VS COMPUTER</button>
								<button onClick={()=>setMode("friend")}> PLAY VS FRIEND</button>
								<button onClick={()=>setMode("rank")}> PLAY RANK</button>
								</>
							}
						</div>	
						
						<div className='matchHistory'>
							<h1 className='font-bold text-[24px] text-center mb-8'>MATCH HISTORY</h1>
							<MatchHistory page="game" User={me?.username}/>
						</div>
					</div>
					}

					{!inGame && Mode != "" && (Mode == "friend" && selectedFriend == "" ? false : true) && gameSet && <GameSettings setMode={setMode} save={setMatchMake} close={setGameSet} Options={setOptions} />}		
					{!inGame && Mode == "rank" && matchMake && <MatchMaking GameInfo={setGameInfo} close={setMatchMake} setMode={setMode} startGame={setInGame} />}
					{!inGame && Mode == "friend" && matchMake &&  <FriendlyMatch/>}
					{!inGame && Mode == "friend" && !invite.current && selectedFriend == "" && !matchMake && <SelectFriend close={setMatchMake} setMode={setMode} select={setSelectedFriend} gameInfo={setGameInfo} send={setSend}/>}
					{!inGame && inviteComp && <Invite User={selectedFriend} close={setInviteComp} data={gameInfo} ACCEPT={setAccept}/>}
					</div>

					{inGame && Mode == "computer" && <Canvas setMode={setMode} close={setInGame} gameSettings={gameSettings}/>}
					{inGame && (Mode == "rank" || Mode == "friend") && <PingPong gameSettings={gameSettings} gameInfo={gameInfo} close={setInGame} setMode={setMode}/>}
				</>)}
		</>
	)
}