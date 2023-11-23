"use client"

import React, { use, useRef } from 'react';
import Logout from '../Components/Logout';
import { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import Cookies from 'js-cookie';
import LoG from '../Components/Log';


export default  function Profile(){
	
	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	let datas = useRef({} as any);
	const [wait, checkwait] = useState(false);
	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },	
		waitHook: { state: wait, setState: checkwait },
		datas: datas,
	}

	let render = LoG({page: "Profile", LogIn: hooks}) as any;

	useEffect(() => {
		hooks.waitHook.setState(true);
	},[]);


	if (!hooks.waitHook.state) {
		return (<div>loading...</div>)
	}
	return(
		<>
		{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render : 
			
	 		
			(<>
			{/* <Navbar /> */}

			<h1>{data?.username}</h1>
			<h1>{data?.email}</h1>
			<h1>{data?.password}</h1>
			<h1>{data?.id}</h1>
			<Logout/>
			</>)
			}
		
			
	
		</>
	)

}