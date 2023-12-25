
import { useEffect, useRef, useState } from "react";
import { Get , Post , Put } from '../../Components/Fetch/Fetch';
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
import { Make } from '../../Components/Fetch/Make';
import AddMembers from "./AddMembers";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe, useSocket } from "@/app/Components/Log/LogContext";

let UserSettings: ChatOptions = { Option: ["invite", "sendMsg", "view"], desc: ["Invite To A Game", "Send Message", "View Profile"] };
let AdminSettings: ChatOptions = { Option: ["invite", "sendMsg", "view", "Kick", "Ban"], desc: ["Invite To A Game", "Send Message", "View Profile", "Kick", "Ban"] };
let SuperAdminSettings: ChatOptions = { Option: ["invite", "sendMsg", "view", "Kick", "Ban"], desc: ["Invite To A Game", "Send Message", "View Profile", "Kick", "Ban"] };


export default function OwnerSettings({ group, close, role, DirectMsg }: { group: any, close: any, role: string, DirectMsg: any }) {

	const [refresh, setRefresh] = useState(false);
	const [search, setSearch] = useState<string>("");
	const [data, setData] = useState({} as any);
	const [origin, setOrigin] = useState({} as any);
	const { socket } = useSocket();
	const { me } = useMe() as any;
	const [options, setOptions] = useState({} as any);

	async function getMembers() {
		const data = await Get(APIs.members + group?.id);
		setOrigin(data);
	}

	useEffect(() => {
		if (search !== "") {
			const filter = origin?.members?.filter((user: any) => user?.user?.username.toLowerCase().includes(search.toLowerCase()));
			setData({ members: filter });
		}
		else
			setData(origin);
	}, [search, origin]);

	useEffect(() => {
		getMembers();
	}, [refresh]);


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
	const [unMute, setUnMute] = useState(false);
	const [make, setMake] = useState("");
	const router = useRouter();
	const [User, setUser] = useState({} as any);


	const visible = useRef(null) as any;

	function Settings(option: string) {
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
		else if (option == "MakeAdmin")
			setMakeAdmin(true);
		else if (option == "removeAdmin")
			setRemoveAdmin(true);
		else if (option == "unMute")
			setUnMute(true);
	}

	async function wait() {
		try {
			const res =	await Make({ option: make, group: group, person: User.user.username , socket : socket , me : me});
			setMake("");
		} catch (err) {
		}
	}

	useEffect(() => {
		if (make !== "") {
			wait()
			setRefresh(!refresh);
		}
		if (!add)
			setRefresh(!refresh);
		if (sendMsg) {
			DirectMsg(User?.user);
			close(false);
		}
		if (view)
			router.push("/users/" + User?.user?.username);
		// console.log("make ", make);
	}, [make, add, sendMsg, view]);


	useEffect(() => {
		if (kick)
			setMake("Kick");
		else if (ban)
			setMake("Ban");
		else if (makeAdmin)
			setMake("MakeAdmin");
		else if (removeAdmin)
			setMake("removeAdmin");
		else if (unMute)
			setMake("unMute");
		setKick(false);
		setBan(false);
		setUnMute(false);
		setMakeAdmin(false);
		setRemoveAdmin(false);
	}, [kick, ban, makeAdmin, removeAdmin, unMute]);

	function showOptions(e: MouseEvent, user: any) {
		setOption(!option);
		setUser(user);
	}

	function MuteOption() {
		const [time, setTime] = useState("1");
		const visible = useRef(null) as any;

		useEffect(() => {
			const handleOutsideClick = (event: any) => {
				if (!visible.current.contains(event.target as Node)) {
					setMute(false);
				}
			};

			document.addEventListener('mousedown', handleOutsideClick);

			return () => {
				document.removeEventListener('mousedown', handleOutsideClick);
			};
		},[]);

		async function Mute(e : MouseEvent){
			e.preventDefault();
			try{
				const res = await Put({id : group.id , username : User?.user?.username, duration : time}, APIs.Mute);
				if (res.ok){
					socket?.emit("update", {option : "Mute" , groupId : group?.id , receiver : User?.user?.username, sender : me?.username});
				}
				setMute(false);
			}catch(err){
			}
			
		}


		return (
			<>
				<div ref={visible} className="muteOption" >
					<label>Mute {User?.username} for</label>
					<select name="time"  onChange={(e)=>setTime(e.target.value)}>
						{Array.from({ length: 23 }, (_, i) => (
							<option key={i} value={i + 1}>
								{i + 1} Hours
							</option>
						))}
					</select>
					<button onClick={Mute}> Mute</button>
				</div>
			</>
		);
	}

	function Print(users: any) {
		const user = users?.users;
		const print = <>
			<div className={user.role == "ADMIN" ? "user admin" : user.role == "OWNER" ? "user owner" : "user"} ref={visible}>
				<Image className="g_img" src={user?.user?.photo ? user?.user?.photo : avatar} priority={true} alt="img" width={45} height={45} />
				<h3>{user?.user.username}</h3>
				{(user.role != "OWNER" || role != "OWNER" ) && user?.user?.username != me?.username && <button className="UseraddBtn" onClick={(e: MouseEvent) => showOptions(e, user)}><FontAwesomeIcon icon={faBars} /></button>}
			</div>
		</>
		return <div>{print}</div>
	}


	useEffect(() => {
		if (option){
			let content : ChatOptions = {Option : [], desc : []};
			if (role == "OWNER"){
				if (User.role == "ADMIN")
					content = {...SuperAdminSettings, Option : [...SuperAdminSettings.Option, "removeAdmin"], desc : [...SuperAdminSettings.desc, "Remove Admin"]}
				else
					content = {...SuperAdminSettings, Option : [...SuperAdminSettings.Option, "MakeAdmin"], desc : [...SuperAdminSettings.desc, "Make Admin"]};
			}
			else if (role == "ADMIN" && User.role == "MEMBER")
				content = AdminSettings;
			else
				content = UserSettings;

			if(role == "OWNER" || role == "ADMIN"){
				if (User.status == "MUTED"){
					if (role == "OWNER" || (role == "ADMIN" && User.role == "MEMBER"))
						content = {...content, Option : [...content.Option, "unMute"], desc : [...content.desc, "UnMute"]};
				}
				else{
					if (role == "OWNER" || (role == "ADMIN" && User.role == "MEMBER"))
						content = {...content, Option : [...content.Option, "Mute"], desc : [...content.desc, "Mute"]};
				}
				
			} 
			setOptions(content);
			console.log("content ", content);
		}
	}, [option]);


	return (
		<>
			<div className="Add" >
				<h1>Members</h1>
				<input type="text" className="searchInput" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
				<button onClick={() => close(false)} className='closeBtn'><div></div></button>
				<div className="content">
					{data?.members?.map((user: any, index: number) => (<Print key={index} users={user} />))}
				</div>
				{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={Settings} content={options} />}				
				{role == "OWNER" && <button className="addBtn" onClick={() => setAdd(true)}>Add Member</button>}
				{invite && <Invite User={data} close={setInvite} />}
				{add && <AddMembers group={group} close={setAdd} />}
				{mute && <MuteOption User={User}/>}
				{/* {view && router.push("/users/" + User?.user?.username)} */}
			</div>
		</>
	)
}