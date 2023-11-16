"use client"

import React, { use } from 'react';
import Logout from '../Components/Logout';
import { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import Cookies from 'js-cookie';
import LoG from '../Components/Log';






export default  function Profile(){
	
	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },	
		waitHook: { state: wait, setState: checkwait },
	}


	let render = LoG({page: "Profile", LogIn: hooks}) as any;

	useEffect(() => {
		hooks.waitHook.setState(true);
	},[hooks.logInHook.state]);


	if (!hooks.waitHook.state) {
		return (<div>loading...</div>)
	}

	return(
		<>
		{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render : 
			
	 		
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