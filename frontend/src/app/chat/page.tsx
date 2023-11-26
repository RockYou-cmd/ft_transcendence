"use client"
import '../assest/chat.css';
import Image from 'next/image';
import Groups from './Groups';
import bboulhan from '../../../public/bboulhan.jpg';
import ael_korc from '../../../public/ael-korc.jpg';
import yel_qabl from '../../../public/yel-qabl.jpg';
import Friends from "./Friends";
import Cnvs from "./Chat";
import { useEffect, useState , useRef} from "react";
import Cookies from "js-cookie";
import LoG from "../Components/Log";
import Navbar from "../Components/navbar";
import Options from "./Components/Options";
import CreateGroup from './Components/Create_group';
import { ChatOptions } from '../Props/Interfaces';
import Add from './Components/Add';
import SearchRes from '../Components/SearchRes';
import SearchBar from '../Components/SearchBar';

export interface Friends{
	title: string;
	image: any;
	lastMsg: string;
	lastMsgTime: string;
	status: boolean;
}



export interface Group{
	title: string;
	image: any;
	lastMsg: string;
	lastMsgTime: string;
}

let channels : Group[] = [];
channels.push({title: "Group 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00"});
channels.push({title: "Group 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35"});
channels.push({title: "Group 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50"});
channels.push({title: "Group 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35"});
channels.push({title: "Group 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00"});
channels.push({title: "Group 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50"});

export let friends : Friends[] = [];
friends.push({title: "Friend 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", status: true});
friends.push({title: "Friend 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", status: true});
friends.push({title: "Friend 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", status: true});
friends.push({title: "Friend 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", status: false});
friends.push({title: "Friend 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", status: false});
friends.push({title: "Friend 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", status: true});
friends.push({title: "Friend 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", status: false});
friends.push({title: "Friend 4", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", status: false});
friends.push({title: "Friend 4", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", status: false});

let chatOptions : ChatOptions = {Option: ["CreateG", "ExploreG", "NewChat"], desc: ["Create group", "Explore groups", "Start new chat"]};


export default function Chat(){

	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	const [option, setOption] = useState(false);
	const [click, setClick] = useState(false);
	const [searchRes, setSearchRes] = useState(false);
	const visible = useRef(null);
	//  hooks for options
	const [createG, setCreateG] = useState(false);
	const [explore, setExplore] = useState(false);
	const [newChat, setNewChat] = useState(false);
	const [Style, setStyle] = useState({} as any);


	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },	
		waitHook: { state: wait, setState: checkwait },
	}

	function OptionHandler(option: string){
		if (option == "CreateG") 
			setCreateG(true);
		else if (option == "ExploreG") 
			setExplore(true);
		else if (option == "NewChat") 
			setNewChat(true);
	}
	
	useEffect(() => {
		if (createG || explore || newChat){
			setStyle({
				"filter": "blur(6px)",
				"pointer-events": "none",
			})
			setOption(false);
		}
		else
			setStyle({});
	} , [createG, explore, newChat]);
	
	function Explore(user: any){
		console.log("user", user);
	}

	let render = LoG({page: "Profile", LogIn: hooks}) as any;

	


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
						{/* <input ref={visible}  type="text" className='searchInput'  placeholder="Search" /> */}
						<SearchBar placeRef={visible} close={setSearchRes}/>
						<button ref={visible} onClick={() =>{setOption(!option)}} className="Options">
						{/* <button className="Options"> */}
							<div className="straight"></div>
							<div className="straight"></div>
							<div className="straight"></div>
						</button>
						{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={chatOptions}/>}
					</div>
					{/* <Options/> */}
					
				<Groups channels={channels}/>
				<Friends channel={friends}/>
				
				</section>
				<Cnvs/>
			</div>
			{createG && <CreateGroup createG={setCreateG}/>}
			{explore && <Add Users={channels} Make={Explore} title={"Explore Groups"} join={"JOIN"} exploreG={setExplore}/>}
			
		</div>
		</>)}
		</>
	);
}