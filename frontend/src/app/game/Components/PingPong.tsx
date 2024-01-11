
import '../../assest/game.css';
import { useState , useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../../public/avatar.png';
import { useSocket , useMe } from '../../Components/Log/LogContext';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent } from 'react';
import swal from 'sweetalert';
import GameResult from './gameResult';




export default function PingPong({gameSettings, gameInfo, close, setMode} : { gameSettings : any , gameInfo : any ,close : any, setMode: any }){

	const {me} = useMe() as any;
	const {socket} = useSocket();
	const [myScore, setMyScore] = useState(0);
	const [oppScore, setOppScore] = useState(0);
	const game = useRef<HTMLCanvasElement>(null);
	const roomName = useRef("");
	const lag = useRef(false);
	const [gameRes, setGameRes] = useState(false);
	const msg = useRef("");


	function leaveMatch(e? : MouseEvent){
		e?.preventDefault();
		socket?.disconnect();
		close(false);
		setMode("");
		socket?.connect();
	}

	useEffect(() => {
		const time = setTimeout(() => {
			if (lag.current == false){
				const player = gameInfo?.player1 == me?.username ? gameInfo.player2 : gameInfo.player1;
				swal( "You Won", `${player} has left the game`,"info");
				leaveMatch();
			}
		}, 15000);
		return	() => clearTimeout(time);
	},[]);

  useEffect(() => {
    if (game.current === null) return;

    let gameWidth = game.current.width || 0;
    let gameHeight = game.current.height || 0;
    let player1 = {
		height: gameHeight / 6.5,
		width: 12,
		x: 10,
		y: (gameHeight / 2) -(gameHeight / 6.5) / 2,
		score: 0,
		username: gameInfo?.player1,
		color: gameSettings?.paddleColor,
    };
    let player2 = {
		width: 12,
		height: gameHeight / 6.5,
		x: gameWidth - 22,
		y: (gameHeight / 2) -  (gameHeight / 6.5)/ 2,
		score: 0,
		username: gameInfo?.player2,
		color: gameSettings?.paddleColor,
    };
    let ball = { x: 0, y: 0, color: gameSettings?.ballColor, radius: 16 };
    let net = {
      x: gameWidth / 2 - 2 / 1,
      y: 0,
      width: 2,
      height: 10,
      color: "white",
    };
    const context = game.current?.getContext("2d");

    socket?.on("frame", (data: any) => {
      player1.x = data.player1.x;
      player1.y = data.player1.y;
      player1.score = data.player1.score;
      player2.x = data.player2.x;
      player2.y = data.player2.y;
      player2.score = data.player2.score;
      ball.x = data.ball.x;
      ball.y = data.ball.y;
	  if (lag.current == false){
		lag.current =  true;
	  }
	  
	
      if (myScore != data.player1.score) setMyScore(data.player1.score);
      if (oppScore != data.player2.score) setOppScore(data.player2.score);
      render();
    });

    socket?.on("endGame", (data: any) => {
		const winner = data?.winner == me?.username ? "You Win" : "You Lose";

		msg.current = winner;
		setGameRes(true);
    });

    function drawRect(
      x: number,
      y: number,
      w: number,
      h: number,
      color: string
    ) {
      if (context) {
        context.fillStyle = color;
        context.fillRect(x, y, w, h);
      }
    }

    function drawCircle(x: number, y: number, r: number, color: string) {
      if (context) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
      }
    }

    function drawNet() {
      for (let i = 0; i <= gameHeight; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
      }
    }

    function render() {
      context?.clearRect(0, 0, gameWidth, gameHeight);

      drawRect(0, 0, gameWidth, 6, "white");
      drawRect(0, 0, 6, gameHeight, "white");
      drawRect(0, gameHeight - 6, gameWidth, 6, "white");
      drawRect(gameWidth - 6, 0, 6, gameHeight, "white");

      drawNet();
      drawRect(
        player1.x,
        player1.y,
        player1.width,
        player1.height,
        player1.color
      );
      drawRect(
        player2.x,
        player2.y,
        player2.width,
        player2.height,
        player2.color
      );
      //draw the ball
      drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }

    window.addEventListener("keydown", function (key) {
      if (key.code == "KeyW") {
        if (player1.username == me?.username) {
          if (player1.y > 0)
            socket?.emit("move", {
              y: player1.y - 28,
              roomName: roomName.current,
              player: "player1",
            });
        } else {
          if (player2.y > 0)
            socket?.emit("move", {
              y: player2.y - 28,
              roomName: roomName.current,
              player: "player2",
            });
        }
      } else if (key.code == "KeyS") {
        if (player2.username == me?.username) {
          if (player2.y + player2.height < gameHeight)
            socket?.emit("move", {
              y: player2.y + 28,
              roomName: roomName.current,
              player: "player2",
            });
        } else {
          if (player1.y + player1.height < gameHeight)
            socket?.emit("move", {
              y: player1.y + 28,
              roomName: roomName.current,
              player: "player1",
            });
        }
      }
    });

	// if (gameInfo?.player2 == me?.username && gameInfo?.roomName){
	// 	socket?.on("start", (data: any) => {});
	// }
    return () => {
      socket?.off("frame", () => {});
    };
  }, [socket]);


  	const photo = gameInfo?.player1 == me?.username ? me?.photo : gameInfo?.photo;
	const oppPhoto = gameInfo?.player2 == me?.username ? me?.photo : gameInfo?.photo;

	return(
		<>
			{gameRes && <GameResult msg={msg.current} close={setGameRes} make={()=>leaveMatch()}/>}
			<div className={"PingPong"} style={
				gameSettings?.map == "black" ? {backgroundColor : "black"} : gameSettings?.map == "shark" ? 
				{backgroundColor : "#20A4F3"} : {backgroundColor : "#e65757"}
			}>

				<div id="container" className={gameSettings.map}>
					<button id="backBtn" onClick={(e : MouseEvent)=>leaveMatch(e)}><FontAwesomeIcon icon={faCircleLeft} id="icon" /></button>
					<section>
						<Image className="g_img" src={photo ? photo : avatar} priority={true} alt="img" width={60} height={60}/>
						<h1>{gameInfo.player1}</h1>
						<h2>{myScore} | {oppScore}</h2>
						<h1>{gameInfo.player2}</h1>
						<Image className="g_img" src={oppPhoto ? oppPhoto : avatar} priority={true} alt="img" width={60} height={60}/>
					</section>
					<canvas id="canvas" ref={game} width={1500} height={900} />
				</div>	
			</div>
		</>
	)
}