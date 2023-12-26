
import { APIs } from '@/app/Props/APIs';
import '../../assest/game.css';
import Add from '../../chat/Components/Add';
import { useEffect, useState } from 'react';
import { Get, GetRes } from '../../Components/Fetch/Fetch';
import { useLogContext } from '../../Components/Log/LogContext';







export default function SelectFriend({close , setMode, select} : { close :React.Dispatch<React.SetStateAction<boolean>>, setMode : React.Dispatch<React.SetStateAction<string>>, select : any}) {
	
	const [data, setData] = useState(null) as any;
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
	
	
	function SELECT(User : any){
		select(User?.username);
	}

	function Back(param? : any){
		close(false);
		setMode("");
	}

	
	console.log("ohayou ", data?.friends);

	return (
		<>
			<Add Users={data?.friends} Make={SELECT} title='INVITE A FRIEND' join="INVITE" close={Back} />
		</>
	)
}


