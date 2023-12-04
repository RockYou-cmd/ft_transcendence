
import Add from "./Add"
import { APIs } from "../../Props/APIs"
import { useState, useEffect, useRef } from "react"
import { Get } from "../../Components/Fetch/post";
import { Post } from "../../Components/Fetch/post";





export default function ExploreRooms({close} : {close: any}){
	
	function JoinGroup({Room} : {Room : any}){
	
	let res : any;
	const PassWord = useRef(null);

		async function SubmitHandler(e : any){
			e.preventDefault();
			res = await Post({id : Room?.id, password : PassWord.current}, APIs.JoinRoom);
			if(res?.status == 201){
				alert("Joined");
				close(false);
			}
			else{
				alert("Wrong Password");
			}
		}

		if (Room?.privacy == "PUBLIC"){
			res = Post({id : Room?.id}, APIs.JoinRoom);
		}
	
	if (Room?.privacy == "PUBLIC")
		return null;
	return(<>
			<form className="JoinRoom" onSubmit={SubmitHandler}>
				<input ref={PassWord} type="text" placeholder="Enter Password"/>
				<button type="submit">Join</button>
			</form>
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




	return(
		<>
			<Add Users={data?.rooms} Make={setRoomSelected} title="Explore Groups" join="JOIN" close={close}/>
			{roomSelected?.name ? <JoinGroup Room={roomSelected}/> : <></>}
		</>
	)
}