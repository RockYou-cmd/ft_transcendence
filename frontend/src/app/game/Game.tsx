
import Canvas from "./canvas"
import '../assest/game.css';
import { useMe, useSocket } from "../Components/Log/LogContext";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { APIs } from "../Props/APIs";
import avatar from '../../../public/avatar.png';
import { MouseEvent } from "react";


export default function Game({Mode, setMode} : {Mode : string, setMode : any}){
	
	const { me, setMe } = useMe() as any;
	const [map, setMap] = useState("black");
	const { socket } = useSocket();

	function MatchMaking(){
		
		async function startgame(e : MouseEvent){
			e.preventDefault();
			socket?.emit("matchmaking", {});
		}

		useEffect(() => {
			socket?.on("start", () => {
				alert("start");
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

	
	
	return(
		<>
			<div className="GamePage">


				{Mode == "computer" && <Canvas COM={true} Map={map}/>}
				<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => setMode("")}> BACK</button>
				<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMap("dragon")}> dragon</button>
				<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMap("shark")}> shark</button>
				{Mode == "rank" && <MatchMaking />}
		
			</div>
		</>
	)
}