
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
		const data = await Get(APIs.leaderBoard);
		console.log("data leaderBoard", data);
		setData({rank : data});
	}

	useEffect(() => {
		getData();
	}, []);

	/******************************************************* */
	const router = useRouter();

	function CraeteCounter() {
		let count = 1;
		return function () {
			return count++;
		}
	}

	const counter = CraeteCounter();
	function Print(info: any) {
		const player = info?.info;
	
		const xp = (player?.xp * 100 / player?.requiredXp).toFixed(0);
		
		const board = <>
			<div className="rankTable" onClick={() => { router.push("/users/" + player?.userId) }}>
				<h2>{`${counter()}`}</h2>
				<Image className="g_img" src={player?.user?.photo ? player?.user?.photo : avatar} priority={true} alt="img" width={70} height={70} />

				<h3>{player?.userId}</h3>
				<span>{player?.level + '.' + xp}</span>

			</div>
		</>
		return <>{board}</>
	}


	return (
		<>
			<div className="Leaderboard">
				<h1>RANK</h1>
				<div className='content'>
					{data?.rank?.map((player: any, index : number) => (<Print key={index} info={player}/>))}
				</div>

			</div>

		</>
	)
}