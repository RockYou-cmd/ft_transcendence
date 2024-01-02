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
import { faRobot ,faCircleLeft } from '@fortawesome/free-solid-svg-icons';
export interface Player {
	x: number;
	y: number;
	score: number;
	username: string;
	level: number;
}

interface Param{
	gameSettings : any,
	close : any,
	setMode : any,
}

// var Me: Player = {x: 0, y: 0, score: 0, username: "", level: 0};

export default function Canvas({gameSettings, close, setMode} : Param){
	
	const game = useRef<HTMLCanvasElement>(null);
	var pause = useRef(false);
	const [startGame, setStart] = useState(true);
	const [myScore, setMyScore] = useState(0);
	const [oppScore, setOppScore] = useState(0);
	const {me} = useMe();



	useEffect(() => {
		if (game.current === null){
			return;
		}
		
		const FPS = 60;
		const BALL_SPEED = 1.2;
		const COM_LVL = 0.15;
		var ball_acc = 0.1;
		
		const context = game.current?.getContext('2d');
		let parent = game.current?.parentElement;
		game.current.width = parent?.clientWidth || 0;
		game.current.height = parent?.clientHeight || 0;
		let gameWidth = game.current.width || 0;
		let gameHeight = game.current.height || 0;
		// setGameHeight(game.current.height);
		// setGameWidth(game.current.width);
		console.log(gameWidth + " " + gameHeight);

		var net={
			x : gameWidth / 2 - 1,
			y : 0,
			width : 2,
			height : 10,
			color: "WHITE"
		}
	
		var player1 = {
			x: 10,
			y: (gameHeight / 2) -  gameHeight / 6.5 / 2,
			width: 12,
			height: gameHeight / 6.5,
			// height: 140,
			score: 0,
			color: gameSettings?.paddleColor,
		}
	
		var player2 = {
			x: gameWidth - 22,
			y: (gameHeight / 2) -  (gameHeight / 6.5)/ 2,
			// y : (gameHeight / 2) -  140/2,
			width: 12,
			height: gameHeight / 6.5,
			// height: 140,
			score: 0,
			color: gameSettings?.paddleColor,
		}
	
		var ball = {
			x: gameWidth / 2,
			y: gameHeight / 2,
			radius: 16,
			speed: BALL_SPEED,
			velocityX: 5,
			velocityY: 0,
			color: gameSettings?.ballColor,
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


		function drawNet(){
			for (let i = 0; i <= gameHeight; i += 15){
				drawRect(net.x, net.y + i, net.width, net.height, net.color);
			}
		}
		
		function render(){

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
			//draw the padels
			drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
			drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
			//draw the ball
			drawCircle(ball.x, ball.y, ball.radius, ball.color);
		}
		
		function collision(b: any, p: any) {
			//player
			p.top = p.y;
			p.bottom = p.y + p.height;
			p.left = p.x;
			p.right = p.x + p.width;
		
			//ball
			b.top = b.y - b.radius;
			b.bottom = b.y + b.radius;
			b.left = b.x - b.radius;
			b.right = b.x + b.radius;
		
			return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
		}

		function ler(a: number, b: number, n: number){
			return a + (b - a) * n;
		}

		function reset(){
			ball.x = gameWidth / 2;
			ball.y = gameHeight / 2;
			ball.speed = BALL_SPEED;
			ball.velocityX = -ball.velocityX;
			player1.y = gameHeight / 2;
			player2.y = gameHeight / 2;
			ball.velocityY = 0;
		}
		
		function updateCOM(){
	
			if (pause.current == true || startGame == true){
				return;
			}

			// if (ball.velocityX == 10 || ball.velocityX == -10){
			// 	ball.y += (ball.velocityY * ball.speed) / 2;
			// 	ball.x += (ball.velocityX * ball.speed) / 2;
			// }
			// else{

				ball.y += ball.velocityY * ball.speed;
				ball.x += ball.velocityX * ball.speed;
			// }
			
			
			
			
			if (ball.y + ball.radius >= gameHeight || ball.y - ball.radius <= 0){
				if (ball.y + ball.radius >= gameHeight){
					if (ball.velocityY > 0)
						ball.velocityY = -ball.velocityY;
				}
				else if (ball.y - ball.radius <= 0){
					if (ball.velocityY < 0)
						ball.velocityY = -ball.velocityY;
				}
			}
			
			var touch_player = (ball.x < gameWidth / 2) ? player1 : player2;
			if (collision(ball, touch_player)){
				const playerPos = {
					top: touch_player.y,
					buttom: touch_player.y + touch_player.height,
					middle: touch_player.height / 2 + touch_player.y,
				}
	
				ball.speed += ball_acc;

				if ((playerPos.top <= (ball.y  + ball.radius)) && ((ball.y  + ball.radius) < playerPos.middle)){
					ball.velocityY = -5;
				}
				else if (playerPos.buttom >= (ball.y  - ball.radius) && (ball.y  - ball.radius) > playerPos.middle){
					ball.velocityY = 5;
				}
				else
					ball.velocityY= 0;
				
				ball.velocityX = -ball.velocityX;
			}
			
			// Computer
			function COM(player : any){
				var pos_player = ball.y - player.height / 2;
				var cur_pos = player.y;
				player.y = ler(cur_pos, pos_player, COM_LVL);
			}

			// COM(player1);
			COM(player2);

			// var pos_player2 = ball.y - player2.height / 2;
			// var cur_pos = player2.y;
			// player2.y = ler(cur_pos, pos_player2, COM_LVL);


			
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



		function gameLoop(){
			render();
			updateCOM();
		}
		
		window.addEventListener("keydown", function(key){
			if (key.code == "KeyW" && !pause.current && !startGame){
				if (player1.y > 0)
					player1.y -= 25;
			}
			else if(key.code == "KeyS" && !pause.current && !startGame){
				if (player1.y < gameHeight - player1.height)
					player1.y += 25;
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
	return (
		<>
			<div className={"PingPong"} style={
				gameSettings?.map == "black" ? {backgroundColor : "black"} : gameSettings?.map == "shark" ? 
				{backgroundColor : "#20A4F3"} : {backgroundColor : "#e65757"}
			}>

				<div id="container" className={gameSettings?.map}  >
					<button id='backBtn' onClick={()=>{close(false);setMode("")}}><FontAwesomeIcon icon={faCircleLeft} id="icon" /></button>

				<section>
					<Image className="g_img" src={(me as {photo : any})?.photo} priority={true} alt="img" width={60} height={60}/>
					<h1>{(me as {username : string})?.username}</h1>
					<h2>{myScore} | {oppScore}</h2>
					<h1>Computer</h1>
					<FontAwesomeIcon id='icon' icon={faRobot} />
				</section>				

					<canvas id="canvas" ref={game} />
				<footer>

					<button className='bg-black text-white p-2 rounded m-5' onClick={PauseResume}>{btn}</button>
					<button className='bg-black text-white p-2 rounded m-5' onClick={Restart}>{restart}</button>
				
				</footer>
				</div>
			</div>
		</>
	)
}