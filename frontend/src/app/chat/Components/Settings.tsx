
import { useEffect, useRef, useState } from "react";
import { Get } from '../../Components/Fetch/post';
import { APIs } from '../../Props/APIs'
import Image from "next/image";
import avatar from '../../../../public/avatar.png';
import { MouseEvent } from "react";
import '../../assest/chat.css'
import '../../assest/chatComponents.css'
import { ChatOptions } from "@/app/Props/Interfaces";
import Options from "./Options";
import Invite from "./Invite";
import { useRouter } from "next/navigation";
import Add from "./Add";
import { Make }from '../../Components/Fetch/Make';
import AddMembers from "./AddMembers";


const UserSettings: ChatOptions = {Option: ["invite", "sendMsg", "view"], desc: ["Invite To A Game", "Send Message", "View Profile"]};
const AdminSettings: ChatOptions = {Option: ["invite", "sendMsg", "view", "Kick", "Ban", "Mute"], desc: ["Invite To A Game", "Send Message", "View Profile", "Kick", "Ban", "Mute"]};
const SuperAdminSettings : ChatOptions = {Option: ["invite", "sendMsg", "view", "Kick", "Ban", "Mute", "Make", "removeAdmin"], desc: ["Invite To A Game", "Send Message", "View Profile", "Kick", "Ban", "Mute", "Make Admin", "Remove Admin"]};


export default function OwnerSettings({group, close, role} : {group : any, close: any, role : string}){


	console.log("grou  p    ",group?.id);
	console.log("role", role);
/********************************************** */

	const [data, setData] = useState({} as any);

	async function getMembers(){
		const data = await Get(APIs.members + group?.id);
		setData(data);
		console.log("data",  data);
	}

	useEffect(() => {
		getMembers();
	}, []);

	/****************************************************** */
	const [option, setOption] = useState(false);
	const [invite, setInvite] = useState(false);
	const [sendMsg, setSendMsg] = useState(false);
	const [view, setView] = useState(false);
	const [kick, setKick] = useState(false);
	const [ban, setBan] = useState(false);
	const [mute, setMute] = useState(false);
	const [makeAdmin, setMakeAdmin] = useState(false);
	const [removeAdmin, setRemoveAdmin] = useState(false);
	const [add, setAdd] = useState(false);
	const [make, setMake] = useState("");
	const router = useRouter();
	const [User, setUser] = useState({} as any);

	const visible = useRef(null) as any;


	function Settings(option : string){
		if (option == "invite")
			setInvite(true);
		else if (option == "sendMsg")
			setSendMsg(true);
		else if (option == "view")
			setView(true);
		else if (option == "Kick")
			setKick(true);
		else if (option == "Ban")
			setBan(true);
		else if (option == "Mute")
			setMute(true);
		else if (option == "Make")
			setMakeAdmin(true);
		else if (option == "removeAdmin")
			setRemoveAdmin(true);
	}

	async function wait(){
		const res = await Make({ option: make, group: group, person: User.username });
		console.log(res);
		console.log("make", make);
	}

	useEffect(() => {
		if (make !== ""){
			wait();
		}
		console.log("make", make);
	}, [make]);

	useEffect(() => {
		if (kick)
			setMake("Kick");
		else if (ban)
			setMake("Ban");
		else if (mute)
			setMake("Mute");
		else if (makeAdmin)
			setMake("MakeAdmin");
		else if (removeAdmin)
			setMake("removeAdmin");

	}, [sendMsg, kick, ban, mute, makeAdmin, removeAdmin]);

	function Print(users : any){
		const user = users?.users;
		const print = <>
			<div className={role == "ADMIN" ? "user admin" : role == "OWNER" ? "user owner" : "user"} ref={visible}>
				<Image className="g_img" src={user?.user?.photo ? user?.user?.photo : avatar} priority={true} alt="img" width={45} height={45}/>
				<h3>{user?.user.username}</h3>
				<button onClick={()=>{setOption(!option);setUser(user)}}>Options</button>
			</div>
		</>
		return <div>{print}</div>
	}
	return(
		<>
			<div className="Add" >
				<h1>Members</h1>
				<input type="text" className="searchInput" placeholder="Search"/>
				<button onClick={()=>close(false)} className='closeBtn'><div></div></button>
				<div className="content">
					{data?.members?.map((user : any, index : number)=>(<Print key={index} users={user}/>))}
				</div>
				<button onClick={()=>setAdd(true)}>Add Member</button>
				{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={Settings} content={role == "OWNER" ? SuperAdminSettings : (role == "ADMIN" && User.role == "MEMBER") ? AdminSettings : UserSettings}/>}
				{invite && <Invite User={data} close={setInvite} />}
				{add && <AddMembers group={group} close={setAdd}/>}
				{view && router.push("/users/" + User.username)}
			</div>
		</>
	)
}