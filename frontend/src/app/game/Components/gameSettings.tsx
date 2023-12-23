
import '../../assest/game.css';
import Canvas from '../canvas';
import Image from 'next/image';
import shark from '../../../../public/Frame_1.png';
import dragon from '../../../../public/dragon.png';
import { useState } from 'react';
import React from 'react';

interface Map{
	name : string,
	img : any,
}

interface Ball{
	name: string,
	color: string,
}

const ball : Ball[] = [
	{name : "green", color : "#26AF5F"},
	{name : "blue", color : "#3597D4"},
	{name : "pink", color : "#975BA5"},
	{name : "red", color : "#C23A2C"},
	{name : "yellow", color : "#F0C514"},
	{name : "orange", color : "#CE7057"},
	{name : "gray", color : "#2D3E50"},
	{name : "gray2", color : "gray"},
]

const maps: Map[] = [
	{name : "black", img : null},
	{name : "shark", img : shark},
	{name : "dragon", img : dragon},
]

const reset ={
	Map : "shark",
	ballColor : "white",
	paddleColor : "white",
}

export default function GameSettings({ Map, Ball, Paddle, close} : { Map : any, Ball : any, Paddle : any, close : any}){

	const [Style, setStyle] = useState({
		map : {},
		ball : {},
		Paddle: {},
		mapName : "",
		ballColor : "",
		paddleColor : "",
	});

	function Chose(style : string, type : string, color : string){
		console.log("chose", style, type);
		if (type == "map"){
			Map(color);
			setStyle((prevState) => ({
					...prevState,
					map: {
						border: "3px solid #fff",
					},
					ball: prevState.ball,
					Paddle: prevState.Paddle,
					mapName: style,
					ballColor: prevState.ballColor,
					paddleColor: prevState.paddleColor,
				}));
		}else if (type == "ball"){
			Ball(color);
			setStyle((prevState) => ({
				...prevState,
				map: prevState.map,
				ball: {
					border: "3px solid #fff",
				},
				Paddle: prevState.Paddle,
				mapName: prevState.mapName,
				ballColor: style,
				paddleColor: prevState.paddleColor,
			}));
		} else if (type == "paddle"){
			Paddle(color);
			setStyle((prevState) => ({
				...prevState,
				map: prevState.map,
				ball: prevState.ball,
				Paddle: {
					border: "3px solid #fff",
				},
				mapName: prevState.mapName,
				ballColor: prevState.ballColor,
				paddleColor: style,
			}));
		}

	}


	function MapPicker({map} : {map : Map}){
		return(
			<div style={Style.mapName == map.name ? Style.map : {}} className={"mapPicker hover:scale-110" +  "  map" + map.name}
			onClick={()=>Chose(map.name, "map", map.name)}
			>
				{map?.img &&  <Image src={map?.img} className="mapImg"  alt="map" width={70} height={70} />}
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
				<h1>BALL COLOR</h1>
				<div className="ballcolor">
					{ball.map((ball : Ball)=>(<div className={"ball"} onClick={()=>Chose(ball.name, "ball", ball.color)} style={{backgroundColor : `${ball.color}`,
					border : Style.ballColor == ball.name ? "3px solid #fff" : ""}} key={ball.name}/>))}
				</div>
				<h1>PADDLE COLOR</h1>
				<div className="paddlecolor">
					{ball.map((ball : Ball)=>(<div className={"paddle"} onClick={()=>Chose(ball.name, "paddle", ball.color)} style={{backgroundColor : `${ball.color}`
					, border : Style.paddleColor == ball.name ? "3px solid #fff" : ""}} key={ball.name} />))}
				</div>
				<footer>
					<button onClick={()=>close(false)} >SAVE</button>
					<button onClick={()=>{
						Map(reset.Map);
						Ball(reset.ballColor);
						Paddle(reset.paddleColor);
						close(false)}
					}>NO</button>
				</footer>
			</div>
			<button className='bg-black text-white p-2 rounded m-5' onClick={()=>setMode("")}> Back</button>
		</>
	)
}



