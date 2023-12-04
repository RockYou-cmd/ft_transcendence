import '../assest/chat.css';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { Get } from '../Components/Fetch/post';
import { APIs } from '../Props/APIs';
import { useEffect, useState } from 'react';
import avatar from '../../../public/avatar.png';



export default function Channel({selectChat} : { selectChat: any}){

	const [data, setData] = useState({} as any);

	async function getFriends(){
		const data = await Get(APIs.Friends + "true");
		setData(data);
	}

	useEffect(() => {
		getFriends();
	}, []);


	function SelecteEvent(e : MouseEvent, friend : any){
		e.preventDefault();
		selectChat(friend);
	}
	
	function PrintFrinds(infos:any){
		
		const info = infos?.infos;
		const friend = <>
			<div className="content" onClick={(e : MouseEvent) => SelecteEvent(e, info)}>
				<Image className="g_img" src={info?.photo ? info?.photo : avatar} priority={true} alt="img" width={70} height={70}/>
				<h4>{info?.username}</h4>
				{/* <p>{info?.messagesReceived.reduce()}</p> */}
				<span>{info?.lastMsgTime}</span>
				{info?.status ? <div className="status"></div> : <></>}
				<div className="line"></div>
			</div>
			</>
		return <div>{friend}</div>
	}


	return(
		<>
		<div className="Friends">
			<span className="groupField">Friends</span>
			<div className='content_f'>
			
				{data?.friends?.map((friend : any) => (<PrintFrinds key={friend.username} infos={friend}/>))}		
			</div>
		</div>
		</>
	)
}


