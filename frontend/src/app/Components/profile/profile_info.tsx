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
import { GiPingPongBat } from "react-icons/gi";




export default function Profile_info() {
	const { online, setOnline } = useLogContext();
	const { me, setMe } = useMe() as any;
	const imgRef = useRef(null) as any;
	let photo = avatar.src;
	const [data, setData] = useState({} as any);
	const [hover, setHover] = useState(false);
	const mousehover = useRef(null) as any;
	const [showSetting, setShowSetting] = useState<boolean>(false);

	async function fetchData() {
		const data = await GetData({ Api: "Profile", user: "" }) as any;
		setData(data);
		console.log("profile data", data);
		if (data?.username != me?.username || data?.photo != me?.photo){
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


	const handleClick = (val: boolean) => {
		setShowSetting(val);
	};

	return (
		<div className="m-8 flex flex-row gap-8 h-[85vh]">
			{showSetting ? <Setting handleClick={handleClick} User={data} /> : <Info />}

			<div
				// ref={mousehover}
				className="gap-5 w-full grid grid-cols-3 grid-rows-4 lg:grid-cols-subgrid "
				// id={hover ? "profile_grid_blur" : ""}
				// onMouseEnter={() => setHover(true)}
				// onMouseLeave={() => setHover(false)}
			>
				<div className=" min-h-[17.8rem] items-start rounded-lg col-span-3  grid xl:grid-cols-4 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 grid-row-2 gap-1  bg-gray-800 min-w-full overflow-hidden  shadow-sm  " >
					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className="flex  w-full  flex-row justify-center text-center ">
							{/* <GiPingPongBat />  */}
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2"> Games</h1>
						</div>
						<p className="text-gray-300"> Played: X</p>
						<p className="text-gray-300"> Wins: X</p>
						<p className="text-gray-300"> Losses : X</p>
					</div>

					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className=" flex  w-full  flex-row justify-center text-center">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2">Game Stats</h1>
						</div>
						<p className="text-gray-300"> goal scored: X</p>
						<p className="text-gray-300"> goal conced: X</p>
					</div >
					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2 ">Win Rate</h1>
						<div className="  w-[10vw] mb-4 ">
							<CircularProgressbar value={75} text={"75%"} />
						</div>
					</div>
					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2">
							<h1 className="text-white text-lg font-bold mb-2">Game State</h1>
						</div>
						<p className="text-gray-300"> games played: X</p>
						<p className="text-gray-300"> games played: X</p>
						<p className="text-gray-300"> games played: X</p>
					</div>
				</div>
				<div className=" rounded-lg col-span-2 row-span-2 bg-gray-800 overflow-auto shadow-sm shadow-cyan-500/50" >
					<MatchHistory matches={[]} />
				</div>
				<div className="rounded-lg overflow-auto bg-gray-800 hover:ease-in-out row-span-3  duration-700 shadow-sm shadow-cyan-500/50" > <h1 className="text-white font-bold text-xl  justify-center text-center p-4 bg-gradient-radial from-slate-600 to bg-slate-900">Friends List</h1> <FriendListComponent User=""/>
				</div>
				<div className=" rounded-lg col-span-2 bg-gray-800  shadow-sm shadow-cyan-500/50 " > 7
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
			<div className=" flex flex-col overflow-auto rounded-lg  items-center  h-full min-w-[450px] max-w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black">

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
					<UserLevel level="9.90" />
				</div>
				<div className="w-[95%] mt-8 h-auto bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
					{data.bio}
				</div>
				<div className="grid mt-8 grid-cols-2 grid-rows-2 gap-3 w-[95%] h-fit ">
					<div className="text-2xl mt-6 col-span-2 bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300  p-6 shadow-lg flex justify-center items-center h-16 rounded-tr-2xl rounded-tl-2xl">
						<Image src={achiev_pic} width={60} alt="achievment" />{" "}
						Achievmnet
					</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">1</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">2</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">3</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">4</div>
				</div>
			</div>
		);
	}
}
