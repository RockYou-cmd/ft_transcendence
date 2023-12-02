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
	
	console.log("friends ", data);

	return(
		<>
		<div className="Friends">
			<span className="groupField">Friends</span>
			<div className='content_f'>
					{data?.friends?.map((friend : any) => (<>
			        <div className="content" key={friend?.username} onClick={(e : MouseEvent) => SelecteEvent(e, friend)}>
						<Image className="g_img" src={friend?.photo ? friend?.photo : avatar} priority={true} alt="img" width={70} height={70}/>
						<h4>{friend?.username}</h4>
						{/* <p>{friend?.messagesReceived.reduce()}</p> */}
						<span>{friend.lastMsgTime}</span>
						{friend.status ? <div className="status"></div> : <></>}
						<div className="line"></div>
					</div>
					</>
				))}
		
			</div>
		</div>
		</>
	)
}


