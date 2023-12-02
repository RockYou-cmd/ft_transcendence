import '../assest/chat.css';
import { Group } from './page';
import Image from 'next/image';

import { channels } from './page';

// let channels: Group[] = [];

// channels.push({ title: "Group 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00", id: 1 });
// channels.push({ title: "Group 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35", id: 2 });
// channels.push({ title: "Group 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", id: 3 });
// channels.push({ title: "Group 4", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50", id: 4 });

export default function Groups(){
	

	return(
		<>
		<div className="Groups">
				<span className="groupField">Groups</span>
				<div className="content_g">
					{channels.map((chn : any, index: number) => (<>
			        <div className="content" key={chn.title} onClick={()=>console.log("clicked")}>
						<Image className="g_img" src={chn.image} priority={true} alt="img" width={70} height={70}/>
						<h4>{chn.title}</h4>
						<p>{chn.lastMsg}</p>
						<span>{chn.lastMsgTime}</span>
						<div className="line"></div>
					</div>
					</>
				))}
				</div>
			</div>
		</>
	);
}