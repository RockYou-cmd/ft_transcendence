import React from "react";
import '../assest/chat.css';
import Image from 'next/image';
import bboulhan from '../../../public/bboulhan.jpg';
import ael_korc from '../../../public/ael-korc.jpg';
import yel_qabl from '../../../public/yel-qabl.jpg';

interface Friends{
	title: string;
	image: any;
	lastMsg: string;
	lastMsgTime: string;
	status: boolean;
}



interface Groups{
	title: string;
	image: any;
	lastMsg: string;
	lastMsgTime: string;
}

export default function Chat(){

	var channels : Groups[] = [];
	channels.push({title: "Group 1", image: bboulhan, lastMsg: "brahim", lastMsgTime: "12:00"});
	channels.push({title: "Group 2", image: ael_korc, lastMsg: "alae", lastMsgTime: "16:35"});
	channels.push({title: "Group 3", image: yel_qabl, lastMsg: "youssef", lastMsgTime: "08:50"});

	return (
		<>
			<section className="sec1">
				<div className="searchBar">
					
					<input type="text" placeholder="Search" />
				</div>
				
				<div className="Groups">
					<span className="groupField">Groups</span>
				{channels.map((chn) => (<>
			        <div className="content">
						<Image className="g_img" src={chn.image} alt="img" width={70} height={70}/>
						<h4>{chn.title}</h4>
						<p>{chn.lastMsg}</p>
						<span>{chn.lastMsgTime}</span>
						<line className="line"></line>
					</div>
					</>
				))}

					
				</div>
			{/* </section> */}

			{/* <section className="sec2"> */}
				<div className="Friends">

				</div>
			</section>

			<aside className="Chat">
			
			</aside>
		</>
	);
}