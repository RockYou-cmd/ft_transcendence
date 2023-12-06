import '../assest/chat.css';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { Get } from '../Components/Fetch/post';
import { APIs } from '../Props/APIs';
import { useEffect, useState } from 'react';
import avatar from '../../../public/avatar.png';

// import { channels } from './page';




export default function Groups({Group, refresh} : {Group : any, refresh : boolean}){

	const [data, setData] = useState({} as any);

	async function getRooms(){
		const data = await Get(APIs.myGroups);
		setData(data);
	}

	useEffect(() => {
		getRooms();
	}, [refresh]);
	
	
	function SelecteEvent(e : MouseEvent, channel : any){
		e.preventDefault();
		Group(channel);
	}

	function PrintGroup({chn} : {chn : any}){
		// const chn = rooms?.rooms;
		const group =  <>
			<div className="content" onClick={(e : MouseEvent)=>SelecteEvent(e, chn)}>
				<Image className="g_img" src={chn?.photo ? chn.photo : avatar} priority={true} alt="img" width={70} height={70}/>
				<h4>{chn?.name}</h4>
				{/* <p>{chn.lastMsg}</p> */}
				{/* <span>{chn.lastMsgTime}</span> */}
				<div className="line"></div>
			</div>
			</>
		return <div>{group}</div>
	}


	return(
		<>
			<div className="Groups">
				<span className="groupField">Groups</span>
				<div className="content_g">
					{data?.rooms?.map((data : any, index: any) => (<PrintGroup chn={data} key={index}/>))}
				</div>
			</div>
		</>
	);
}