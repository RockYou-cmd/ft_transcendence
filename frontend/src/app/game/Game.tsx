
import Canvas from "./canvas"
import '../assest/game.css';
import { useMe } from "../Components/Log/LogContext";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { APIs } from "../Props/APIs";
import avatar from '../../../public/avatar.png';


export default function Game({Mode, setMode} : {Mode : string, setMode : any}){
	
	const { me, setMe } = useMe() as any;

	function MatchMaking(){
		
		
		return(
			<>
				<div className="MatchMaking">
					<h1>FINDING PLAYER</h1>

					<section>
						<Image className="g_img" src={me?.photo ? me.photo : avatar} priority={true} alt="img" width={60} height={60}/>
						<h1>VS</h1>
						<Image className="g_img" src={avatar} priority={true} alt="img" width={60} height={60}/>					
					</section>
				</div>
			</>
		)
	}

	
	
	return(
		<>
			<div className="GamePage">


				{Mode == "computer" && <Canvas COM={true} />}
				<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => setMode("")}> BACK</button>
				{Mode == "rank" && <MatchMaking />}
		
			</div>
		</>
	)
}