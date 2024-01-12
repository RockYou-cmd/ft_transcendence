
import '../assest/game.css';
import React from "react";
import { useMe, useSocket } from "../Components/Log/LogContext";
import { useEffect, useState ,useRef } from "react";
import Image from 'next/image';
import avatar from '../../../public/avatar.png';
import { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { GetData } from '../Components/Log/CheckLogin'
import swal from 'sweetalert';


export default function MatchMaking({GameInfo, close, setMode, startGame, friend} : {setMode :any ,GameInfo : any, close : any, startGame : any, friend? : boolean}){
	
	const { me, setMe } = useMe() as any;
	const { socket } = useSocket();
	const [Opp, setOpp] = useState<any>({});
	const [time, setTime] = useState(false);
	const [counter, setCounter] = useState(0);
	const [sec, setSec] = useState(0);
	const matchInfo = useRef({} as any);

		const n = useRef(false);
		useEffect(() => {
			if (n.current == false){
				socket?.emit("matchmaking", {});
			}
			n.current = true;
		},[]);

		useEffect(() => {
			const one = time == false ? 1 : -1;
			const interval = setInterval(() => {
				setCounter(counter => counter + one);
			}, 1000);

			return () => {clearInterval(interval);};
		},[time]);

		async function timer(data: any) {
			const Oppname = data.player1 == me.username ? data.player2 : data.player1;
			const datas = await GetData({ Api: "User", user: Oppname });
			setOpp(datas);
			matchInfo.current.photo = datas?.photo;
			GameInfo(matchInfo.current);
		}
		
		useEffect(() => {
			
			socket?.on("inGame", (data: any) => {
				console.log("herr");
				swal("You Already in Game", "", "info");
				setMode("");
				close(true);
			})			

			socket?.on("start", (data: any) => {
	
				matchInfo.current = data;
				timer(data);
				setCounter(3);
				setSec(0);
				setTime(true);
			})

			return () => {
				socket?.off("start"), () => {}
				socket?.off("inGame", ()=>{})
			}
		},[socket]);

		useEffect(() => {

			if (counter % 60 == 0 && counter != 0){
				setSec(sec => sec + 1);
				setCounter(0);
			}
			if (counter == 0 && time == true){

				if (matchInfo.current.player1 == me.username){
					socket?.emit("start", matchInfo.current);
				}
				close(false);
				startGame(true);
			}
		},[counter, time]);
		
	return(
		<>
			<div className="MatchMaking">
				{!time && <button id='backBtn' onClick={()=>{
					socket?.emit("update", {option : "refuse", receiver : Opp?.username, sender : me?.username, mode : "rank"});
					socket?.disconnect();
					setMode("");close(true);
					socket?.connect()}
					}><FontAwesomeIcon icon={faCircleLeft} id="icon" /></button>}
				<h1>FINDING PLAYER</h1>

				<section>
					<Image className="g_img" src={me?.photo ? me.photo : avatar} priority={true} alt="img" width={60} height={60}/>
					<h1>VS</h1>
					<Image className="g_img" src={Opp?.photo ? Opp?.photo : avatar} priority={true} alt="img" width={60} height={60}/>					
				</section>
					{!time ?  <h2>Matchmaking... {sec} : {counter}</h2> 
						: <h2>STARTING IN {counter} sec</h2>
					}
			</div>
		</>
	)
}