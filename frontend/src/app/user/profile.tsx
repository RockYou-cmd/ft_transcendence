"use client"

import React from 'react';
import Logout from '../Components/Logout';
import { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import  CheckLogin from '../Components/CheckLogin';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {GetData} from '../Components/CheckLogin';
import LoG from '../Components/Log';
export default  function Profile(){
	

	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
	}

	const [wait, checkwait] = useState(false);

	const render = CheckLogin(hooks.logInHook);
	useEffect(() => {
		checkwait(true);
		async function fetchData() {
			const data = await GetData("Profile", Cookies.get("user") || "") as any;
			setData(data);
		}
		fetchData();
	}, []);

	if (!wait) {
		return (<div>loading...</div>)
	}
	// const [log, setLog] = useState(false);
	// const [render, setRender] = useState(<div>loading...</div>);
	// const [data, setData] = useState({} as any);
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const {data, render} = await LoG("Profile");
			
	// 		setData(data);
	// 		setRender(render);
	// 	}
	// 	fetchData();
	// }, []);

	return(
		<>
		{log == false && Cookies.get("access_token") == undefined ? render : 
			// null}
	 		
			(<>
			<Navbar />

			<h1 className='text-black'>{data?.username}</h1>
			<h1>{data?.email}</h1>
			<h1>{data?.password}</h1>
			<h1>{data?.id}</h1>
			<Logout/>
			</>)
			}
		
			
	
		</>
	)

}