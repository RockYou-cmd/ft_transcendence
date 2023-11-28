"use client"

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import Profile from "@/app/profile/profile";
import Cookies from "js-cookie";

import LoG from "@/app/Components/Log/Log";
import path from "path";


export default function UserProfile({ param }: { param: { id: string } }) {


	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const [cookie, setCookie] = useState(Cookies.get("access_token") || "");
	const [wait, checkwait] = useState(false);
	const [user, setUser] = useState(param?.id || "");
	const pathname = usePathname();

	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
		cookieHook: { state: cookie, setState: setCookie },
		waitHook: { state: wait, setState: checkwait },
	}

	let render = LoG({ page: "Profile", LogIn: hooks }) as any;

	let name: string = "";
	name = pathname.split("/")[2];

	useEffect(() => {
		hooks.waitHook.setState(true);
		setUser(name);
	}, []);



	if (!hooks.waitHook.state) {
		return (<><div>loading...</div></>)
	}
	return (
		<>

			{hooks.logInHook.state == false && hooks.cookieHook.state == "" ? render :
				(<>
					<Profile User={name} />
				</>)}
		</>
	);
}