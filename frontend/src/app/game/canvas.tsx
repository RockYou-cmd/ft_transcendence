"use client"
import '../assest/game.css'
import {useRef, useEffect, useState} from 'react';
import React from 'react';
import { MouseEvent } from 'react';
import router from 'next/navigation';
import { useMe } from '../Components/Log/LogContext'
import Image from 'next/image';
import avatar from '../../../public/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
export interface Player {
	x: number;
	y: number;
	score: number;
	username: string;
	level: number;
}



// var Me: Player = {x: 0, y: 0, score: 0, username: "", level: 0};

export default function Canvas({COM, OPP, Map} : {COM: boolean, OPP?: Player, Map?: string}){
	
	const game = useRef<HTMLCanvasElement>(null);
	// const [pause, setPause] = useState(false);
	var pause = useRef(false);
	const [startGame, setStart] = useState(true);
	const [myScore, setMyScore] = useState(0);
	const [oppScore, setOppScore] = useState(0);
	const {me, setMe} = useMe();
	var pos = useRef({
		x: 0,
		y: 0,
		score: 0,
	});

	// const [gameWidth, setGameWidth] = useState(0);
	// const [gameHeight, setGameHeight] = useState(0);
	// let score = useRef<HTMLInputElement>(null);
	


	useEffect(() => {
		if (game.current === null){
			return;
		}
		
		const FPS = 60;
		const BALL_SPEED = 1.2;
		const COM_LVL = 0.15;
		var ball_acc = 0.18;
		
		const context = game.current?.getContext('2d');
		let parent = game.current?.parentElement;
		game.current.width = parent?.clientWidth || 0;
		game.current.height = parent?.clientHeight || 0;
		let gameWidth = game.current.width || 0;
		let gameHeight = game.current.height || 0;
		// setGameHeight(game.current.height);
		// setGameWidth(game.current.width);


		var net={
			x : gameWidth / 2 - 1,
			y : 0,
			width : 2,
			height : 10,
			color: "WHITE"
		}
	
		var player1 = {
			x: 20,
			y: gameHeight / 2 - 120 / 2,
			width: 12,
			height: 140,
			score: 0,
			color: "rgba(217, 217, 217)"
		}
	
		var player2 = {
			x: gameWidth - 32,
			y: gameHeight / 2 - 120 / 2,
			width: 12,
			height: 140,
			score: 0,
			color: "rgba(217, 217, 217)",
		}
	
		var ball = {
			x: gameWidth / 2,
			y: gameHeight / 2,
			radius: 16,
			speed: BALL_SPEED,
			velocityX: 5,
			velocityY: 5,
			color: "WHITE",
		}


		function drawRect(x: number, y: number, w: number, h: number, color: string){
			if (context) {
				context.fillStyle = color;
				context.fillRect(x, y, w, h);
			}
		}

		function drawCircle(x: number, y: number, r: number, color: string){
			if (context) {
				context.fillStyle = color;
				context.beginPath();
				context.arc(x, y, r, 0, Math.PI * 2, true);
				context.closePath();
				context.fill();
			}
		}

		function drawText(text: string, x: number, y: number, color: string){
			if (context) {
				context.fillStyle = color;
				context.font = "500 50px sans-serif";
				context.fillText(text, x, y);
			}
		}

		function drawNet(){
			for (let i = 0; i <= gameHeight; i += 15){
				drawRect(net.x, net.y + i, net.width, net.height, net.color);
			}
		}
		
		function render(){

			// if (game.current?.width && game.current?.height){
			// 	game.current.width = parent?.clientWidth || 0;
			// 	game.current.height = parent?.clientHeight || 0;
			// 	setGameHeight(game?.current?.height || 0);
			// 	setGameWidth(game?.current?.width || 0);
			// }
			// clear the map
			// drawRect(0, 0, gameWidth, gameHeight, 'black');
			
			context?.clearRect(0, 0, gameWidth, gameHeight);
			// draw the net
			
			drawRect(0, 0, gameWidth, 6, "white");
			drawRect(0, 0, 6, gameHeight, "white");
			drawRect(0, gameHeight - 6 , gameWidth, 6, "white");
			drawRect(gameWidth - 6, 0, 6,gameHeight, "white");
			
			drawNet();
			// draw the score
			// drawText(player1.score as any, gameWidth / 4, gameHeight / 5, "WHITE");
			// drawText(player2.score as any, 3 * gameWidth / 4, gameHeight / 5, "WHITE");
			//draw the padels
			drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
			drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
			//draw the ball
			drawCircle(ball.x, ball.y, ball.radius, ball.color);
		}
		
		function collision(b: any, p: any) {
			p.top = p.y;
			p.bottom = p.y + p.height;
			p.left = p.x;
			p.right = p.x + p.width;
		
			b.top = b.y - b.radius;
			b.bottom = b.y + b.radius;
			b.left = b.x - b.radius;
			b.right = b.x + b.radius;
		
			return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
		}

		function ler(a: number, b: number, n: number){
			return a + (b - a) * n;
		}

		function getStart(color: string){
			var n = 3;
			if (context) {
				context.fillStyle = color;
				context.font = "500 150px sans-serif";
				context.fillText(n.toString(), gameWidth / 2 - 100, gameHeight / 2 - 100);
			}
			n--;
			if (n == 0)
				n = 3;
			
		}

		function reset(){
			ball.x = gameWidth / 2;
			ball.y = gameHeight / 2;
			ball.speed = BALL_SPEED;
			ball.velocityX = -ball.velocityX;
			player1.y = gameHeight / 2;
			player2.y = gameHeight / 2;
			
		}
		
		function updateCOM(){
	
			if (pause.current == true || startGame == true){
				return;
			}
			ball.x += ball.velocityX * ball.speed;
			ball.y += ball.velocityY * ball.speed;
			
			
			if (ball.y + ball.radius >= gameHeight || ball.y - ball.radius <= 0){
				ball.velocityY = -ball.velocityY;
			}
			
			var touch_player = (ball.x < gameWidth / 2) ? player1 : player2;
			if (collision(ball, touch_player)){
				ball.velocityX = -ball.velocityX;
				ball.speed += ball_acc;
			}
			
			// Computer
			var pos_player2 = ball.y - player2.height / 2;
			var cur_pos = player2.y;
			player2.y = ler(cur_pos, pos_player2, COM_LVL);
			
			if (ball.x + ball.radius <= 0){
				player2.score++;
				reset();
				setOppScore(player2.score);
			} else if ((ball.x - ball.radius) >= gameWidth){
				player1.score++;
				reset();
				setMyScore(player1.score);
			}
		}

		function updateOPP(OPP : Player){

		}

		function gameLoop(){
			render();
			if (COM)
				updateCOM();
			else
				updateOPP(OPP!);
		}
		
		document.body.addEventListener("keydown", function(key){
			if (key.code == "ArrowUp" && !pause.current && !startGame){
				if (player1.y > 0)
					player1.y -= 20;
			}
			else if(key.code == "ArrowDown" && !pause.current && !startGame){
				if (player1.y < gameHeight - player1.height)
					player1.y += 20;
			}
		});

		const start = setInterval(gameLoop, 1000 / FPS);
		
		return () => clearInterval(start);
}, [startGame]);
	
	const [btn, setBtn] = useState("Pause");
	const [restart, setRestart] = useState("Start");
	const PauseResume = (e : MouseEvent) => {
		e.preventDefault();
		pause.current = !pause.current;
		if (pause.current)
			setBtn("Resume");
		else
			setBtn("Pause");
	}

	const Restart = (e : MouseEvent) => {
		e.preventDefault();
		setStart(!startGame);
		if (startGame)
			setRestart("Restart");
		else
			setRestart("Start");
		pause.current = false;
		setBtn("Pause");
		setMyScore(0);
		setOppScore(0);
	}

	console.log("Map", Map);


	return (
		<>
			<div id="container" className={Map}  >

			<section>
				<Image className="g_img" src={(me as {photo : any})?.photo} priority={true} alt="img" width={70} height={70}/>
				<h1>{(me as {username : string})?.username}</h1>
				{/* <h1>hewa</h1> */}
				<h2>{myScore} | {oppScore}</h2>
				<h1>Computer</h1>
				<FontAwesomeIcon id='icon' icon={faRobot} />
			</section>				

				<canvas id="canvas" ref={game} />
			</div>
			{ COM ? (<>
			<button className='bg-black text-white p-2 rounded m-5' onClick={PauseResume}>{btn}</button>
			<button className='bg-black text-white p-2 rounded m-5' onClick={Restart}>{restart}</button> </>)
		: null	}
		</>
	)
}