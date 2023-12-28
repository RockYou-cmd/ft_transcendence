import Image from "next/image";
import achiev_pic from '../../../../public/achievment.png';
import { useEffect, useState, useRef } from 'react';
import avatar from "../../../../public/avatar.png";
import img from "../../../../public/avatar.png";
import { FaCog } from "react-icons/fa";
import { GetData } from "../Log/CheckLogin";
import { useLogContext } from "../Log/LogContext";
import { Get, Post } from "../Fetch/Fetch";
import Setting from "./profile_setting";
import { APIs } from "@/app/Props/APIs";
import FriendListComponent from "./friendList";

export default function Profile_info() {
	const { online, setOnline } = useLogContext();
	const imgRef = useRef(null) as any;
	let photo = avatar.src;

	async function fetchData() {
		const data = await GetData({ Api: "Profile", user: "" }) as any;
		setData(data);
	}

	const [hover, setHover] = useState(false);
	const mousehover = useRef(null) as any;
	const [data, setData] = useState({} as any);
	const [refresh, setRef] = useState<boolean>(false);
	useEffect(() => {
		if (online) fetchData();
		// TODO
	}, []);

	// useEffect(()=>{setRef(!refresh)},[refresh])

	if (data?.photo) photo = data?.photo;
	else photo = avatar.src;

	const [showSetting, setShowSetting] = useState<boolean>(false);

	const handleClick = (val: boolean) => {
		setShowSetting(val);


	};

	return (
		<div className="m-8 flex flex-row gap-8 h-[85vh]  ">
			{showSetting ? <Setting handleClick={handleClick} User={data} /> : <Info />}

			<div
				ref={mousehover}
				className="gap-8 w-full grid  grid-cols-3 grid-rows-4 "
				id={hover ? "profile_grid_blur" : ""}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div
					className="  rounded-lg  w-[30%]  bg-gray-800 min-w-full overflow-hidden hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500  " >
					2 is teh
					<div className=" relative w-full h-full m-[50%] rounded-full bg-blue-400 blur-3xl"></div>
				</div>

				<div className="rounded-lg  w-[30%] bg-gray-800 min-w-full overflow-hidden hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500" > 3 <div className=" relative w-full h-full m-[50%] rounded-full bg-green-500 blur-3xl"></div>
				</div>

				<div className="rounded-lg  w-[30%] bg-gray-800 min-w-full overflow-hidden hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500" > 4 <div className=" relative w-full h-full m-[50%] rounded-full bg-red-400 blur-3xl"></div>
				</div>

				<div className=" rounded-lg col-span-2 row-span-2 bg-gray-800 hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500/50 " > 5 <Image src={img} width={100} height={100} alt="img" />
				</div>
				<div className="rounded-lg overflow-auto bg-gray-800 hover:ease-in-out row-span-3  duration-700 shadow-sm shadow-cyan-500/50 " > <h1 className="text-white font-bold text-xl  justify-center text-center p-4 bg-gradient-radial from-slate-600 to bg-slate-900">Friends List</h1> <FriendListComponent />
				</div>
				<div className=" rounded-lg col-span-2 bg-gray-800 hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500/50 " > 7
				</div>
			</div>
		</div>
	);

	function Info() {

		function checkStatus(status:string) {
			
			switch  (status) {
				case "ONLINE":
					return  "bg-green-500"
				case "OFFLINE":
					return "bg-red-500"
				case "INGAME":
					return "bg-yellow-500"
				default:
					return "bg-gray-500"

		}
	}
	let statusColor:string  = checkStatus(data?.status);


		
		return (
			<div className=" flex flex-col overflow-auto rounded-lg  items-center  h-full min-w-[400px] max-w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black">

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
				<div className="flex w-full p-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900  mt-8 items-center justify-center ">
					<div className={` w-[15px] h-[15px] relative animate-pulse mr-3 rounded-full justify-center shadow-lg ${statusColor}`}></div>
					<h1 className="text-xl  font-bold  items-center"> {data?.status}</h1>
				</div>
				
				<div className="w-[95%] mt-8 h-auto   bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
					{""}
					{data.bio}{""}
				</div>
				<div className="grid mt-8 grid-cols-2 grid-rows-2 gap-3 w-[95%] h-fit ">
					<div className="text-2xl mt-6 col-span-2 bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300  p-6 shadow-lg flex justify-center items-center h-16 rounded-tr-2xl rounded-tl-2xl">
						<Image src={achiev_pic} width={60} height={60} alt="achievment" />{" "}
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
