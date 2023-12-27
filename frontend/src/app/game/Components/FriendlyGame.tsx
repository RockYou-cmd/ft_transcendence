
import { APIs } from '@/app/Props/APIs';
import '../../assest/game.css';
import Add from '../../chat/Components/Add';
import { useEffect, useState } from 'react';
import { Get, GetRes } from '../../Components/Fetch/Fetch';
import { useLogContext, useSocket, useMe } from '../../Components/Log/LogContext';







export default function SelectFriend({close , setMode, select} : { close :React.Dispatch<React.SetStateAction<boolean>>, setMode : React.Dispatch<React.SetStateAction<string>>, select : any}) {
	
	const [data, setData] = useState(null) as any;
	const {socket} = useSocket();
	const {me} = useMe() as any;
	// const [refresh, setRefresh] = useState(false);
	const {online, setOnline} = useLogContext();

	useEffect(() => {
		async function fetchData(){
			const data = await Get(APIs.Friends);
			console.log(data);
			if (data == undefined){
				await GetRes(APIs.Logout);
				setOnline("OFF");
			}
			setData(data);
		}
		fetchData();
	},[])
	
	// function InviteToGame(User : any){
	// 	socket?.emit("invite", {player2 : User?.username, player1 : me?.username});
	// 	// router.push("/game?" + "player1=" + me.username + "&player2=" + User.username + "&mode=friend" + "&invite=true");
	// }

	function SELECT(User : any){
		// console.log("selected one", User);
		select(User?.username);
		
	}

	function Back(param? : any){
		close(false);
		// setMode("");
	}

	

	return (
		<>
			<Add Users={data?.friends} Make={SELECT} title='INVITE A FRIEND' join="INVITE" close={Back} />
		</>
	)
}


