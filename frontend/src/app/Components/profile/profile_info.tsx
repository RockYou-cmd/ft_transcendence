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
import FriendListComponent from "./friendList";
import { APIs } from "@/app/Props/APIs";

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


		// fetching friend lis o fthe current user
		const [friendList, setFriendList] = useState<any[]>([]);
		const fetchFriendList = async () => {
		  try {
			const response = await Get(APIs.Friends);
			if (response.ok) {
			  const data = await response.json();
			  setFriendList(data); 
			} else {
			  throw new Error('Failed to fetch friend list');
			}
		  } catch (error) {
			console.error('Error fetching friend list:', error);
		  }
		  
		  useEffect(() => {
			  fetchFriendList();
			}, []); 
		};

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
					className="  rounded-lg  w-[30%]  bg-gray-800 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-sm shadow-cyan-500  "
					
				>
					2 is teh
					<div className=" relative w-full h-full m-[50%] rounded-full bg-blue-400 blur-3xl"></div>
				</div>

				<div
					className="rounded-lg  w-[30%] bg-gray-800 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-sm shadow-cyan-500"
					
				>
					3
					{/* <FriendListComponent {friendList} /> */}
					<div className=" relative w-full h-full m-[50%] rounded-full bg-green-500 blur-3xl"></div>
				</div>

				<div
					className="rounded-lg  w-[30%] bg-gray-800 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-sm shadow-cyan-500"
					
				>
					4
					<div className=" relative w-full h-full m-[50%] rounded-full bg-red-400 blur-3xl"></div>
				</div>

				<div
					className=" rounded-lg col-span-2 row-span-2 bg-gray-800 hover:ease-in-out hover:scale-105 duration-700 shadow-sm shadow-cyan-500/50 "
					
				>
					5
					<Image src={img} width={100} height={100} alt="img" />
				</div>
				<div
					className="rounded-lg bg-gray-800 hover:ease-in-out row-span-3 hover:scale-105 duration-700 shadow-sm shadow-cyan-500/50 "
					
				>
					6
				</div>
				<div
					className=" rounded-lg col-span-2 bg-gray-800 hover:ease-in-out hover:scale-105 duration-700 shadow-sm shadow-cyan-500/50 "
					
				>
					7
				</div>
			</div>
		</div>
	);

	function Info() {
		return (
			<div className=" flex flex-col rounded-lg  items-center  h-full min-w-[400px] max-w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black">

				<Image
					src={photo}
					alt="user"
					priority={true}
					quality={100}
					width={200}
					height={200}
					className=" rounded-full border-2 w-[250px] h-[250px] bg-white flex-shrink-0 mt-4"
				></Image>
				<h1 className="text-3xl font-bold pt-3 "> {data?.username?.toUpperCase()} </h1>
				<button
					className="w-28 h-10 relative ] flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-lg border-2 border-blue-600 focus:outline-none transition duration-300 ease-in-out font-semibold text-white shadow-md"
					onClick={() => handleClick(true)}
				>
					<span className="text-2xl">
						<FaCog />
					</span>{" "}
					EDIT
				</button>
				<div className="w-[95%]  h-auto mt-[50px]  bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
					{" "}
					{data.bio}{""}
				</div>
				<div className="grid grid-cols-2 grid-rows-2 gap-3 w-[95%] h-fit ">
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
