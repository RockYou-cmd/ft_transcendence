
import '../../assest/game.css';
import { useState , useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../../public/avatar.png';
import { useSocket , useMe } from '../../Components/Log/LogContext';




export default function PingPong({map, ballColor, paddleColor, PLAYER1, PLAYER2, close} : {PLAYER1 : string, PLAYER2 : string , map : string, ballColor : string, paddleColor : string, close : any	}){

	const {me} = useMe() as any;
	const {socket} = useSocket();
	const [myScore, setMyScore] = useState(0);
	const [oppScore, setOppScore] = useState(0);
	const game = useRef<HTMLCanvasElement>(null);
	const roomName = useRef("");
	const first = useRef(false);

  useEffect(() => {
    if (game.current === null) return;

    // let parent = game.current?.parentElement;
    // game.current.width = parent?.clientWidth || 0;
    // game.current.height = parent?.clientHeight || 0;
    let gameWidth = game.current.width || 0;
    let gameHeight = game.current.height || 0;
    let player1 = {
      x: 20,
      y: gameHeight / 2 - 120 / 2,
      score: 0,
      username: PLAYER1,
      width: 12,
      height: 140,
      color: paddleColor,
    };
    let player2 = {
      x: gameWidth - 32,
      y: gameHeight / 2 - 120 / 2,
      score: 0,
      username: PLAYER2,
      width: 12,
      height: 140,
      color: paddleColor,
    };
    let ball = { x: 0, y: 0, color: ballColor, radius: 16 };
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

	//   if (!first.current){
		  player1.username = data.payload.player1;
		  player2.username = data.payload.player2;
		  roomName.current = data?.roomName;
		//   first.current = true;
	//   }
	//   console.log("data", data);
	//   console.log("data player1", data?.player1);
	//   console.log("data player2", data?.player2);
	//   console.log("in data player1", player1.username, "player2", player2.username)
      if (myScore != data.player1.score) setMyScore(data.player1.score);
      if (oppScore != data.player2.score) setOppScore(data.player2.score);
      render();
    });

    socket?.on("endGame", (data: any) => {
      close("");
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

    document.body.addEventListener("keydown", function (key) {
      if (key.code == "ArrowUp") {
        if (player1.username == me?.username) {
          if (player1.y > 0)
            socket?.emit("move", {
              y: player1.y - 20,
              roomName: roomName.current,
              player: "player1",
            });
        } else {
          if (player2.y > 0)
            socket?.emit("move", {
              y: player2.y - 20,
              roomName: roomName.current,
              player: "player2",
            });
        }
      } else if (key.code == "ArrowDown") {
        if (player2.username == me?.username) {
          if (player2.y + player2.height < gameHeight)
            socket?.emit("move", {
              y: player2.y + 20,
              roomName: roomName.current,
              player: "player2",
            });
        } else {
          if (player1.y + player1.height < gameHeight)
            socket?.emit("move", {
              y: player1.y + 20,
              roomName: roomName.current,
              player: "player1",
            });
        }
      }
    });

    return () => {
      socket?.off("frame", () => {});
    };
  }, [socket]);


	

	return(
		<>
			<div id="container" className={map}>
				<section>
					{/* <Image className="g_img" src={(me as {photo : any})?.photo} priority={true} alt="img" width={60} height={60}/> */}
					<h1>{PLAYER1}</h1>
					<h2>{myScore} | {oppScore}</h2>
					<h1>{PLAYER2}</h1>
					{/* <FontAwesomeIcon id='icon' icon={faRobot} /> */}
				</section>
					<canvas id="canvas" ref={game} width={1500} height={900} />
			</div>	

		</>
	)
}