
import React from 'react';
import '../../assest/game.css';





export default function GameResult({msg, close, make} : {msg : string, close : React.Dispatch<React.SetStateAction<boolean>>, make  :any}) {

	const classN = msg == "You Win" ?  "Rwin" : "Rlose";


	return (<>
		<div className={"GameResult " + classN}>
			<header >
				<h1>GAME RESULT</h1>
			</header>
			<p>{msg}</p>
			{/* <p>{msg}</p> */}
			<button onClick={()=>{close(false); make()}}>CONFIRM</button>
		</div>
	</>)
}