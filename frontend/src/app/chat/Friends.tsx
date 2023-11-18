import '../assest/chat.css';
import Image from 'next/image';
import { Friends } from './page';

export default function Channel({channel} : {channel: Friends[]}){





	return(
		<>
		<div className="Friends">
			<span className="groupField">Friends</span>
			<div className='content_f'>
					{channel.map((chn) => (<>
			        <div className="content" key={chn.title}>
						<Image className="g_img" src={chn.image} priority={true} alt="img" width={70} height={70}/>
						<h4>{chn.title}</h4>
						<p>{chn.lastMsg}</p>
						<span>{chn.lastMsgTime}</span>
						{chn.status ? <div className="status"></div> : <></>}
						<div className="line"></div>
					</div>
					</>
				))}
			</div>
		</div>
		</>
	)
}


