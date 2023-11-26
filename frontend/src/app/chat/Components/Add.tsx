import '../../assest/chatComponents.css';
import Image from 'next/image'
import { useCallback } from 'react';

export default function Add({Users , Make, title, join, exploreG} : {Users: any, Make: any, title: string, join : string, exploreG: any}){

	let Style: any = {};
	if (join == "JOIN")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)" ,
	};
	else if (join == "INVITE")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)"};
	else
		Style = {"backgroundColor": "rgba(255, 51, 102, 1)"};


	return (
		<>
			<div className="Add">
				<h1>{title}</h1>
				<input type="text" className='searchInput' placeholder="Search"/>
				<button onClick={()=>exploreG(false)} className='closeBtn'><div></div></button>
				<div className="content">
					{Users.map((user : any)=>(<>
						<div className="user" key={user}>
							<Image className="g_img" src={user.image} priority={true} alt="img" width={45} height={45}/>
							<h3>{user.title}</h3>
							<button style={Style} onClick={() => {Make(user)}}>{join}</button>
						</div>
					</>))}
				</div>	
			</div>
		</>
	)
}