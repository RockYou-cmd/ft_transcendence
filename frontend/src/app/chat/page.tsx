"use client"
import '../assest/chat.css';
import Image from 'next/image';
import Groups from './Groups';
import Friends from "./Friends";
import Cnvs from "./Chat";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import LoG from "../Components/Log/Log";
import Options from "./Components/Options";
import CreateGroup from './Components/Create_group';
import { ChatOptions } from '../Props/Interfaces';
import Add from './Components/Add';
import SearchBar from '../Components/Fetch/SearchBar';
import StartChat from './Components/StartChat';
import { useRouter } from 'next/navigation';
import { Get } from '../Components/Fetch/post'
import { APIs } from '../Props/APIs';
import ExploreRooms from './Components/ExploreRooms';



export interface Group {
	title: string;
	image: any;
	lastMsg: string;
	lastMsgTime: string;
	id: number;
}

let chatOptions: ChatOptions = { Option: ["CreateG", "ExploreG", "NewChat"], desc: ["Create Group", "Explore Groups", "Start Chat"] };


export default function Chat() {

	// hooks for data
	const [User, setUser] = useState({} as any);
	const [Group, setGroup] = useState({} as any);
	const [Members, setMembers] = useState({} as any);
	const [Role, setRole] = useState("");

	// hooks for login
	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);

	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },
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
	// const [invite, setInvite] = useState(false);
	// const [block, setBlock] = useState(false);
	// const [view, setView] = useState(false);
	// const [leave, setLeave] = useState(false);
	// const [seeMem, setSeeMem] = useState(false);
	// const [settings, setSettings] = useState(false);
	// const [add, setAdd] = useState(false);
	

	const [Style, setStyle] = useState({} as any);




	function OptionsHandler(option: string) {
		if (option == "CreateG")
			setCreateG(true);
		else if (option == "ExploreG")
			setExplore(true);
		else if (option == "NewChat")
			setNewChat(true);
		// else if (OptionsHandler == "invite")
		// 	setInvite(true);
		// else if (OptionsHandler == "block")
		// 	setBlock(true);
		// else if (OptionsHandler == "view")
		// 	setView(true);
		// else if (OptionsHandler == "leave")
		// 	setLeave(true);
		// else if (OptionsHandler == "see")
		// 	setSeeMem(true);
		// else if (OptionsHandler == "settings")
		// 	setSettings(true);
		// else if (OptionsHandler == "add")
		// 	setAdd(true);

	}

	async function getRole(){
		const data = await Get(APIs.Role);
		setRole(data);
	}

	useEffect(() => {
		// if (leave || seeMem || settings){
		// 	getRole();
		// }
		// else
		// 	setRole("");
	
		if (createG || explore || newChat ) {
			setStyle({
				"filter": "blur(6px)",
				"pointerEvents": "none",
			})
			setOption(false);

		}
		else
			setStyle({});
	
	}, [createG, explore, newChat]);

	function Explore(user: any) {
		
	}

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	useEffect(() => {
		if (Object.keys(Group).length != 0){
			
		}
	},[Group]);
	
	useEffect(() => {
		hooks.waitHook.setState(true);  
	}, []);

	if (!hooks.waitHook.state) {
		return (<><div>loading...</div></>)
	}
	return (
		<>
			{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render :
				(<>
					<div className='Cover'>
						<div className={"ChatPage"} style={Style}>
							<section className="sec1">
								<div className="searchBar">
									<SearchBar title={"profile"} />
									<button ref={visible} onClick={() => { setOption(!option) }} className="Options">
										<div className="straight"></div><div className="straight"></div><div className="straight"></div>
									</button>
									{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionsHandler} content={chatOptions} />}
								</div>

								<Groups Group={setUser} />
								{/* <Friends selectChat={setUser}/> */}

							</section>
							<Cnvs User={User}/>
						</div>

						{createG && <CreateGroup createG={setCreateG} />}
						{explore && <ExploreRooms close={setExplore}/>}
						{newChat && <StartChat close={setNewChat} User={setUser} />}

					</div>
				</>)
			}
		</>
	);
}