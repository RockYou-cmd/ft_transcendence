import Image from "next/image";
import achiev_pic from '../../../../public/achievment.png';
import { useEffect, useState, useRef } from 'react';
import avatar from "../../../../public/avatar.png";
import img from "../../../../public/avatar.png";
import { FaCog } from "react-icons/fa";
import { GetData } from "../Log/CheckLogin";
import { useLogContext } from "../Log/LogContext";
import { Post } from "../Fetch/Fetch";
import Setting from "./profile_setting";

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
		<div className="m-8 flex flex-row gap-8 h-[85vh] ">
			{showSetting ? <Setting handleClick={handleClick} User={data} /> : <Info />}

			<div
				ref={mousehover}
				className="gap-8 w-full grid  grid-cols-3 grid-rows-4 "
				id={hover ? "profile_grid_blur" : ""}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div
					className="  rounded-lg  w-[30%]  bg-black/5 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-gray-500 not:hover-bg-orang {styles.child} "
					id={hover ? "child" : ""}
				>
					2 is teh
					<div className=" relative w-full h-full m-[50%] rounded-full bg-blue-400 blur-3xl"></div>
				</div>

				<div
					className="rounded-lg  w-[30%] bg-black/5 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-gray-500 "
					id={hover ? "child" : ""}
				>
					3
					<Image src={img} width={100} height={100} alt="img" />
					<div className=" relative w-full h-full m-[50%] rounded-full bg-green-500 blur-3xl"></div>
				</div>

				<div
					className="rounded-lg  w-[30%] bg-black/5 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-gray-500 "
					id={hover ? "child" : ""}
				>
					4
					<div className=" relative w-full h-full m-[50%] rounded-full bg-red-400 blur-3xl"></div>
				</div>

				<div
					className=" rounded-lg col-span-2 row-span-2 bg-black/5 hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-cyan-500/50 "
					id={hover ? "child" : ""}
				>
					5
					<Image src={img} width={100} height={100} alt="img" />
				</div>
				<div
					className="rounded-lg bg-black/5 hover:ease-in-out row-span-3 hover:scale-105 duration-700 shadow-lg shadow-cyan-500/50 "
					id={hover ? "child" : ""}
				>
					6
				</div>
				<div
					className=" rounded-lg col-span-2 bg-black/5 hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-cyan-500/50 "
					id={hover ? "child" : ""}
				>
					7
				</div>

				<div className="rounded-lg  w-[30%] bg-black/5 min-w-full overflow-hidden hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-gray-500 " id={hover ? "child" : ""}>4
					<div className=" relative w-full h-full m-[50%] rounded-full bg-red-400 blur-3xl"></div>
				</div>

				<div className=" rounded-lg col-span-2 row-span-2 bg-black/5 hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-cyan-500/50 " id={hover ? "child" : ""}>5
					<Image src={img} width={100} height={100} alt="img" />
				</div>
				<div className="rounded-lg bg-black/5 hover:ease-in-out row-span-3 hover:scale-105 duration-700 shadow-lg shadow-cyan-500/50 " id={hover ? "child" : ""}>6</div>
				<div className=" rounded-lg col-span-2 bg-black/5 hover:ease-in-out hover:scale-105 duration-700 shadow-lg shadow-cyan-500/50 " id={hover ? "child" : ""}>7</div>
			</div>
		</div>
	);

	function Info() {
		return (
			<div className=" flex flex-col rounded-lg  items-center  h-full min-w-[400px] max-w-[450px] bg-gradient-to-r from-black/25 to-black/80">
				profile info
				<Image
					src={photo}
					alt="user"
					priority={true}
					quality={100}
					width={200}
					height={200}
					className=" rounded-full border-2 w-[250px] h-[250px] bg-white flex-shrink-0"
				></Image>
				<h1 className="text-3xl pt-3 "> {data?.username} </h1>
				<button
					className="ml-auto  w-[100px] h-[40px] flex justify-center p-3 mr-[2%] bg-yellow-500 rounded-lg hover:bg-yellow-600 items-center gap-2 font-semibold"
					onClick={() => handleClick(true)}
				>
					<span className="text-2xl">
						<FaCog />
					</span>{" "}
					EDIT
				</button>
				<div className="w-[95%] box-shadow: inset 0 -2px 4px h-fit mt-[50px]  p-3 rounded-lg bg-black/70 ">
					{" "}
					{data.bio}{" "}
				</div>
				<div className="grid grid-cols-2 grid-rows-2 gap-3 w-[95%] h-fit ">
					<div className="text-2xl mt-6 col-span-2 bg-blue-700/50 flex justify-center items-center h-16 rounded-tr-2xl rounded-tl-2xl">
						<Image src={achiev_pic} width={60} height={60} alt="achievment" />{" "}
						Achievmnet
					</div>
					<div className="bg-indigo-600 h-auto">1</div>
					<div className="bg-indigo-600 h-auto">2</div>
					<div className="bg-indigo-600 h-auto">3</div>
					<div className="bg-indigo-600 h-auto">4</div>
				</div>
			</div>
		);
	}
}
