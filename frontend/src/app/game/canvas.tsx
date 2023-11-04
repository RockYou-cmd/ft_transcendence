import {useRef, useEffect, useState} from 'react';



export default function Canvas(){

	const game = useRef<HTMLCanvasElement>(null);
	const FPS = 60;
	const BALL_SPEED = 1.2;
	const COM_LVL = 0.05;
	var ball_acc = 0.2;
	


	useEffect(() => {
		if (game.current === null){
			return;
		}
		
	}, []);

	return (
		<>
			<div id="container">
				<canvas id="canvas" ref={game} width="1000" height="600"></canvas>
			</div>
		</>
	)

}