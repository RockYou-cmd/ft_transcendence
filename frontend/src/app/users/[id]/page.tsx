"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { GetData } from "@/app/Components/Log/CheckLogin";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";
import LoG from "@/app/Components/Log/Log";
import { useLogContext, useMe, useSocket } from "@/app/Components/Log/LogContext";
import { FaCog } from "react-icons/fa";
import { SendFriendRequest } from "@/app/Components/Settings/ChatSettings";
import { MouseEvent } from "react";
import NotFound from "./not-found";
import { useRouter } from "next/navigation";
import Logout from "@/app/Components/Log/Logout";
import Loading from "@/app/loading";
import { FaUserClock, FaUserPlus, FaUserTimes, FaUserMinus, FaUserLock } from 'react-icons/fa';
import { CgMoreVerticalR } from "react-icons/cg";
import { SlClose } from "react-icons/sl";
import ProfileMenu from "@/app/Components/profile/userMenu";
import FriendListComponent from "@/app/Components/profile/friendList";


export default function UserProfile({ param }: { param: { id: string } }) {

	// const [data, setData] = useState({} as any);
	const { socket } = useSocket();
	const { me } = useMe() as any;
	const [wait, checkwait] = useState(false);
	const [show, setShow] = useState(false);

	let photo = avatar.src;
	const Fstatus = useRef("request friend");
	const { online } = useLogContext();
	const [Userdata, UsersetData] = useState({} as any);
	const [refresh, setRefresh] = useState(false);

	const pathname = usePathname();
	const hooks = {
		dataHook: { state: Userdata, setState: UsersetData },
		waitHook: { state: wait, setState: checkwait },
	}

	let name: string = "";
	const friend = useRef("not friend");
	name = pathname.split("/")[2];
	const router = useRouter();

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	async function fetchData() {
		const data = await GetData({ Api: "User", user: name }) as any;
		if (data == undefined) {
			Logout();
		}

		if (data?.statusCode == 404 || (data?.blocked && data?.blocked !== data?.username)) {
			router.push("/users/not-found");
		}
		else
			setShow(true);

		UsersetData(data);
		if (data?.friendShipstatus == "PENDING" && data?.sender == data?.username)
			Fstatus.current = "accept request";
		else if (data?.friendShipstatus == "PENDING")
			Fstatus.current = "cancel request";
		else if (data?.friendShipstatus == "ACCEPTED")
			Fstatus.current = "remove friend";
		else if (data?.friendShipstatus == "BLOCKED")
			Fstatus.current = "unblock";
		else
			Fstatus.current = "request friend";
		if (data?.friendShipstatus)
			friend.current = data?.friendShipstatus;
		else
			friend.current = "not friend";
	}

	useEffect(() => {
		if (online == "ON")
			fetchData();
	}, [refresh]);

	useEffect(() => {
		socket?.on("update", (data: any) => {
			setRefresh(!refresh);
		});
		return () => { socket?.off("update"); }
	}, [socket, refresh]);



	if (Userdata?.photo != null)
		photo = Userdata.photo;

	else
		photo = avatar.src;

	async function friendEvent(e: MouseEvent, option?: string) {
		e.preventDefault();
		try {
			let res: any;
			if (option == "block")
				res = await SendFriendRequest({ username: Userdata?.username, status: "block", socket: socket, me: me }) || undefined;
			else
				res = await SendFriendRequest({ username: Userdata?.username, status: Fstatus.current, socket: socket, me: me }) || undefined;
			if (res == undefined) {
				Logout();
			}
			setRefresh(!refresh);
		} catch (err) {
			alert(err);
		}
	}


	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	function renderFriendStatusButton() {
		let buttonContent;
		let icon;

		switch (Fstatus.current) {
			case "accept request":
				buttonContent = "Accept Request";
				icon = <FaUserClock className="mr-2" />;
				break;
			case "cancel request":
				buttonContent = "Cancel Request";
				icon = <FaUserTimes className="mr-2" />;
				break;
			case "remove friend":
				buttonContent = "Remove Friend";
				icon = <FaUserMinus className="mr-2" />;
				break;
			case "unblock":
				buttonContent = "Unblock";
				icon = <FaUserLock className="mr-2" />;
				break;
			default:
				buttonContent = "Add Friend";
				icon = <FaUserPlus className="mr-2" />;
		}
		return (

			<button onClick={(e: MouseEvent) => friendEvent(e, Fstatus.current)} className="m-4 bg-green-600 p-2 rounded-md flex items-center">
				{icon}
				{buttonContent}
			</button>
		);
	}
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
let statusColor:string  = checkStatus(Userdata?.status);



	if (name == "not-found")
		return (<NotFound />);

	if (!show) { return <Loading /> }
	return (
		<>
			{online == "OFF" ? render :

				(<><div className="m-8 flex flex-row gap-8 h-[85vh]  ">
					<div className=" flex flex-col overflow-auto rounded-lg  items-center  h-full min-w-[450px] max-w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black" >
						<Image src={photo} alt="user" priority={true} quality={100} width={200} height={200} className=' rounded-full border-2  bg-white '></Image>
						<h1 className='text-3xl mt-8 font-bold pt-3 ' > {Userdata?.username.toUpperCase()} </h1>

						<div className="flex flex-rowjustify justify-center  h-auto rounded-lg items-center   min-w-[450px] ">
							{renderFriendStatusButton()}
							{/* {isMenuOpen ? <SlClose size={25} onClick={toggleMenu} className=" bg-red-600 rounded-full top-0 left-0 cursor-pointer" />
								: <CgMoreVerticalR size={25} onClick={toggleMenu} className="hover:bg-gray-200/20 cursor-pointer" />
							} */}

							{/* Show the profile menu when isMenuOpen is true */}
							{/* <div className="relative bg-red-500 mb-10">
								{isMenuOpen && <ProfileMenu User={Userdata} onClose={setIsMenuOpen} />}
							</div> */}
						</div>
						<div className="flex w-full p-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900  mt-8 items-center justify-center ">
						<div className={` w-[15px] h-[15px] relative animate-pulse mr-3 rounded-full justify-center shadow-lg ${statusColor}`}></div>
							<h1 className="text-xl  font-bold  items-center"> {Userdata?.status}</h1>
						</div>


						{/* <button onClick={friendEvent} className="m-4 bg-green-600 p-2 rounded-md">{Fstatus.current}</button>
						<button onClick={(e: MouseEvent) => friendEvent(e, "block")} className="m-4 bg-red-600 p-3 rounded-md">{Fstatus.current == "unblock" ? "UNBLOCK" : "BLOCK"}</button>
						<span className="bg-yellow-500 p-2 rounded-md font-normal text-lg">{friend.current}</span> */}

						<div className="w-[95%] mt-8 h-auto   bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
							{""}
							{Userdata.bio}{""}
						</div>
						<div className="grid mt-8 grid-cols-2 grid-rows-2 gap-3 w-[95%] h-fit ">
					<div className="text-2xl mt-6 col-span-2 bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300  p-6 shadow-lg flex justify-center items-center h-16 rounded-tr-2xl rounded-tl-2xl">
						{/* <Image src={achiev_pic} width={60} height={60} alt="achievment" />{" "} */}
						Achievmnet
					</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">1</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">2</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">3</div>
					<div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 shadow-lg h-auto">4</div>
				</div>

					</div>
					{/* <div className='gap-8 w-full grid  grid-cols-3 grid-rows-4 '>
						<div className="rounded-lg  w-[350px]  bg-teal-500 min-w-full hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50 ">2</div>
						<div className="rounded-lg  w-[350px] bg-teal-500 min-w-full hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">3</div>
						<div className="rounded-lg  w-[350px] bg-teal-500 min-w-full hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">4</div>
						<div className=" rounded-lg col-span-2 row-span-2 bg-teal-500 hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">5</div>
						<div className="rounded-lg bg-teal-500 min-w-[350px] hover:ease-in-out row-span-3 hover:bg-teal-900 shadow-lg shadow-cyan-500/50">6</div>
						<div className=" rounded-lg col-span-2 bg-teal-500 hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">7</div>
					</div> */}

<div className="gap-8 w-full grid  grid-cols-3 grid-rows-4 " >
				<div className="  rounded-lg  w-[30%]  bg-gray-800 min-w-full overflow-hidden hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500  " >
					2 is teh
					<div className=" relative w-full h-full m-[50%] rounded-full bg-blue-400 blur-3xl"></div>
				</div>

				<div className="rounded-lg  w-[30%] bg-gray-800 min-w-full overflow-hidden hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500" 
				> 3 <div className=" relative w-full h-full m-[50%] rounded-full bg-green-500 blur-3xl"></div>
				</div>

				<div className="rounded-lg  w-[30%] bg-gray-800 min-w-full overflow-hidden hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500" 
				> 4 <div className=" relative w-full h-full m-[50%] rounded-full bg-red-400 blur-3xl"></div>
				</div>

				<div className=" rounded-lg col-span-2 row-span-2 bg-gray-800 hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500/50 " 
				> 5
				</div>
				<div className="rounded-lg overflow-auto bg-gray-800 hover:ease-in-out row-span-3  duration-700 shadow-sm shadow-cyan-500/50 " 
				> <h1 className="text-white font-bold text-xl  justify-center text-center p-4 bg-gradient-radial from-slate-600 to bg-slate-900">Friends List</h1> <FriendListComponent />
				</div>
				<div className=" rounded-lg col-span-2 bg-gray-800 hover:ease-in-out  duration-700 shadow-sm shadow-cyan-500/50 " >
					7
				</div>
			</div>
				</div></>)}
		</>
	)
}
