import '../assest/Components.css'
import {APIs} from '../Props/APIs'
import { useEffect, useState ,useRef } from 'react'
import { Get, Post } from '../Components/post'
import Image from 'next/image'
import { MouseEvent } from 'react'

type data = {image: any, username: string,friend: ("send" | "sent" | "friend")};

const users : data[] = [];
users.push({image: "/bboulhan.jpg", username: "brahim", friend: "send"});
// users.push({image: "/ael-korc.jpg", username: "alae", friend: "sent"});
// users.push({image: "/yel-qabl.jpg", username: "youssef", friend: "friend"});
// users.push({image: "/bboulhan.jpg", username: "brahim", friend: "send"});
// users.push({image: "/ael-korc.jpg", username: "alae", friend: "sent"});
// users.push({image: "/yel-qabl.jpg", username: "youssef", friend: "friend"});



export default function SearchRes({Res} : {Res : any}){

	const [data, setData] = useState({} as any);
	const [refresh, setRefresh] = useState(false);
	useEffect(()=>{
		async function getData(){
			setData(await Get(APIs.Search + Res));
		}
		getData();
	}, [refresh]);
	const fRef = useRef(null) as any;


	// useEffect(() => {
	// 	const handleOutsideClick = (event: MouseEvent) => {
	// 		if (!SearchBar.current.contains(event.target as Node) && !placeRef.current.contains(event.target as Node)) {
	// 			visible(false);
	// 		}
	// 	};

	// 	document.addEventListener('mousedown', handleOutsideClick);

	// 	return () => {
	// 		document.removeEventListener('mousedown', handleOutsideClick);
	// 	};

	// }, [visible]);

	const [msg, setMsg] = useState("send friend request");

	async function sendData(data: object){
		const res = await Post(data, APIs.SendFriendRequest);
		if (res.status == 201){
			setRefresh(!refresh);
		}
		else
			alert("error");
}

function Send(e : MouseEvent, user : string){
	e.preventDefault();
	
	const data = {username : user};
	sendData(data);
	setRefresh(!refresh);
	// console.log(data.username);

}
	
	
	
	// if (data == undefined)
	// 	return (<></>);
	return (
		<>
			<div id="SearchRes">
				{data.users.map((user: data, index: number) => (
					<div className='results' key={index}>
						<Image className="g_img" src={user.image} priority={true} alt="img" width={45} height={45}/>
						<span>{user.username}</span>
						<button ref={fRef} onClick={(e : MouseEvent)=> Send(e,user.username)}>{user.friend}</button>
					</div>
				))}
			</div>
		</>
	)
}
