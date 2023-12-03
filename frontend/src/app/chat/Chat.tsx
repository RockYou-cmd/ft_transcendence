import '../assest/chat.css';
import Image from 'next/image';
import bboulhan from '../../../public/bboulhan.jpg';
import { useEffect, useState , useRef, use} from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';
import Add from './Components/Add';
import GroupSettings from './Components/Group_settings';
import Confirm from './Components/Confirm';
import Invite from './Components/Invite';
import { Get } from '../Components/Fetch/post'
import { APIs } from '../Props/APIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import avatar from '../../../public/avatar.png';
import { Post } from '../Components/Fetch/post';
import { useLogContext } from '../Components/Log/LogContext';
import ShowMsg from './Components/printmsg';


const chatSettings : ChatOptions = {Option: ["invite", "block", "view"], desc: ["invite for a game", "Block user", "View profile"]};
const groupSettings : ChatOptions = {Option: ["leave", "addUser", "settings", "addAdmin"],
	desc: ["Leave group", "Add member", "Group settings", "Add admin"]};


export default function Cnvs({ User} : {User : any}) {

	const [refresher, setRefresher] = useState(false);
	const scroll = useRef(null) as any;
	const [chat, setChat] = useState({} as any);
	const router = useRouter();
	const msgImg = useRef(null) as any;
	const [input, setInput] = useState("");
	const [option, setOption] = useState(false);
	const admin = true;
	const group = true;
	const content : ChatOptions = (group ?(admin ? groupSettings : {Option: ["leave"], desc:["Leave group"]}) : chatSettings);
	
	async function getChat(name: string){
		const data = await Get(APIs.getChat + name);
		setChat(data);
		console.log("chat", data);
	}

	useEffect(()=>{
		if (Object.keys(User).length != 0)
			getChat(User.username);
	},[User, refresher])

	console.log("User in chat", User);
	
	function Explore(user: any){
		
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

	// useEffect(() => {}, [refresher]);

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

	async function send(){
		if (input != ""){
			const data = {message: input, username: User.username};
			const res = await Post(data, APIs.sendMsg);
			// setInput("");
		}
		// else if (msgImg.current?.files[0]){
		// 	console.log(msgImg.current?.files[0]);
		// 	Messages.push({user: sender, text: msgImg.current?.files[0], time: "12:00"});
		// }
		setRefresher(!refresher);
	}

	useEffect(() => {
		if (scroll.current){
			scroll.current.scrollTop = scroll.current.scrollHeight;
		}
	}, [chat]);


	useEffect(() => {
		if (invite || block || view || leave || addUser || settings || addAdmin){
			setOption(false);
			setId(true);
		}
		else{
			setId(false);}
	}, [invite, block, view, leave, addUser, settings, addAdmin]);
	
	return(
		<>
			<div className="Chat">
				<section className='User'>
					
					<Image className='g_img' src={User?.photo ? User?.photo : avatar} priority={true} alt="img" width={75} height={75}/>
					<h1 onClick={()=>{router.push("/users/" + User?.username)}}>{User?.username}</h1>
					<span>{User?.status ? "online" : "offline"}</span>
					<div className="line"></div>
					{User?.status ? <div className="status"></div> : <></>}
				
					{Object.keys(User).length != 0 && <button ref={visible} onClick={() =>{setOption(!option)}} className="Options">
						<div className='point'></div><div className='point'></div><div className='point'></div>
					</button>}
					{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={content}/>}
				</section>
				<div className="Msg" ref={scroll}>
					{Object.keys(chat).length != 0 && chat?.messages?.map((msg : any, index : number) => (<>
						<div key={index + index % 2 + index / 2} className={msg?.receiverId != User.username? "usr_msg" : "my_msg"}>
							<p>{msg?.content}</p>
							<span >{msg?.createdAt}</span>
							<div className='triangle'></div>
						</div>
					</>))}
				</div>
				<div className="Send" >
					<div className="line"></div>
					<section>
						<input type="text" placeholder="Type a message" onChange={(e)=>{setInput(e.target.value)}}/>
						<input ref={msgImg} className='sendImg' type="file" /><FontAwesomeIcon icon={faCamera} className="icon"/>
					</section>
					<button onClick={send}><div></div></button>
				</div>
			</div>
			{/* {addUser && <Add Users={friends} Make={Explore} title={"Add member"} join={"INVITE"} exploreG={setAddUser}/>}
			{addAdmin && <Add Users={friends} Make={Explore} title={"Add admin"} join={"MAKE ADMIN"} exploreG={setAddAdmin}/>} */}
			{settings && <GroupSettings close={setSettings}/>}
			{leave && <Confirm Make={Explore} title={"Leave this group"} close={setLeave} user={User}/>}
			{block && <Confirm Make={Explore} title={`Block ${User.username}`} close={setBlock} user={User}/>}
			{invite && <Invite User={User} close={setInvite}/>}
			{view && router.push("/users/" + User?.username)}
		</>

	)
}