
import '../../assest/chatComponents.css'
import Image from 'next/image'
import logo from '../../../../public/4268225 1.png'
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';




export default function Invite({User, close, data} : {User: any, close: any, data : any}){

	const router = useRouter();
	// console.log("close Invite ",close);
	console.log("data Invite ",data);
	function accept(e : MouseEvent){
		e.preventDefault();
		console.log("accept Invite ",data);
		console.log("user invited", User);
		router.push("/game?roomName=" + data.roomName + "&player1=" + data.player1 + "&player2=" + data.player2 + "&mode=friend");
		close(false);
	}	

	return (
		<>
			<div id='Invite' >
				<div>
					<Image className='logo' src={logo.src} alt="logo" width="150" height="150" />
					<h1>{User.username} Invited you for a game</h1>
				</div>
					<button onClick={()=>{close(false)}}>IGNORE</button>
					<button onClick={(e :MouseEvent)=>accept(e)}>ACCEPT</button>
			</div>
		</>
	)
}