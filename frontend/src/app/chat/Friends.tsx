import '../assest/chat.css';
import Image from 'next/image';
import { Friends, friends } from './page';
import { MouseEvent } from 'react';
import { Get } from '../Components/Fetch/post';
import { APIs } from '../Props/APIs';
import { useEffect, useState } from 'react';
// import { friends } from './page';
import avatar from '../../../public/avatar.png';



export default function Channel({selectChat} : { selectChat: any}){

	const [data, setData] = useState({} as any);

	async function getFriends(){
		const data = await Get(APIs.Friends);
		setData(data);
	}

	useEffect(() => {
		getFriends();
	}, []);


	function SelecteEvent(e : MouseEvent, friend : any){
		e.preventDefault();
		selectChat(friend);
	}
	console.log("friends", data);
	

	return(
		<>
		<div className="Friends">
			<span className="groupField">Friends</span>
			<div className='content_f'>
					{Object.keys(data).length != 0 && data?.friends?.map((chn : any) => (<>
			        <div className="content" key={chn} onClick={(e : MouseEvent) => SelecteEvent(e, chn)}>
						<Image className="g_img" src={chn?.photo ? chn?.photo : avatar} priority={true} alt="img" width={70} height={70}/>
						<h4>{chn?.username}</h4>
						<p>{chn.lastMsg}</p>
						<span>{chn.lastMsgTime}</span>
						{chn.status ? <div className="status"></div> : <></>}
						<div className="line"></div>
					</div>
					</>
				))}
			</div>
		</div>
		</>
	)
}


