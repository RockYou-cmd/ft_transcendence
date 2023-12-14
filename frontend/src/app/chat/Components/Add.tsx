import '../../assest/chatComponents.css';
import "../../assest/chat.css";
import Image from 'next/image'
import { MouseEvent, useEffect , useState} from 'react';
import avatar from '../../../../public/avatar.png';
import '../../assest/Components.css';
import Link from 'next/link';
import { Make }from '../../Components/Fetch/Make';

export default function Add({Users , Make, title, join, close, id} : {Users: any, Make: any, title: string, join : string, close: any, id? : any}){

	const [option, setOption] = useState(false);
	const [search, setSearch] = useState("");
	const [data, setData] = useState(null) as any;

	let Style: any = {};

	if (join == "JOIN" || "ADD" || "Group")
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)" ,
	};
	else if (join == "StartChat")
		Style = {"backgroundColor": "#1A66FF"};

	function MakeEvent(e: MouseEvent, user : any){
		e.preventDefault();
		Make(user);
		if (join == "StartChat")
			close(false);
	}

	useEffect(() => {
		const SearchRes = Users?.filter((user: any)=>{
			if (join == "StartChat")
				return user.users[0].username.toLowerCase().includes(search.toLowerCase()) || user?.name?.toLowerCase().includes(search.toLowerCase()) || user?.username?.toLowerCase().includes(search.toLowerCase());
			return user.username.toLowerCase().includes(search.toLowerCase()) || user?.name?.toLowerCase().includes(search.toLowerCase()) || user?.username?.toLowerCase().includes(search.toLowerCase());	
		})
		setData(SearchRes);
	}, [Users, search]);

	console.log("id ", id);

	function Print(users : any){
		let user = users?.users;
		if (join == "StartChat"){
			user = user.users[0];
		}
		const print = <>
			<Link href={"/users/" + user?.username} passHref={true} ><div className={"user"}>
				<Image className="g_img" src={user?.photo ? user?.photo : avatar} priority={true} alt="img" width={45} height={45}/>
				<h3>{user?.name ? user?.name : user?.username}</h3>
				{user.status == "BANNED" ? <button className='UseraddBtn' style={Style} onClick={Make("Kick", id, user?.username)}>UNBAN</button>
				:  <button className='UseraddBtn' style={Style} onClick={(e: MouseEvent)=>MakeEvent(e, user)}>{join}</button>
				}
				{join == "JOIN" && <div className='Join'></div>}
			</div></Link>
		</>
		return <div>{print}</div>
	}
	
	return (
		<>
			<div className="Add">
				<h1>{title}</h1>
				<input type="text" className='searchInput' value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
				<button onClick={()=>close(false)} className='closeBtn'><div></div></button>
				<div className="content">
					{data?.map((user : any, index : number)=>(<Print key={index} users={user}/>))}
				</div>	
				{/* {option && <Options visible={setOption} option={option} btnRef={null} setOptions={null} content={role == "SimpleUser" ? SimpleUser : role == "Admin" ? Admin : Owner}/>} */}
			</div>
		</>
	)
}	