"use client"

import { use, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import Profile from "@/app/profile/profile";
import Cookies from "js-cookie";
import { GetData } from "@/app/Components/Log/CheckLogin";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";
import LoG from "@/app/Components/Log/Log";
import { useLogContext } from "@/app/Components/Log/LogContext";
import { FaCog } from "react-icons/fa";
import { SendFriendRequest } from "@/app/Components/Settings/ChatSettings";
import { MouseEvent } from "react";
import NotFound from "./not-found";
import { useRouter } from "next/navigation";

export default function UserProfile({ param }: { param: { id: string } }) {
	
	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	
	let photo = avatar.src;
	const Fstatus = useRef("request friend");
	const { online, setOnline } = useLogContext();
	const [Userdata, UsersetData] = useState({} as any);
	const [refresh, setRefresh] = useState(false);
	
	const pathname = usePathname();

	let name: string = "";
	const friend  = useRef("not friend");
	name = pathname.split("/")[2];
	const router = useRouter();
	if (name == "not-found")
		return (<NotFound />);
	
	async function fetchData() {
		const data = await GetData({Api : "User", user : name}) as any;
		console.log(data);
		if (data == undefined){
			Cookies.remove("access_token");
			setOnline("OFF");
			hooks.logInHook.setState(false);
		}

		if (data?.statusCode == 404){
			console.log("user not found");
			router.push("/users/not-found");
		}
		UsersetData(data);
		if (data?.status == "PENDING")
		Fstatus.current = "cancel request";
		else if (data?.status == "WAITING")
		Fstatus.current = "accept request";
		else if (data?.status == "ACCEPTED")
			Fstatus.current = "remove friend";
		else if (data?.status == "BLOCKED")
			Fstatus.current = "unblock";
		else
			Fstatus.current = "request friend";
		if (data?.status)
			friend.current = data?.status;
		else
			friend.current = "not friend";
	}
	
	// enum Status {
	// 	PENDING
	// 	WAITING
	// 	ACCEPTED
	// 	BLOCKED
	//   }

	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },
		waitHook: { state: wait, setState: checkwait },
	}

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;


	useEffect(() => {hooks.waitHook.setState(true);},[]);

	useEffect(() => {
		if (online == "ON")
			fetchData();
	}, [online, refresh]);
	
	
	if (Userdata?.photo != null)
	photo = Userdata.photo;
	else
		photo = avatar.src;

	async function friendEvent(e : MouseEvent){
		e.preventDefault();
		try{
			const res = await SendFriendRequest({username: Userdata?.username, status: Fstatus.current}) || undefined;
			if (res == undefined){
				Cookies.remove("access_token");
				setOnline("OFF");
				hooks.logInHook.setState(false);
			}
			console.log(res);
			setRefresh(!refresh);
		}catch(err){
			alert(err);}
	}

	
	if (!wait) { return (<div>loading...</div>)}
	return (
		<>
			{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render :
			
			(<><div className="m-8 flex flex-row gap-8 h-[85vh] ">
				<div className=" flex flex-col rounded-lg  items-center bg-teal-500 h-full min-w-[400px]  bg-gradient-to-r from-blue-700 to-blue-900" >profile info
					<Image src={photo} alt="user" priority={true} quality={100} width={200} height={200} className=' rounded-full border-2  bg-white '></Image>
					<h1 className='text-3xl pt-3 ' > {Userdata?.username} </h1>

					<button onClick={friendEvent} className="m-4 bg-green-600 p-2 rounded-md">{Fstatus.current}</button>
					<button onClick={()=>{SendFriendRequest({username: name, status: "Block"})}} className="m-4 bg-red-600 p-3 rounded-md">Block</button>
					<span className="bg-yellow-500 p-2 rounded-md font-normal text-lg">{friend.current}</span>

					<button className='ml-auto  w-[100px] h-[40px] flex justify-center p-3  bg-yellow-500 rounded-lg hover:bg-yellow-600 items-center gap-2 font-semibold'><span className='text-2xl'><FaCog /></span> EDIT</button>
					<div className='w-auto h-auto mt-[50px] m-2 p-3 bg-teal-200/30 rounded-lg hover:bg-white/30 '> this thebio place bla bbab alblab abla blablb lab lab lab lab lab </div>
					<div className='grid grid-cols-2 grid-rows-2 gap-3 w-[95%] h-fit '>
						<div className='bg-red-500 col-span-2 flex justify-center'>Achievment</div>
						<div className='bg-red-500'>1</div>
						<div className='bg-red-500'>2</div>
						<div className='bg-red-500'>3</div>
						<div className='bg-red-500'>4</div>
					</div>

				</div>
				<div className='gap-8 w-full grid  grid-cols-3 grid-rows-4 '>
					<div className="rounded-lg  w-[350px]  bg-teal-500 min-w-full hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50 ">2</div>
					<div className="rounded-lg  w-[350px] bg-teal-500 min-w-full hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">3</div>
					<div className="rounded-lg  w-[350px] bg-teal-500 min-w-full hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">4</div>
					<div className=" rounded-lg col-span-2 row-span-2 bg-teal-500 hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">5</div>
					<div className="rounded-lg bg-teal-500 min-w-[350px] hover:ease-in-out row-span-3 hover:bg-teal-900 shadow-lg shadow-cyan-500/50">6</div>
					<div className=" rounded-lg col-span-2 bg-teal-500 hover:ease-in-out hover:bg-teal-900 shadow-lg shadow-cyan-500/50">7</div>
				</div>
			</div></>)}
		</>
	)
}