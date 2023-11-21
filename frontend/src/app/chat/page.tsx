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

export default function Chat(){

	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	const [option, setOption] = useState(false);
	const visible = useRef(null);

	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },	
		waitHook: { state: wait, setState: checkwait },
	}

	
	let channels : Group[] = [];
	channels.push({title: "Group 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00"});
	channels.push({title: "Group 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35"});
	channels.push({title: "Group 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50"});
	channels.push({title: "Group 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35"});
	channels.push({title: "Group 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00"});
	channels.push({title: "Group 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50"});

	let friends : Friends[] = [];
	friends.push({title: "Friend 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", status: true});
	friends.push({title: "Friend 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", status: true});
	friends.push({title: "Friend 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", status: true});
	friends.push({title: "Friend 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", status: false});
	friends.push({title: "Friend 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", status: false});
	friends.push({title: "Friend 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", status: true});
	friends.push({title: "Friend 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", status: false});
	friends.push({title: "Friend 4", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", status: false});
	friends.push({title: "Friend 4", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", status: false});

	// const outSide = (e: MouseEvent) => {
	// 	if (visible.current && !(visible.current as any).contains(e.target as Node)) {
	// 		setOption(false);
	// 		alert("out");
	// 	}
	// };

	let render = LoG({page: "Profile", LogIn: hooks}) as any;

	useEffect(() => {
		hooks.waitHook.setState(true);
	}, []);
 
	// useEffect(() => {
	// 	document.addEventListener("mousedown", outSide);
	// 	return () => {
	// 		document.removeEventListener("mousedown", outSide);
	// 	};
	// }, [visible]);

	if (!hooks.waitHook.state) {
		return (<><div>loading...</div></>)
	}
	return (
		<>
		{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render : 
		(<>
		<div ref={visible}>
		<Navbar/>
		<div className="ChatPage">
			<section className="sec1">
				<div className="searchBar">
					<input type="text" placeholder="Search" />
					<button onClick={() => {setOption(!option);}} className="Options">
					{/* <button className="Options"> */}
						<div className="straight"></div>
						<div className="straight"></div>
						<div className="straight"></div>
					</button>
					{option && <Options/>}
				</div>
				{/* <Options/> */}
				
			<Groups channels={channels}/>
			<Friends channel={friends}/>
				
			</section>
			<Cnvs/>
			
		</div>
		</div></>)}
		</>
	);
}