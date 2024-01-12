import Image from "next/image";
import { useEffect, useState} from 'react';
import avatar from "../../../../public/avatar.png";
import { FaCog } from "react-icons/fa";
import { GetData } from "../Log/CheckLogin";
import { useLogContext, useMe } from "../Log/LogContext";
import Setting from "./profile_setting";

import FriendListComponent from "./friendList";
import UserLevel from "./userLevel";
import MatchHistory from "./matchHistory";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Achievment from "./achievment"
import AchievmentIcon from "../../../../public/achievment.png";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { GiPingPongBat } from "react-icons/gi";
import { FaRankingStar } from "react-icons/fa6";
import { GiGoalKeeper } from "react-icons/gi";


export default function Profile_info() {
	const { online } = useLogContext();
	const { me, setMe } = useMe() as any;
	let photo = avatar.src;
	const [data, setData] = useState({} as any);
	const [showSetting, setShowSetting] = useState<boolean>(false);
	const [Pending, setPending] = useState<boolean>(false);

	async function fetchData() {
		const data = await GetData({ Api: "Profile", user: "" }) as any;
		setData(data);
		if (data?.username != me?.username || data?.photo != me?.photo) {
			setMe(data);
		}
	}

	useEffect(() => {
		if (online && !showSetting) fetchData();
		// TODO
	}, [showSetting]);

	if (data?.photo) photo = data?.photo;
	else photo = avatar.src;

	function CalculateWinRate(play: string, win: string) { // calculate winrate
		if (Number(play) === 0)
			return 0;
		const winrate = Number(((Number(win) / Number(play)) * 100).toFixed(0));
		return winrate;
	}


	const handleClick = (val: boolean) => {
		setShowSetting(val);
	};

	return (
		<div className="m-8 flex flex-row gap-8 h-[88vh] font-semibold ">
			{showSetting ? <Setting handleClick={handleClick} User={data} /> : <Info />}
			<div className=" gap-5 w-full h-full grid grid-cols-3  grid-rows-4 xl:h-[100%] text-xl">
				<div className="   items-center rounded-lg col-span-3 min-h-0 grid xl:grid-cols-4 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 grid-row-2 gap-1  bg-gray-800 min-w-full   shadow-sm  " >
					<div className="flex h-full relative border rounded-lg flex-col w-auto  justify-center items-center ">
						<div className="flex  w-full  flex-row justify-center text-center ">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2"> Games</h1>
						</div>
						<GiPingPongBat size={100}  className="absolute opacity-5 xl:w-64 lg:w-36 md:w-28 sm:w-16"/>
						<p className="text-gray-300"> Played: {data?.gameProfile?.gamesPlayed}</p>
						<p className="text-gray-300"> Wins: {data?.gameProfile?.wins}</p>
						<p className="text-gray-300"> Losses : {data?.gameProfile?.losses}</p>
					</div>

					<div className="flex  relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className=" flex  w-full  flex-row justify-center text-center">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg ">Goals Stats</h1>
						</div>
						<GiGoalKeeper  size={100} className="absolute opacity-10 xl:w-64 lg:w-36 md:w-28 sm:w-16" />
						<p className="text-gray-300"> goals scored: {data?.gameProfile?.goalsScored}</p>
						<p className="text-gray-300"> goals conced: {data?.gameProfile?.goalsConced}</p>
					</div >
					<div className="flex h-full relative border rounded-lg flex-col w-auto  justify-center items-center">
						<div className="flex  w-full  flex-row justify-center items-center text-center">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2 ">Win Rate</h1>
						</div>
						<div className="flex items-center just h-full  w-[8vw]  ">
							<CircularProgressbar value={CalculateWinRate(data?.gameProfile?.gamesPlayed, data?.gameProfile?.wins)} text={`${CalculateWinRate(data?.gameProfile?.gamesPlayed, data?.gameProfile?.wins)}%`} />
						</div>
					</div>

					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2">
							<h1 className="flex  w-full  flex-row justify-center text-center">Game State</h1>
						</div>
						<FaRankingStar size={100}  className="absolute opacity-10 xl:w-64 lg:w-36 md:w-28 sm:w-16" />
						<p className="text-gray-300"> Player XP: {data?.gameProfile?.xp}</p>
						<p className="text-gray-300"> Clean Sheet: {data?.gameProfile?.cs}</p>
					</div>
				</div>
				<div className=" rounded-lg col-span-2 row-span-3 bg-gray-800 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-2  shadow-sm shadow-cyan-500/50 flex flex-col">
						<div className=" text-white font-bold text-xl  justify-center text-center p-4 bg-gradient-radial from-slate-600 to bg-slate-900 ">Match history</div>
						<div id="scrollHide" className="flex-1 px-4">
							<MatchHistory page="Profile" User={me?.username} />
						</div>
				</div>

				<div className="rounded-lg bg-red- overflow-auto bg-gray-800 hover:ease-in-out row-span-3  lg:col-span-3 md:col-span-3  sm:col-span-3 xl:col-span-1 duration-700 shadow-sm shadow-cyan-500/50" > 
				<div className="divide-x-4 divide-slate-100/20 flex flex-row  w-full h-14 cursor-pointer bg-gradient-radial from-slate-600 to bg-slate-900">
					<div className="flex items-center justify-center w-[50%] h-full" style={{ backgroundColor: !Pending ? 'rgb(0, 128, 255,.2)' : '' }} onClick={()=>setPending(false)}>
						<BsPersonFillAdd size={25}/>
						<h1 className=" m-2 font-bold text-xl">Friends</h1>
					</div>
					<div className="flex items-center justify-center w-[50%] h-full "style={{ backgroundColor: Pending ? 'rgb(0, 128, 255,.2)' : '' }}  onClick={()=>setPending(true)}>
						<FaUserFriends size={25}/>
						<h1 className="m-2 font-bold text-xl">Invite</h1>
					</div>
				</div>
						
					<FriendListComponent User="" Pending={Pending}  />
				</div>
			</div>
		</div>
	);

	function Info() {

		function checkStatus(status: string) {

			switch (status) {
				case "ONLINE":
					return "bg-green-500"
				case "OFFLINE":
					return "bg-red-500"
				case "INGAME":
					return "bg-yellow-500"
				default:
					return "bg-gray-500"

			}
		}
		let statusColor: string = checkStatus(data?.status);

		return (
			<div className=" flex flex-col overflow-auto rounded-lg  items-center  h-[screen] min-w-[450px] max-w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black">

				<Image
					src={photo}
					alt="user"
					priority={true}
					quality={100}
					width={200}
					height={200}
					className=" rounded-full mt-8 border-2 w-[250px] h-[250px] bg-white flex-shrink-0 "
				></Image>
				<h1 className="text-3xl mt-8 font-bold pt-3 "> {data?.username?.toUpperCase()} </h1>
				<button
					className="w-28 h-10 mt-8 relative ] flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-lg border-2 border-blue-600 focus:outline-none transition duration-300 ease-in-out font-semibold text-white shadow-md"
					onClick={() => handleClick(true)}
				>
					<span className="text-2xl ">
						<FaCog />
					</span>{" "}
					EDIT
				</button>
				<div className=" w-full ">
					<UserLevel data={data?.gameProfile} />
				</div>
				<div className="w-[95%] mt-8 h-auto bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
					{data?.bio}
				</div>
				<div className="flex flex-col mt-8    gap-3 w-[95%] h-fit ">
					<div className="flex items-center justify-center border bg-cyan-400/30 rounded-t-xl p-2">
						<Image src={AchievmentIcon} priority={true} width={45} height={45} alt="achievmentIcon"/>
						<h1 className="font-bold text-2xl ">ACHIEVEMENTS</h1>
						<Image src={AchievmentIcon} priority={true} width={45} height={45} alt="achievmentIcon"/>
					</div>
					<Achievment gamesPlayed={data?.gameProfile?.gamesPlayed} goalScored={data?.gameProfile?.goalsScored} goalConced={data?.gameProfile?.goalsConced} wins={data?.gameProfile?.wins}/>
				</div>
			</div>
		);
	}
}
