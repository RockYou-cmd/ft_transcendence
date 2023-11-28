import { Group } from './page';
import Image from 'next/image';
import '../assest/chat.css';

export default function Groups({ channels } : { channels: Group[] }){
	

	return(
		<>
		<div className="Groups">
				<span className="groupField">Groups</span>
				<div className="content_g">
					{channels.map((chn : any) => (<>
			        <div className="content" key={chn} onClick={()=>console.log("clicked")}>
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