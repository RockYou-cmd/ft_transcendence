"use client"

import avatar from "../../../public/avatar.png";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { FaCog } from "react-icons/fa";
import { GetData } from '../Components/Log/CheckLogin';
import { useLogContext } from '../Components/Log/LogContext';


export default function Profile({User} : {User : string}) {

	const { online, setOnline } = useLogContext();
	const [data, setData] = useState({} as any);
	const [wait, checkwait] = useState(false);
	let photo = avatar.src;
	async function fetchData() {
		const data = await GetData({Api : "Profile", user : User}) as any;
		setData(data);
	}

	useEffect(() => {
		checkwait(true);
		if (online == "ON")
			fetchData();
	}, [online]);

	if (!wait) {
		return (<div>loading...</div>)
	}

	if (data?.photo != null)
		photo = data.photo;
	else
		photo = avatar.src;

	return (
		<>
			<div className="m-8 flex flex-row gap-8 h-[85vh] ">
				<div className=" flex flex-col rounded-lg  items-center bg-teal-500 h-full min-w-[400px]  bg-gradient-to-r from-blue-700 to-blue-900" >profile info
					<Image src={photo} alt="user" priority={true} quality={100} width={200} height={200} className=' rounded-full border-2  bg-white '></Image>
					<h1 className='text-3xl pt-3 ' > {data?.username} </h1>
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
			</div>
		</>
	)
}