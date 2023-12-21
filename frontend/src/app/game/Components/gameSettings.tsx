
import '../../assest/game.css';
import Canvas from '../canvas';
import Image from 'next/image';
import shark from '../../../../public/Frame_1.png';
import dragon from '../../../../public/dragon.png';

interface Map{
	name : string,
	img : any,
}

const maps: Map[] = [
	{name : "black", img : null},
	{name : "shark", img : shark},
	{name : "dragon", img : dragon},
]

export default function GameSettings({setMode} : {setMode : any}){


	function MapPicker({map} : {map : Map}){
		return(
			<div className={"mapPicker" +  "  map" + map.name}>
				{map?.img &&  <Image src={map?.img} className="mapImg" alt="map" width={80} height={80} />}
			</div>
		)
	}


	return(
		<>
			<div className='gameSettings'>
				<h1>CHOSE A MAP</h1>	
				<div className="Maps">
					{maps.map((map : Map, index : number)=>(<MapPicker map={map} key={index}/>))}
				</div>
			</div>
			<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("")}> Back</button>
		</>
	)
}



