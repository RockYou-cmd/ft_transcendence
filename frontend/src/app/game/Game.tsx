
import Canvas from "./canvas"
import '../assest/game.css';





export default function Game({Mode, setMode} : {Mode : string, setMode : any}){
	
	

	
	
	return(
		<>
	

		{Mode == "computer" ? <Canvas COM={true} /> : <Canvas COM={false} />}
		<button className='bg-black text-white p-2 rounded m-5' onClick={(e) => setMode("")}> BACK</button>

		
		</>
	)
}