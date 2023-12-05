
import Add from "./Add"
import { APIs } from "../../Props/APIs"
import { useState, useEffect, useRef } from "react"
import { Get } from "../../Components/Fetch/post";
import { Post } from "../../Components/Fetch/post";
import '../../assest/Components.css'





export default function ExploreRooms({close} : {close: any}){
	
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
					<label>Enter Password for {Room?.name} group</label>
					<input type="text" value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
					<button type="submit">Join</button>
				</form>
			</div>
			</>)	
	}


	const [data, setData] = useState({} as any);
	const [roomSelected, setRoomSelected] = useState({} as any);

	async function getRooms(){
		const data = await Get(APIs.Groups);
		setData(data);
	}

	useEffect(() => {
		getRooms();
	}, []);

	console.log("data ", data);
	
	return(
		<>
			<div className="JoinRoom">
				<Add Users={data?.rooms} Make={setRoomSelected} title="Explore Groups" join="JOIN" close={close}/>
				{roomSelected?.name ? <JoinGroup Room={roomSelected}/> : <></>}
			</div>
		</>
	)
}