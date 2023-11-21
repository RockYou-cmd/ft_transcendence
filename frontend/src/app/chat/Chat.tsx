import '../assest/chat.css';
import Image from 'next/image';
import bboulhan from '../../../public/bboulhan.jpg';

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


export default function Cnvs() {
	

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

	const my_msg = "my_msg";
	const user_msg = "usr_msg";
	let msg: string = "";

	return(
		<>
			<div className="Chat">
				<section className='User'>
					<Image className='g_img' src={bboulhan} priority={true} alt="img" width={75} height={75}/>
					<h1>{User.username}</h1>
					<span>{User.status}</span>
					<div className="line"></div>
					{User.status == "online" ? <div className="status"></div> : <></>}
					<button>
						<div className='point'></div>
						<div className='point'></div>
						<div className='point'></div>
					</button>
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