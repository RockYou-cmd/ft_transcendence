"use client"
import '../assest/chat.css';
import Image from 'next/image';
import Groups from './Groups';
import Friends from "./Friends";
import Cnvs from "./Chat";
import { useEffect, useState, useRef } from "react";
import LoG from "../Components/Log/Log";
import Options from "./Components/Options";
import CreateGroup from './Components/Create_group';
import { ChatOptions } from '../Props/Interfaces';
import SearchBar from '../Components/Fetch/SearchBar';
import StartChat from './Components/StartChat';
import { useRouter } from 'next/navigation';
import { APIs } from '../Props/APIs';
import ExploreRooms from './Components/ExploreRooms';
import Confirm from './Components/Confirm';
import OwnerSettings from './Components/Settings';
import { Post, Put ,Get } from '../Components/Fetch/Fetch';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocketPrivider, useLogContext, useMe , useSocket} from '../Components/Log/LogContext';
import { useSearchParams } from 'next/navigation';
import Loading from '../loading';
import { SendFriendRequest } from '../Components/Settings/ChatSettings';
import { Disconnect } from '../Components/Log/Logout';
import chatAnimation from "../../../public/chat.gif"




let chatOptions: ChatOptions = { Option: ["CreateG", "ExploreG", "NewChat"], desc: ["Create Group", "Explore Groups", "Start Chat"] };


export default function Chat() {
	
	const { me } = useMe() as any;
	const { socket } = useSocket();
	const { online , setOnline} = useLogContext();
	const param = useSearchParams();
	
	async function Block(User: any) {
		const res = await Put({ username: User?.username }, APIs.Block);
		if (res.ok) {
			socket?.emit("update", {type : "friendship" , option : "block" , receiver : User?.username, sender : me?.username});
		}
	}
	
	
	function InviteToGame(User : any){
		socket?.emit("invite", {player2 : User?.username, player1 : me?.username});
	}
	// hooks for data
	const [User, setUser] = useState({} as any);
	const [refresh, setRefresh] = useState(false);
	const [role, setRole] = useState("ADMIN" || "OWNER" || "MEMBER" || "");
	
	// hooks for login
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);

	const hooks = {
		dataHook: { state: data, setState: setData },
		waitHook: { state: wait, setState: checkwait },
	}
	
	/************************************************** */
	
	const router = useRouter();
	const [option, setOption] = useState(false);
	const visible = useRef(null);


	//  hooks for options
	const [createG, setCreateG] = useState(false);
	const [explore, setExplore] = useState(false);
	const [newChat, setNewChat] = useState(false);
	const [invite, setInvite] = useState(false);
	const [block, setBlock] = useState(false);
	const [view, setView] = useState(false);
	const [leave, setLeave] = useState(false);
	const [settings, setSettings] = useState(false);
	const [seeMem, setSeeMem] = useState(false);
	const [unBlock, setUnBlock] = useState(false);
	
	const [Style, setStyle] = useState({} as any);
	
	async function Leave(GroupId: any) {
		await Post({ id: GroupId?.id }, APIs.LeaveRoom);
		setUser({});
	}
	function OptionsHandler(option: string) {
		if (option == "CreateG")
		setCreateG(true);
		else if (option == "ExploreG")
			setExplore(true);
		else if (option == "NewChat")
			setNewChat(true);
		else if (option == "invite")
			setInvite(true);
		else if (option == "sendMsg")
			setView(true);
		else if (option == "view")
			setView(true);
		else if (option == "leave")
			setLeave(true);
		else if (option == "settings")
			setSettings(true);
		else if (option == "see")
			setSeeMem(true);
		else if (option == "block")
			setBlock(true);
		else if (option == "unblock")
			setUnBlock(true);
	}

	useEffect(() => {	
		socket?.on("update", (data: any) => {

			if (data?.option == "Kick" || data?.option == "Ban" || data?.option == "joinGroup"){
				setUser({});
			}
			else if (data?.option == "newChat"){
				setRefresh(!refresh);
			}
		});
		return () => {socket?.off("update", ()=>{});}
	},[socket, refresh])

	useEffect(() => {
		async function fetchData(user : string) {
			const data = await Get(APIs.User + user);
			if (data == undefined)
				Disconnect({socket : socket, setOnline : setOnline, router : router});
			setUser(data);
		}
		if (param.get("user") != null)
			fetchData(param.get("user") as string);
		router.replace("/chat");
	},	[]);

	useEffect(() => {
		setRefresh(!refresh);
	}, [User]);

	useEffect(() => {
		if (createG || explore || newChat || invite || leave || settings || seeMem || block) {
			setStyle({
				"filter": "blur(7px)",
				"pointerEvents": "none",
			})
			setOption(false);
		}
		else
			setStyle({});

		if (!createG || !explore || !newChat || !invite || !leave || !settings || !seeMem || !block || !unBlock) {
			setRefresh(!refresh);
		}
		if (view)
			router.push("/users/" + User?.username);
		if (unBlock){
			SendFriendRequest({ username: User?.username, status: "unblock", socket: socket, me: me});
			setUnBlock(false);
		}
	}, [createG, explore, newChat, invite, leave, settings, seeMem, block, view, unBlock]);

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	if (!hooks.waitHook.state) {
		return (<Loading />)
	}
	return (
		<>
			{online == "OFF" ? render :
				(<>
					<div className='Cover'>
						<div className={"ChatPage"} style={Style}>
							<section className="sec1">
								<div className="searchBar">
									<SearchBar title={"profile"} />
									<button ref={visible} onClick={() => { setOption(!option) }} className="Options">
										<div className="straight"></div><div className="straight"></div><div className="straight"></div>
									</button>
									{option &&  <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionsHandler} content={chatOptions} />}
								</div>

								<Groups Group={setUser} refresh={refresh} />
								<Friends selectChat={setUser} refresh={refresh} />

							</section>
							<div className='Chat'>
								{Object.keys(User).length != 0 ? <Cnvs User={User} Role={setRole} OptionHandler={OptionsHandler} refresh={refresh}/>
									: <div className='openChat'>
										<div className='mix-blend-multiply w-[20vh]'>

										<Image src={chatAnimation} alt='chat animtaio' priority={true} ></Image>
										</div>
										{/* {typeof document != undefined &&  <Lottie className='w-[50%]'  animationData={chatAnimation} loop={true}  />} */}
										<button className='openChat' onClick={() => setNewChat(!newChat)}>Open a Chat<FontAwesomeIcon className='icon' icon={faComments} /></button>
									</div>
								}
							</div>
						</div>

						{createG && <CreateGroup close={setCreateG} change={false} />}
						{explore && <ExploreRooms close={setExplore} />}
						{newChat && <StartChat close={setNewChat} User={setUser} />}
						{invite && <Confirm Make={InviteToGame} title='Invite This User To A Game' close={setInvite} user={User} />}
						{leave && <Confirm Make={Leave} title={"Leave this group"} close={setLeave} user={User} />}
						{block && <Confirm Make={Block} title={`Block ${User.username}`} close={setBlock} user={User} />}
						{settings && <CreateGroup close={setSettings} change={true} info={User}/>}
						{seeMem && <OwnerSettings group={User} close={setSeeMem} role={role} DirectMsg={setUser} />}
						
					</div>
				</>)
			}
		</>
	);
}