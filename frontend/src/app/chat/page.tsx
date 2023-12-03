"use client"
import '../assest/chat.css';
import Image from 'next/image';
import Groups from './Groups';
import bboulhan from '../../../public/bboulhan.jpg';
import ael_korc from '../../../public/ael-korc.jpg';
import yel_qabl from '../../../public/yel-qabl.jpg';
import Friends from "./Friends";
import Cnvs from "./Chat";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import LoG from "../Components/Log/Log";
import Navbar from "../Components/navbar";
import Options from "./Components/Options";
import CreateGroup from './Components/Create_group';
import { ChatOptions } from '../Props/Interfaces';
import Add from './Components/Add';
import SearchBar from '../Components/Fetch/SearchBar';
import StartChat from './Components/StartChat';




export interface Group {
	title: string;
	image: any;
	lastMsg: string;
	lastMsgTime: string;
	id: number;
}

export let channels: Group[] = [];
channels.push({ title: "bboulhan", image: bboulhan, lastMsg: "Hello", lastMsgTime: "12:00", id: 1 });
channels.push({ title: "ael_korc", image: ael_korc, lastMsg: "Hello", lastMsgTime: "12:00", id: 2 });
channels.push({ title: "yel_qabl", image: yel_qabl, lastMsg: "Hello", lastMsgTime: "12:00", id: 3 });

let chatOptions: ChatOptions = { Option: ["CreateG", "ExploreG", "NewChat"], desc: ["Create group", "Explore groups", "Start new chat"] };


export default function Chat() {

	const [User, setUser] = useState({} as any);

	//hooks for login
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
	
	const [option, setOption] = useState(false);
	const visible = useRef(null);

	//  hooks for options
	const [createG, setCreateG] = useState(false);
	const [explore, setExplore] = useState(false);
	const [newChat, setNewChat] = useState(false);
	const [Style, setStyle] = useState({} as any);



	function OptionHandler(option: string) {
		if (option == "CreateG")
			setCreateG(true);
		else if (option == "ExploreG")
			setExplore(true);
		else if (option == "NewChat")
			setNewChat(true);
	}

	useEffect(() => {
		if (createG || explore || newChat) {
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
		console.log("user", user);
	}

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

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
					{/* <Navbar/> */}
					<div className='Cover'>
						<div className={"ChatPage"} style={Style}>
							<section className="sec1">
								<div className="searchBar">
									<SearchBar title={"profile"} />
									<button ref={visible} onClick={() => { setOption(!option) }} className="Options">
										<div className="straight"></div><div className="straight"></div><div className="straight"></div>
									</button>
									{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={chatOptions} />}
								</div>

								<Groups  />
								<Friends selectChat={setUser}/>

							</section>
							<Cnvs User={User} />
						</div>

						{createG && <CreateGroup createG={setCreateG} />}
						{explore && <Add Users={channels} Make={Explore} title={"Explore Groups"} join={"JOIN"} exploreG={setExplore} />}
						{newChat && <StartChat close={setNewChat} User={setUser}/>}
					</div>
				</>)}
		</>
	);
}