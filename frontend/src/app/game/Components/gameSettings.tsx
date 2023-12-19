
import '../../assest/game.css';
import Canvas from '../canvas';



export default function GameSettings({setMode} : {setMode : any}){





	return(
		<>
			<div className='gameSettings'>
				
			
			</div>
			<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("")}> Back</button>
		</>
	)
}



