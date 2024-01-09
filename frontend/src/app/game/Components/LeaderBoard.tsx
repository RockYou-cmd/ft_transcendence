
import '../../assest/game.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Get } from '../../Components/Fetch/Fetch';
import { APIs } from '../../Props/APIs'
import avatar from '../../../../public/avatar.png';
import { useRouter } from 'next/navigation'


export default function LeaderBoard() {

	/******************************************************* */
	const [data, setData] = useState({} as any);

	async function getData() {
		const data = await Get(APIs.Friends);
		console.log("player data", data);
		setData(data);
	}

	useEffect(() => {
		getData();
	}, []);

	/******************************************************* */
	const router = useRouter();

	function Print(info: any, rank : number) {
		console.log("rank", rank)
		const player = info?.info.users[0];
		const board = <>
			<div className="rankTable" onClick={() => { router.push("/users/" + player?.username) }}>
				<h2>1</h2>
				<Image className="g_img" src={player?.photo ? player?.photo : avatar} priority={true} alt="img" width={70} height={70} />

				<h3>{player?.username}</h3>
				{/* <h4>PLATINIUM</h4> */}
				<span>{1.67}</span>

			</div>
		</>
		return <>{board}</>
	}


	return (
		<>
			<div className="Leaderboard">
				<h1>RANK</h1>
				<div className='content'>

					{data?.friends?.map((friend: any, index : number) => (<Print key={index} info={friend} rank={index}/>))}
				</div>

			</div>

		</>
	)
}