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
import swal from "sweetalert";
import { CircularProgressbar } from 'react-circular-progressbar';
import MatchHistory from "../../Components/profile/matchHistory";
import { BsPersonFillAdd } from "react-icons/bs";
import AchievmentIcon from "../../../../public/achievment.png";
import Achievment from "../../Components/profile/achievment"
import UserLevel from "@/app/Components/profile/userLevel";
import { FaUserFriends } from "react-icons/fa";
import { GiPingPongBat } from "react-icons/gi";
import { FaRankingStar } from "react-icons/fa6";
import { GiGoalKeeper } from "react-icons/gi";





export default function UserProfile() {

	const { socket } = useSocket();
	const { me } = useMe() as any;
	const [wait, checkwait] = useState(false);

	let photo = avatar.src;
	const Fstatus = useRef("request friend");
	const { online } = useLogContext();
	const [Userdata, UsersetData] = useState({} as any);
	const [refresh, setRefresh] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const pathname = usePathname();
	const hooks = {
		dataHook: { state: Userdata, setState: UsersetData },
		waitHook: { state: wait, setState: checkwait },
	}

	let name: string = "";
	const friend = useRef("not friend");
	const router = useRouter();
	name = pathname.split("/")[2];

	useEffect(() => {
		if (name == me?.username)
			router.push("/");
	}, [me]);


	let render = LoG({ page: "User", LogIn: hooks, User: name }) as any;


	useEffect(() => {
		if (Userdata?.statusCode == 404 || (Userdata?.blocked && Userdata?.blocked !== Userdata?.username)) {
			router.push("/users/not-found");
		}
		if (Userdata?.friendShipstatus == "PENDING" && Userdata?.sender == Userdata?.username)
			Fstatus.current = "accept request";
		else if (Userdata?.friendShipstatus == "PENDING")
			Fstatus.current = "cancel request";
		else if (Userdata?.friendShipstatus == "ACCEPTED")
			Fstatus.current = "remove friend";
		else if (Userdata?.friendShipstatus == "BLOCKED")
			Fstatus.current = "unblock";
		else
			Fstatus.current = "request friend";
		if (Userdata?.friendShipstatus)
			friend.current = Userdata?.friendShipstatus;
		else
			friend.current = "not friend";


	}, [Userdata, hooks.dataHook.state]);


	async function fetchData() {
		const data = await GetData({ Api: "User", user: name }) as any;
		if (data == undefined) {
			Logout();
		}

		// if (data?.statusCode == 404 || (data?.blocked && data?.blocked !== data?.username)) {
		// 	router.push("/users/not-found");
		// }

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
			swal(err as string, "", "error");
		}
	}



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
	let statusColor: string = checkStatus(Userdata?.status);


	function CalculateWinRate(play: string, win: string) { // calculate winrate
		if (Number(play) === 0)
			return 0;
		const winrate = Number(((Number(win) / Number(play)) * 100).toFixed(0));
		return winrate;
	}



	if (name == "not-found")
		return (<NotFound />);

	if (!hooks.waitHook.state) { return <Loading /> }
	return (
		<>
			{online == "OFF" ? render :

				(<><div className="m-8 flex flex-row gap-8 h-[88vh]  ">
					<div className=" flex flex-col overflow-auto rounded-lg  items-center  h-full min-w-[450px] max-w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black" >
					<Image
					src={photo}
					alt="user"
					priority={true}
					quality={100}
					width={200}
					height={200}
					className=" rounded-full mt-8 border-2 w-[250px] h-[250px] bg-white flex-shrink-0 "
				></Image>
				<h1 className="text-3xl mt-8 font-bold pt-3 "> {Userdata?.username?.toUpperCase()} </h1>

						<div className="flex flex-rowjustify justify-center  h-auto rounded-lg items-center   min-w-[450px] ">
							{renderFriendStatusButton()}
							{Userdata?.friendShipstatus != "BLOCKED" ? isMenuOpen ? <SlClose size={25} onClick={toggleMenu} className=" bg-red-600 rounded-full top-0 left-0 cursor-pointer" />
								: <CgMoreVerticalR size={25} onClick={toggleMenu} className="hover:bg-gray-200/20 cursor-pointer" />
								: null}


							<div className="relative bg-red-500 mb-10">
								{isMenuOpen && Userdata?.friendShipstatus != "BLOCKED" && <ProfileMenu User={Userdata} onClose={setIsMenuOpen} refresh={refresh} setRefresh={setRefresh} />}
							</div>
						</div>
						<div className="flex w-full p-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900  mt-8 items-center justify-center ">
							<div className={` w-[15px] h-[15px] relative animate-pulse mr-3 rounded-full justify-center shadow-lg ${statusColor}`}></div>
							<h1 className="text-xl  font-bold  items-center"> {Userdata?.status}</h1>
						</div>


						{/* <button onClick={friendEvent} className="m-4 bg-green-600 p-2 rounded-md">{Fstatus.current}</button>
						<button onClick={(e: MouseEvent) => friendEvent(e, "block")} className="m-4 bg-red-600 p-3 rounded-md">{Fstatus.current == "unblock" ? "UNBLOCK" : "BLOCK"}</button>
						<span className="bg-yellow-500 p-2 rounded-md font-normal text-lg">{friend.current}</span>  */}
						<div className=" w-full ">
							<UserLevel data={Userdata?.gameProfile} />
						</div>

						<div className="w-[95%] mt-8 h-auto   bg-black bg-opacity-50 rounded-md p-6 text-white border-2 border-gray-700 shadow-lg ">
							{Userdata.bio}
						</div>

						<div className="flex flex-col mt-8    gap-3 w-[95%] h-fit ">
							<div className="flex items-center justify-center border bg-cyan-400/30 rounded-t-xl p-2">
								<Image src={AchievmentIcon} priority={true} width={45} height={45} alt="achievmentIcon" />
								<h1 className="font-bold text-2xl ">ACHIEVEMENTS</h1>
								<Image src={AchievmentIcon} priority={true} width={45} height={45} alt="achievmentIcon" />
							</div>
							<Achievment gamesPlayed={Userdata?.gameProfile?.gamesPlayed} goalScored={Userdata?.gameProfile?.goal} goalConced={Userdata?.gameProfile?.goalsConced} wins={Userdata?.gameProfile?.wins} />
						</div>

					</div>
	


<div className="gap-5 w-full h-full grid grid-cols-3  grid-rows-4 xl:h-[100%] font-bold ">
				<div className=" min-h-[17.8rem] tetx-xl items-start rounded-lg col-span-3  grid xl:grid-cols-4 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 grid-row-2 gap-1  bg-gray-800 min-w-full overflow-hidden  shadow-sm  " >
					<div className="flex h-full relative border rounded-lg flex-col w-auto justify-center items-center ">
						<div className="flex  w-full  flex-row justify-center text-center ">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2"> Games</h1>
						</div>
						<GiPingPongBat size={100}  className="absolute opacity-5 xl:w-64 lg:w-36 md:w-28 sm:w-16"/>
						<p className="text-gray-300"> Played: {Userdata?.gameProfile?.gamesPlayed}</p>
						<p className="text-gray-300"> Wins: {Userdata?.gameProfile?.wins}</p>
						<p className="text-gray-300"> Losses : {Userdata?.gameProfile?.losses}</p>
					</div>

					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className=" flex  w-full  flex-row justify-center text-center">
							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg ">Goals Stats</h1>
						</div>
						<GiGoalKeeper  size={100} className="absolute opacity-10 xl:w-64 lg:w-36 md:w-28 sm:w-16" />
						<p className="text-gray-300"> goals scored: {Userdata?.gameProfile?.goalsScored}</p>
						<p className="text-gray-300"> goals conced: {Userdata?.gameProfile?.goalsConced}</p>
					</div >
					<div className="flex h-full relative border rounded-lg flex-col w-auto  justify-center items-center">
						<div className="flex  w-full  flex-row justify-center text-center">

							<h1 className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2 ">Win Rate</h1>
						</div>
						<div className=" h-fit w-[10vw]  ">
							<CircularProgressbar value={CalculateWinRate(Userdata?.gameProfile?.gamesPlayed, Userdata?.gameProfile?.wins)} text={`${CalculateWinRate(Userdata?.gameProfile?.gamesPlayed, Userdata?.gameProfile?.wins)}%`} />
						</div>
					</div>

					<div className="flex relative border rounded-lg flex-col w-auto h-full  felx justify-center items-center">
						<div className="text-white absolute top-0 text-lg w-full   bg-gradient-to-tr from-blue-800 via-blue-400 to-blue-900 font-bold rounded-t-lg mb-2">
						<h1 className="flex  w-full  flex-row justify-center text-center">Game State</h1>
						</div>
						<FaRankingStar size={100}  className="absolute opacity-10 xl:w-64 lg:w-36 md:w-28 sm:w-16" />
						<p className="text-gray-300"> Player XP: {Userdata?.gameProfile?.xp}</p>
						<p className="text-gray-300"> Clean Sheet: {Userdata?.gameProfile?.cs}</p>
					</div>
				</div>
				
				<div id="scrollHide" className=" rounded-lg col-span-2 row-span-3 bg-gray-800 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-2 overflow-y-scroll shadow-sm shadow-cyan-500/50" >
					<h1 className=" text-white font-bold text-xl  justify-center text-center p-4 bg-gradient-radial from-slate-600 to bg-slate-900 ">Match history</h1>
					<MatchHistory page="Profile" User={Userdata?.username as string}/>
				</div>

				<div className="rounded-lg bg-red- overflow-auto bg-gray-800 hover:ease-in-out row-span-3  lg:col-span-3 md:col-span-3  sm:col-span-3 xl:col-span-1 duration-700 shadow-sm shadow-cyan-500/50" > 
				<div className="divide-x-2 divide-slate-400/25 flex flex-row  w-full h-14 cursor-pointer bg-gradient-radial from-slate-600 to bg-slate-900">
					<div className="flex items-center justify-center w-[50%] h-full" >
						<BsPersonFillAdd size={25}/>
						<h1 className=" m-2 font-bold text-xl">Friends</h1>
					</div>
				</div>
					{/* <section className="flex flex-row  justify-between space-x p-4 bg-gradient-radial from-slate-600 to bg-slate-900">
						<h1 className=" text-white font-bold text-xl  ">{!Pending ? "Friends List" : "Invitations"}</h1> 
						<button onClick={()=>setPending(!Pending)}>{!Pending ? <FontAwesomeIcon icon={faUserGroup} /> : <FontAwesomeIcon icon={faUserPlus} />}</button>
					</section> */}
						
					<FriendListComponent User=""  />
				</div>
			</div>
		</div>

				</>)}
		</>
	)
}
