import '../assest/chat.css';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { Get } from '../Components/Fetch/Fetch';
import { APIs } from '../Props/APIs';
import { useEffect, useState } from 'react';
import avatar from '../../../public/avatar.png';



export default function Channel({ selectChat, refresh }: { selectChat: any, refresh: boolean }) {

	const [data, setData] = useState({} as any);

	async function getFriends() {
		const data = await Get(APIs.FriendsChat);
		setData(data);
	}

	useEffect(() => {
		getFriends();
	}, [refresh]);


	function SelecteEvent(e: MouseEvent, friend: any) {
		e.preventDefault();
		selectChat(friend);
	}

	function PrintFrinds(infos: any) {

		let info = infos?.infos;
		info = info?.members[0];
		const friend = <>
			<div className="content" onClick={(e: MouseEvent) => SelecteEvent(e, info)}>
				<Image className="g_img" src={info?.photo ? info?.photo : avatar} priority={true} alt="img" width={70} height={70} />
				<h4>{info?.username}</h4>
				{/* <p>{info?.messagesReceived.reduce()}</p> */}
				<span>{info?.lastMsgTime}</span>
				{((info?.status == "ONLINE" || info?.status == "INGAME") && (info?.friends ? (info.friends[0]?.status != "BLOCKED" ? true : false) : true)) ? <div className="status"></div> : <></>}
				<div className="line"></div>
			</div>
		</>
		return <div>{friend}</div>
	}


	return (
		<>
			<div className="Friends">
				<span className="groupField">Chats</span>
				<div className='content_f'>

					{data?.chats?.map((friend: any, index : number) => (<PrintFrinds key={index} infos={friend} />))}
				</div>
			</div>
		</>
	)
}


