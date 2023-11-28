"use client"

import { useEffect ,useState } from "react";
import Profile from "@/app/profile/profile";
import Cookies from "js-cookie";

import LoG from "@/app/Components/Log/Log";


export default function UserProfile({param } : {param: {id: string}}){
	

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

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	useEffect(() => {
		hooks.waitHook.setState(true);
	}, []);


	if (!hooks.waitHook.state) {
		return (<><div>loading...</div></>)
	}

	const user = param?.id;

	console.log("param", param)
	console.log("user", param?.id)

	// useEffect(() => {}, [user]);

	return(
		<>
			<h1>hello :  {param?.id}</h1>
			<h1>hello :  {user}</h1>
			{/* <Profile User={""} /> */}
		</>
	);
}