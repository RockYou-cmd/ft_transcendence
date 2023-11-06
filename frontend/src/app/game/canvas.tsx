"use client"
import {useRef, useEffect, useState} from 'react';


export default function Canvas(){
	
	const game = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (game.current === null){
			return;
		}
		const FPS = 60;
		const BALL_SPEED = 1.2;
		const COM_LVL = 0.09;
		var ball_acc = 0.2;
		
		const context = game.current?.getContext('2d');
		const gameWidth = game.current?.width || 0;
		const gameHeight = game.current?.height || 0;

		
		
		const net={
			x : gameWidth / 2 - 1,
			y : 0,
			width : 2,
			height : 10,
			color: "WHITE"
		}

		const player1 = {
			x: 10,
			y: gameHeight / 2 - 120 / 2,
			width: 12,
			height: 130,
			score: 0,
			color: "WHITE"
		}

		const player2 = {
			x: gameWidth - 22,
			y: gameHeight / 2 - 120 / 2,
			width: 12,
			height: 130,
			score: 0,
			color: "WHITE"
		}

		const ball = {
			x: gameWidth / 2,
			y: gameHeight / 2,
			radius: 16,
			speed: BALL_SPEED,
			velocityX: 5,
			velocityY: 5,
			color: "WHITE"
		
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
			// clear the map
			drawRect(0, 0, gameWidth, gameHeight, 'black');
			// game.current?.getContext('2d')?.clearRect(0, 0, gameWidth, gameHeight);
			// draw the net
			drawNet();
			// draw the score
			drawText(player1.score as any, gameWidth / 4, gameHeight / 5, "WHITE");
			drawText(player2.score as any, 3 * gameWidth / 4, gameHeight / 5, "WHITE");
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

		function resetBall(){
			ball.x = gameWidth / 2;
			ball.y = gameHeight / 2;
			ball.speed = BALL_SPEED;
			ball.velocityX = -ball.velocityX;
		}
		
		function update(){
			ball.x += ball.velocityX * ball.speed;
			ball.y += ball.velocityY * ball.speed;
			
			
			if (ball.y + ball.radius >= gameHeight || ball.y - ball.radius <= 0){
				ball.velocityY = -ball.velocityY;
			}
			
			var touch_player = (ball.x < gameWidth / 2) ? player1 : player2;
			if (collision(ball, touch_player)){
				ball.velocityX = -ball.velocityX;
				// ball.speed += ball_acc;
			}
			
			// Computer
			var pos_player2 = ball.y - player2.height / 2;
			var cur_pos = player2.y;
			player2.y = ler(cur_pos, pos_player2, COM_LVL);
			
			if (ball.x + ball.radius < 0){
				player2.score++;
				resetBall();
			} else if (ball.x - ball.radius > gameWidth){
				player1.score++;
				resetBall();
			}
		}

		function gameLoop(){
			render();
			update();
		}
		
		const start = setInterval(gameLoop, 1000 / FPS);
		
		return () => clearInterval(start);

}, []);

	return (
		<>
			<div id="container" className='flex justify-center w- m-auto mt-12'>
				<canvas id="canvas" ref={game} width="1500" height="900">
			
				</canvas>
			</div>
		</>
	)

}