
import '../../assest/chatComponents.css'
import Image from 'next/image'
import logo from '../../../../public/4268225 1.png'
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';




export default function Invite({User, close, data, ACCEPT} : {User: any, close: any, data : any, ACCEPT? : any}){

	const router = useRouter();
	const pathname = usePathname();
	// console.log("close Invite ",close);

	function accept(e : MouseEvent){
		e.preventDefault();
		if (pathname != "/game")
			router.push("/game?roomName=" + data.roomName + "&player1=" + data.player1 + "&player2=" + data.player2 + "&mode=friend"+ "&invite=true");
		else{
			if (ACCEPT)
				ACCEPT("accepted");
		}
		close(false);
	}	

	function refuse(e : MouseEvent){
		e.preventDefault();
		if (ACCEPT)
			ACCEPT("refused");
		close(false);
	
	}

	return (
		<>
			<div id='Invite' >
				<div>
					<Image className='logo' src={logo.src} alt="logo" width="150" height="150" />
					<h1>{User.username} Invited you for a game</h1>
				</div>
					<button onClick={()=>refuse}>IGNORE</button>
					<button onClick={(e :MouseEvent)=>accept(e)}>ACCEPT</button>
			</div>
		</>
	)
}