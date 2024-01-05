
import React from 'react';
import { useState, useEffect } from 'react';
import { Get } from '../../Components/Fetch/Fetch';
import { APIs } from '../../Props/APIs';
import { matchs } from '../../Props/Interfaces';
import { useMe } from '../../Components/Log/LogContext';
import Image from 'next/image';
import avatar from '../../../../public/avatar.png';
import '../../assest/game.css';



export default function MatchHistory() {
	const {me} = useMe() as any;


	function PrintHistory(match : any){
		match = match.match;
		return (<>
			<div className="SingleMatch">
				<h1 >{match.winner == "me" ? "WON" : "LOST"}</h1>
				<section>
					<Image className='g_img' src={match.winner == "me" ? me?.photo : avatar} alt="avatar" width="50" height="50" />
					<h2>{match.winner}</h2>
				</section>	
				<h3> - </h3>
				<section>
					<Image className='g_img' src={match.loser == "me" ? me?.photo : avatar} alt="avatar" width="50" height="150" />
					<h2>{match.loser}</h2>
				</section>
			</div>
		</>)
	}


	return(
		<>
			<div className="matchHistory">
				{/* <h1 className="title"> MATCH HISTORY</h1>
				<div className="content">
					{matchs.map((match, index) => <PrintHistory match={match} key={index}/>)}
				</div> */}
			</div>
		</>
	)
}