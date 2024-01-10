
import { APIs } from '@/app/Props/APIs';
import '../../assest/game.css';
import Add from '../../chat/Components/Add';
import { useEffect, useRef, useState } from 'react';
import { Get, GetRes } from '../../Components/Fetch/Fetch';
import { useLogContext, useSocket, useMe } from '../../Components/Log/LogContext';







export default function SelectFriend({close , setMode, select, gameInfo, send} : { close :React.Dispatch<React.SetStateAction<boolean>>, setMode : React.Dispatch<React.SetStateAction<string>>, select : any, gameInfo? : any, send? :any}) {
	
	const [data, setData] = useState(null) as any;
	const {socket} = useSocket();
	const {me} = useMe() as any;
	const selected = useRef("");
	// const [refresh, setRefresh] = useState(false);
	const {online, setOnline} = useLogContext();

	useEffect(() => {
		async function fetchData(){
			const data = await Get(APIs.Friends);
			if (data == undefined){
				await GetRes(APIs.Logout);
				setOnline("OFF");
			}
			setData(data);
		}
		fetchData();
	},[])

	function SELECT(User : any){

		select(User?.username);
		selected.current = User?.username;
		
	}

	function Back(param? : any){
		if (selected.current == ""){
			setMode("");
			close(false);
		}
		else{
			send(true);
			// socket?.emit("invite", {player2 : selected.current, player1 : me?.username});
			gameInfo({player1 : me?.username, player2 : selected.current});
			close(false);
		}
	}

	

	return (
		<>
			<div className="FiendlyGame">
				<Add Users={data?.friends} Make={SELECT} title='ONLINE FRIENDS' join="INVITE" close={Back} />
			</div>
		</>
	)
}


