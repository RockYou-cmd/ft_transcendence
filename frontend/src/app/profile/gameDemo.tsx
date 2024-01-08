"use client"
import '../assest/game.css'
import {useRef, useEffect} from 'react';
import React from 'react';

export interface Player {
	x: number;
	y: number;
	score: number;
	username: string;
	level: number;
}

// var Me: Player = {x: 0, y: 0, score: 0, username: "", level: 0};

export default function GameDemo({gameSettings} : {gameSettings : any}){
	
	const game = useRef<HTMLCanvasElement>(null);


	useEffect(() => {
		if (game.current === null){
			return;
		}
		
		const FPS = 50;
		const BALL_SPEED = 1.1;
		const COM_LVL = 0.20;
		
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
			x: 12,
			y: (gameHeight / 2) -  gameHeight / 6.5 / 2,
			width: 8,
			height: gameHeight / 6.5,
			// height: 140,
			color: gameSettings?.paddleColor,
		}
	
		var player2 = {
			x: gameWidth - 20,
			y: (gameHeight / 2) -  (gameHeight / 6.5)/ 2,
			// y : (gameHeight / 2) -  140/2,
			width: 8,
			height: gameHeight / 6.5,
			// height: 140,
			color: gameSettings?.paddleColor,
		}
	
		var ball = {
			x: gameWidth / 2,
			y: gameHeight / 2,
			radius: gameHeight / 40,
			speed: BALL_SPEED,
			velocityX: 5,
			velocityY: 3,
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
		
		function reset(){
			ball.x = gameWidth / 2;
			ball.y = gameHeight / 2;
			ball.speed = BALL_SPEED;
			ball.velocityX = -ball.velocityX;
			player1.y = gameHeight / 2;
			player2.y = gameHeight / 2;
			ball.velocityY = 3;
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

		
		function updateCOM(){

				ball.y += ball.velocityY * ball.speed;
				ball.x += ball.velocityX * ball.speed;

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
	
				if ((playerPos.top <= (ball.y  + ball.radius)) && ((ball.y  + ball.radius) < playerPos.middle)){
					ball.velocityY = -5;
				}
				else if (playerPos.buttom >= (ball.y  - ball.radius) && (ball.y  - ball.radius) > playerPos.middle){
					ball.velocityY = 5;
				}
				else
					ball.velocityY= 3;
				
				ball.velocityX = -ball.velocityX;
			}
			
			// Computer
			function COM(player : any){
				var pos_player = ball.y - player.height / 2;
				var cur_pos = player.y;
				player.y = ler(cur_pos, pos_player, COM_LVL);
			}

			COM(player1);
			COM(player2);
			
			if (ball.x + ball.radius <= 0){
				reset();
			} else if ((ball.x - ball.radius) >= gameWidth){
				reset();
			}

		}

		function gameLoop(){
			render();
			updateCOM();
		}


		const start = setInterval(gameLoop, 1000 / FPS);
		
		return () => clearInterval(start);
}, []);

	return (
		<>
			<div id="container" className={gameSettings?.map}  >
				<canvas id="canvas" ref={game} />
			</div>
		</>
	)
}