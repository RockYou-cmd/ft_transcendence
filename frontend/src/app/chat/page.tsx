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
import SearchBar from '../Components/Fetch/SearchBar';
import StartChat from './Components/StartChat';
import { useRouter } from 'next/navigation';
import { APIs } from '../Props/APIs';
import ExploreRooms from './Components/ExploreRooms';
import Invite from './Components/Invite';
import Confirm from './Components/Confirm';
import GroupSettings from './Components/Group_settings';
import OwnerSettings from './Components/Settings';
import { Post } from '../Components/Fetch/Fetch';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogContext, useMe } from '../Components/Log/LogContext';
import Loading from '../loading';

function Leave(GroupId: any) {
	const res = Post({ id: GroupId?.id }, APIs.LeaveRoom);

}

function Block(User: any) {
	const res = Post({ id: User?.id }, APIs.Block);
}

let chatOptions: ChatOptions = { Option: ["CreateG", "ExploreG", "NewChat"], desc: ["Create Group", "Explore Groups", "Start Chat"] };


export default function Chat() {

	const { me, setMe } = useMe();
	const { online, setOnline } = useLogContext();
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



	const [Style, setStyle] = useState({} as any);



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

	}

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

		if (!createG || !explore || !newChat || !invite || !leave || !settings || !seeMem || !block) {
			setRefresh(!refresh);
		}
		if (view)
			router.push("/users/" + User?.username);
	}, [createG, explore, newChat, invite, leave, settings, seeMem, block, view]);

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
									{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionsHandler} content={chatOptions} />}
								</div>

								<Groups Group={setUser} refresh={refresh} />
								<Friends selectChat={setUser} refresh={refresh} />

							</section>
							<div className='Chat'>
								{Object.keys(User).length != 0 ? <Cnvs User={User} Role={setRole} OptionHandler={OptionsHandler} />
									: <>
										<button className='openChat' onClick={() => setNewChat(!newChat)}>Open a Chat<FontAwesomeIcon className='icon' icon={faComments} /></button>
									</>}

							</div>
						</div>

						{createG && <CreateGroup createG={setCreateG} />}
						{explore && <ExploreRooms close={setExplore} />}
						{newChat && <StartChat close={setNewChat} User={setUser} />}
						{invite && <Invite User={User} close={setInvite} />}
						{leave && <Confirm Make={Leave} title={"Leave this group"} close={setLeave} user={User} />}
						{block && <Confirm Make={Block} title={`Block ${User.username}`} close={setBlock} user={User} />}
						{settings && <GroupSettings close={setSettings} />}
						{seeMem && <OwnerSettings group={User} close={setSeeMem} role={role} DirectMsg={setUser} />}
					</div>
				</>)
			}
		</>
	);
}