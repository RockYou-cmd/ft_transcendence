
import Add from "./Add"
import { APIs } from "../../Props/APIs"
import { useState, useEffect, useRef } from "react"
import { Get } from "../../Components/Fetch/post";
import { Post } from "../../Components/Fetch/post";
import '../../assest/Components.css';
import Image from 'next/image';
import avatar from '../../../../public/avatar.png';






export default function ExploreRooms({close} : {close: any}){
	
	const [data, setData] = useState({} as any);
	const [roomSelected, setRoomSelected] = useState({} as any);

	function JoinGroup({Room} : {Room : any}){
	
		let res : any;
		const [password, setPassword] = useState("");

		async function SubmitHandler(e : any){
			e.preventDefault();
			res = await Post({id : Room?.id, password :password}, APIs.JoinProtectedRoom);
			if(res?.status == 201){
				alert("Joined");
				close(false);
			}
			else{
				alert("Wrong Password");
			}
			setPassword("");
			console.log("res ", res);
		}
		

		if (Room?.privacy == "PUBLIC"){
			res = Post({id : Room?.id}, APIs.JoinRoom);
			return null;
		}
		return(<>
			<div className="Join">
				<form className="PassWord" onSubmit={SubmitHandler}>
				<button onClick={()=>setRoomSelected({})} className='closeBtn'><div></div></button>
					<label>Enter Password To Join {Room?.name} group</label>
					<input type="text" value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
					<button type="submit">Join</button>
				</form>
			</div>
			</>)	
	}



	async function getRooms(){
		const data = await Get(APIs.Groups);
		setData(data);
	}

	useEffect(() => {
		getRooms();
	}, []);

	function Print(users : any){
		const user = users?.users;
		const print = <>
			<div className={"user"}>
				<Image className="g_img" src={user?.photo ? user?.photo : avatar} priority={true} alt="img" width={45} height={45}/>
				<h3>{user?.name}</h3>
				<button onClick={()=>setRoomSelected(user)}>JOIN</button>
			</div>
		</>
		return <div>{print}</div>
	}


	
	return(
		<>
			<div className="JoinRoom">
				
				<div className="Add">
					<h1>Explore Groups</h1>
					<input type="text" className='searchInput' placeholder="Search"/>
					<button onClick={()=>close(false)} className='closeBtn'><div></div></button>
					<div className="content">
						{roomSelected?.name ? <JoinGroup Room={roomSelected}/> :
						data?.rooms?.map((room : any, index : number)=>(<Print key={index} users={room}/>))}
					</div>
					{/* <Add Users={data?.rooms} Make={setRoomSelected} title="Explore Groups" join="JOIN" close={close}/>
					{roomSelected?.name ? <JoinGroup Room={roomSelected}/> : <></>} */}
				</div>
			</div>
		</>
	)
}