import '../../assest/chatComponents.css';
import "../../assest/chat.css";
import Image from 'next/image'
import { MouseEvent, useEffect , useState} from 'react';
import avatar from '../../../../public/avatar.png';
import '../../assest/Components.css';
import Link from 'next/link';
import { Make as Ban }from '../../Components/Fetch/Make';

interface Params{
	Users : any,
	Make : any,
	title : string,
	join : string,
	close : any,
	id? : any,
	refresh? : boolean;
	setRefresh? : any;
}


export default function Add({Users, Make, title, join, close, id, refresh, setRefresh} : Params){

	const [option, setOption] = useState(false);
	const [search, setSearch] = useState("");
	const [data, setData] = useState(null) as any;

	let Style: any = {};

	if (join == ("JOIN" || "ADD" || "Group"))
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)"};
	else if (join == "Start Chat")
		Style = {"backgroundColor": "#1A66FF"};
	else if (join == "INVITE")
		Style = {"background": "linear-gradient(94deg, #3184BF 3.66%, #1AD5FF 96.9%)"}
	else
		Style = {"backgroundColor": "rgba(249, 172, 24, 1)"};
	

	function MakeEvent(e: MouseEvent, user : any){
		e.preventDefault();
		Make(user);
		if (join == "Start Chat" || join == "INVITE")
			close(false);
	}

	async function BanEvent(e : MouseEvent, user : any){
		e.preventDefault();
		const res = await Ban({
			option: "Kick",
			group: id,
			person: user?.username,
		});
		if (res?.status == 201)
			setRefresh(!refresh);
	}

	useEffect(() => {
		const SearchRes = Users?.filter((user: any)=>{
			if (join == "Start Chat" || join == "INVITE")
				return user?.users[0]?.username.toLowerCase().includes(search.toLowerCase())
			return user?.username?.toLowerCase().includes(search.toLowerCase()) || user?.name?.toLowerCase().includes(search.toLowerCase()) || user?.username?.toLowerCase().includes(search.toLowerCase());	
		})
		setData(SearchRes);
	}, [Users, search]);



	function Print(users : any){
		let user = users?.users;
		if (join == "Start Chat" || join == "INVITE"){
			user = user.users[0];
		}

		if (join == "INVITE" && user?.status == "OFFLINE")
			return <></>;
		const print = <>
			<Link href={"/users/" + user?.username} passHref={true} ><div className={"user"}>
				<Image className="g_img" src={user?.photo ? user?.photo : avatar} priority={true} alt="img" width={45} height={45}/>
				<h3>{user?.name ? user?.name : user?.username}</h3>
				{join != "Start Chat" && join != "INVITE" && user?.rooms[0]?.status== "BANNED" ? <button className='UseraddBtn' style={{backgroundColor : "#ff2638"}} onClick={(e : MouseEvent)=>BanEvent(e, user)}>UNBAN</button>
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
			</div>
		</>
	)
}	