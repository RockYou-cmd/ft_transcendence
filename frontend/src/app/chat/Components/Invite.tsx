
import '../../assest/chatComponents.css'
import Image from 'next/image'
import logo from '../../../../public/puddles.png'
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { useSocket } from '@/app/Components/Log/LogContext';
import { useEffect , useState} from 'react';
import swal from 'sweetalert';



export default function Invite({User, close, data, ACCEPT} : {User: any, close: any, data : any, ACCEPT? : any}){

	const router = useRouter();
	const pathname = usePathname();
	const {socket} = useSocket();
	const [matchInfo, setMatchInfo] = useState<any>(data);

	useEffect(() => {
		setMatchInfo(data);
	}, [data]);

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


	
	function refuse(e? : MouseEvent){
		e?.preventDefault();
		if (ACCEPT)
			ACCEPT("refused");
		close(false);
		try{
			socket?.emit("update", {option : "refuse", receiver : matchInfo.player1, sender : matchInfo.player2});
		}
		catch(e){
			swal("Error", "", "error");
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			refuse();
		}, 5000);
		return () => clearTimeout(timer);
	},[matchInfo]);

	return (
		<>
			<div id='Invite' >
				<div>
					<Image className='logo' src={logo.src} alt="logo" width="100" height="100" />
					<h1>{User.username} Invited you for a game</h1>
				</div>
				<section>
					<button onClick={(e : MouseEvent)=>refuse(e)}>IGNORE</button>
					<button onClick={(e :MouseEvent)=>accept(e)}>ACCEPT</button>
				</section>
			</div>
		</>
	)
}