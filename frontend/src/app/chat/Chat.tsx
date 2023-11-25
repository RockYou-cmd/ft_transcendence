import '../assest/chat.css';
import Image from 'next/image';
import bboulhan from '../../../public/bboulhan.jpg';
import { useEffect, useState , useRef} from "react";
import Options from './Components/Options';
import { ChatOptions } from '../Props/Interfaces';

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

export default function Cnvs() {
	
	const [option, setOption] = useState(false);
	
	//hooks for chat settings
	const [invite, setInvite] = useState(false);
	const [block, setBlock] = useState(false);
	const [view, setView] = useState(false);
	
	
	const visible = useRef(null) as any;

	function OptionHandler(setting: string){
		if (setting == "invite")
			setInvite(true);
		else if (setting == "block")
			setBlock(true);
		else if (setting == "view")
			setView(true);
	}

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
					{option && <Options visible={setOption} option={option} btnRef={visible} setOptions={OptionHandler} content={chatSettings}/>}
				</section>
				<div className="Msg">
					{Messages.map((msg, index) => (<>
						<div className={msg.user.classname} key={index}>
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
		</>

	)
}