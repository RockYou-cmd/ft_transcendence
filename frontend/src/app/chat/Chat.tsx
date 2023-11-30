import '../assest/chat.css';
import Image from 'next/image';
import bboulhan from '../../../public/bboulhan.jpg';
import { useEffect, useState , useRef, use} from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';
import { friends } from './page';
import Add from './Components/Add';
import GroupSettings from './Components/Group_settings';
import Confirm from './Components/Confirm';
import Invite from './Components/Invite';

interface user{
	username: string;
	image: any;
	status: string;
	classname: string;
	
}

interface message{
	user: user;
	text: string;
	time: string;
}

let User : user = {username: "alae", image: bboulhan, status: "online", classname: "usr_msg"};
let Me : user = {username: "brahim", image: bboulhan, status: "online", classname: "my_msg"};
let Messages : message[] = [];
Messages.push({user: User, text: "hello", time: "12:00" });
Messages.push({user: Me, text: "helloooo", time: "16:00"});
Messages.push({user: User, text: "hi i m here", time: "12:35"});
Messages.push({user: Me, text: "hello", time: "17:20"});
Messages.push({user: Me, text: "hello", time: "17:20"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});
Messages.push({user: Me, text: "hello", time: "20:01"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});
Messages.push({user: Me, text: "hello", time: "17:20"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});
Messages.push({user: Me, text: "hello", time: "17:20"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});
Messages.push({user: User, text: "helasda dsasd asd asdlo", time: "21:32"});

const chatSettings : ChatOptions = {Option: ["invite", "block", "view"], desc: ["invite for a game", "Block user", "View profile"]};
const groupSettings : ChatOptions = {Option: ["leave", "addUser", "settings", "addAdmin"],
	desc: ["Leave group", "Add member", "Group settings", "Add admin"]};

// const adminSettings: ChatOptions = {Option: ["add", "remove", "view"],}


export default function Cnvs({style} : {style: any}) {
	
	const [option, setOption] = useState(false);
	const admin = true;
	const group = true;
	const content : ChatOptions = (group ?(admin ? groupSettings : {Option: ["leave"], desc:["Leave group"]}) : chatSettings);
	
	function Explore(user: any){
		console.log("user", user);
	}
	//hooks for chat settings
	const [invite, setInvite] = useState(false);
	const [block, setBlock] = useState(false);
	const [view, setView] = useState(false);
	const [leave, setLeave] = useState(false);
	const [addUser, setAddUser] = useState(false);
	const [settings, setSettings] = useState(false);
	const [addAdmin, setAddAdmin] = useState(false);
	
	const [id, setId] = useState(false);
	
	const visible = useRef(null) as any;

	function OptionHandler(setting: string){
		if (setting == "invite")
			setInvite(true);
		else if (setting == "block")
			setBlock(true);
		else if (setting == "view")
			setView(true);
		else if (setting == "leave")
			setLeave(true);
		else if (setting == "addUser")
			setAddUser(true);
		else if (setting == "settings")
			setSettings(true);
		else if (setting == "addAdmin")
			setAddAdmin(true);
	}

	useEffect(() => {
		if (invite || block || view || leave || addUser || settings || addAdmin){
			setOption(false);
			style(true);
			setId(true);
		}
		else{
			style(false);
			setId(false);}
	}, [invite, block, view, leave, addUser, settings, addAdmin]);

	return(
		<>
			<div className="Chat">
				<section className='User'>
					<Image className='g_img' src={bboulhan} priority={true} alt="img" width={75} height={75}/>
					<h1>{User.username}</h1>
					<span>{User.status}</span>
					<div className="line"></div>
					{User.status == "online" ? <div className="status"></div> : <></>}
					<button ref={visible} onClick={() =>{setOption(!option)}} className="Options">
						<div className='point'></div><div className='point'></div><div className='point'></div>
					</button>
					{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={content}/>}
				</section>
				<div className="Msg">
					{Messages.map((msg : any) => (<>
						<div className={msg.user.classname} key={msg}>
						<p >{msg.text}</p>
						<span >{msg.time}</span>
						<div className='triangle'></div>
						</div>
					</>))}
				</div>
				<div className="Send">
					<div className="line"></div>
					<input type="text" placeholder="Type a message" />
					<button><div></div></button>
				</div>
			</div>
			{addUser && <Add Users={friends} Make={Explore} title={"Add member"} join={"INVITE"} exploreG={setAddUser}/>}
			{addAdmin && <Add Users={friends} Make={Explore} title={"Add admin"} join={"MAKE ADMIN"} exploreG={setAddAdmin}/>}
			{settings && <GroupSettings close={setSettings}/>}
			{leave && <Confirm Make={Explore} title={"Leave this group"} close={setLeave} user={User}/>}
			{block && <Confirm Make={Explore} title={`Block ${User.username}`} close={setBlock} user={User}/>}
			{invite && <Invite User={User} close={setInvite}/>}
		</>

	)
}