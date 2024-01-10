import Image from "next/image";
import achiev_pic from '../../../../public/achievment.png';
import { useEffect, useState, useRef } from 'react';
import avatar from "../../../../public/avatar.png";
import { FaCog } from "react-icons/fa";
import { GetData } from "../Log/CheckLogin";
import { useLogContext, useMe } from "../Log/LogContext";
import { Get, Post } from "../Fetch/Fetch";
import Setting from "./profile_setting";
import { APIs } from "@/app/Props/APIs";
import FriendListComponent from "./friendList";
import UserLevel from "./userLevel";
import MatchHistory from "./matchHistory";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Achievment from "./achievment"
import AchievmentIcon from "../../../../public/achievment.png";
import { faUserGroup , faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
		console.log("profile data", data);
		if (data?.username != me?.username || data?.photo != me?.photo) {
			setMe(data);
		}
	}

	useEffect(() => {
		console.log("show setting", showSetting);
		if (online && !showSetting) fetchData();
		// TODO
	}, [showSetting]);

	if (data?.photo) photo = data?.photo;
	else photo = avatar.src;

	function CalculateWinRate(play: string, win: string) { // calculate winrate
		if (Number(play) === 0)
			return 0;
		const winrate = ((Number(win) / Number(play)) * 100);
		console.log("winrate", winrate, "wins", win, "play", play);
		return winrate;
	}


	const handleClick = (val: boolean) => {
		setShowSetting(val);
	};

	return (
		<div className="m-8 flex flex-row gap-8 h-[88vh]  ">
			{showSetting ? <Setting handleClick={handleClick} User={data} /> : <Info />}
			<div className="gap-5 w-full h-full grid grid-cols-3  grid-rows-4 xl:h-[100%] ">
				<div className=" min-h-[17.8rem] items-start rounded-lg col-span-3  grid xl:grid-cols-4 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 grid-row-2 gap-1  bg-gray-800 min-w-full overflow-hidden  shadow-sm  " >
					<div className="flex relative border rounded-lg flex-col w-auto h-full justify-center items-center ">
						<div className="flex  w-full  flex-row justify-center text-center ">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2"> Games</h1>
						</div>
						<p className="text-gray-300"> Played: {data?.gameProfile?.gamesPlayed}</p>
						<p className="text-gray-300"> Wins: {data?.gameProfile?.wins}</p>
						<p className="text-gray-300"> Losses : {data?.gameProfile?.losses}</p>
					</div>

					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className=" flex  w-full  flex-row justify-center text-center">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2">Goals Stats</h1>
						</div>
						<p className="text-gray-300"> goals scored: {data?.gameProfile?.goalsScored}</p>
						<p className="text-gray-300"> goals conced: {data?.gameProfile?.goalsConced}</p>
					</div >
					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className="flex  w-full  flex-row justify-center text-center">

							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2 ">Win Rate</h1>
						</div>
						<div className="  w-[10vw] h-full mb-4 ">
							<CircularProgressbar value={CalculateWinRate(data?.gameProfile?.gamesPlayed, data?.gameProfile?.wins).toFixed(0)} text={`${CalculateWinRate(data?.gameProfile?.gamesPlayed, data?.gameProfile?.wins)}%`} />
						</div>
					</div>

					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2">
							<h1 className="lex  w-full  flex-row justify-center text-center">Game State</h1>
						</div>
						<p className="text-gray-300"> games played: X</p>
						<p className="text-gray-300"> games played: X</p>
						<p className="text-gray-300"> games played: X</p>
					</div>
				</div>
				
				<div id="scrollHide" className=" rounded-lg col-span-2 row-span-3 bg-gray-800 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-2 overflow-y-scroll shadow-sm shadow-cyan-500/50" >
					<h1 className="hidden text-white font-bold text-xl  justify-center text-center p-4 bg-gradient-radial from-slate-600 to bg-slate-900 ">Match history</h1>
					<MatchHistory page="Profile"/>
				</div>

				<div className="rounded-lg bg-red- overflow-auto bg-gray-800 hover:ease-in-out row-span-3 lg:col-span-3 md:col-span-3  sm:col-span-3 xl:col-span-1 duration-700 shadow-sm shadow-cyan-500/50" > 
					<section className="flex flex-row  justify-between space-x p-4 bg-gradient-radial from-slate-600 to bg-slate-900">
						<h1 className=" text-white font-bold text-xl  ">{!Pending ? "Friends List" : "Invitations"}</h1> 
						<button onClick={()=>setPending(!Pending)}>{!Pending ? <FontAwesomeIcon icon={faUserGroup} /> : <FontAwesomeIcon icon={faUserPlus} />}</button>
					</section>
					<FriendListComponent User="" Pending={Pending} />
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
				{/* <div className="flex w-full p-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900  mt-8 items-center justify-center ">
					<div className={` w-[15px] h-[15px] relative animate-pulse mr-3 rounded-full justify-center shadow-lg ${statusColor}`}></div>
					<h1 className="text-xl  font-bold  items-center"> {data?.status}</h1>
				</div> */}
				<div className=" w-full ">
					<UserLevel data={data?.gameProfile} />
				</div>
				<div className="w-[95%] mt-8 h-auto bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
					{data.bio}
				</div>
				<div className="flex flex-col mt-8    gap-3 w-[95%] h-fit ">
					<div className="flex items-center justify-center border bg-cyan-400/30 rounded-t-xl p-2">
						<Image src={AchievmentIcon} priority={true} width={45} height={45} alt="achievmentIcon"/>
						<h1 className="font-bold text-2xl ">ACHIEVEMENTS</h1>
						<Image src={AchievmentIcon} priority={true} width={45} height={45} alt="achievmentIcon"/>
					</div>
					<Achievment gamesPlayed={data?.gameProfile?.gamesPlayed} goalScored={data?.gameProfile?.goal} goalConced={data?.gameProfile?.goalsConced} wins={data?.gameProfile?.wins}/>
				</div>
			</div>
		);
	}
}
