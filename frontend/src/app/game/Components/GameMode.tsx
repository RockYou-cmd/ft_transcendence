
import '../../assest/game.css';








export default function GameMode({Mode , setMode} : {Mode : string, setMode : any}) {






	return(
		<>
			<div className="GameMode">
				{/* <h1>GameMode</h1> */}
				<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("computer")}> play with the computer</button>
				<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("friend")}> play with the friend</button>
				<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("rank")}> play rank</button>
			</div>
			
		</>
	)
}



