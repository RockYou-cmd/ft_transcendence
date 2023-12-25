
import '../../assest/game.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';






export default function GameMode({Mode , setMode} : {Mode : string, setMode : any}) {





	return(
		<>
			<div className="GameMode">
				{/* <h1>GameMode</h1> */}
				<button onClick={()=>setMode("computer")}> PLAY VS COMPUTER</button>
				<button onClick={()=>setMode("friend")}> PLAY VS FRIEND</button>
				<button onClick={()=>setMode("rank")}> PLAY RANK</button>
				{/* <button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("Settings")}> Settings <FontAwesomeIcon icon={faGear} /></button> */}
			</div>
		</>
	)
}



