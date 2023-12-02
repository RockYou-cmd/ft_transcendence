import '../../assest/chatComponents.css';
import Image from 'next/image'
import { MouseEvent, useEffect , useState} from 'react';
import avatar from '../../../../public/avatar.png';


export default function Add({Users , Make, title, join, exploreG} : {Users: any, Make: any, title: string, join : string, exploreG: any}){

	let Style: any = {};
	if (join == "JOIN")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)" ,
	};
	else if (join == "INVITE")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)"};
	else if (join == "StartChat")
		Style = {"backgroundColor": "#1A66FF"};

	else
		Style = {"backgroundColor": "rgba(255, 51, 102, 1)"};

	function MakeEvent(e: MouseEvent, user : any){
		e.preventDefault();
		Make(user);
		if (join == "StartChat")
			exploreG(false);
	}

	

	return (
		<>
			<div className="Add" id="child">
				<h1>{title}</h1>
				<input type="text" className='searchInput' placeholder="Search"/>
				<button onClick={()=>exploreG(false)} className='closeBtn'><div></div></button>
				<div className="content">
					{Users?.map((user : any, index : number)=>(<>
						<div className="user" key={index}>
							<Image className="g_img" src={user?.photo ? user?.photo : avatar} priority={true} alt="img" width={45} height={45}/>
							<h3>{user?.username}</h3>
							<button style={Style} onClick={(e: MouseEvent)=>MakeEvent(e, user)}>{join}</button>
						</div>
					</>))}
				</div>	
			</div>
		</>
	)
}	