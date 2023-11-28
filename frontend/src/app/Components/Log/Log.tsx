import React, { useEffect } from "react";
import { GetData } from "./CheckLogin";
import Cookies from "js-cookie";
import CheckLogin from "./CheckLogin";
import { useLogContext } from "./LogContext";

export default function LoG({ page, LogIn }: { page: string, LogIn: any }) {

	const { online, setOnline } = useLogContext();
	const render = CheckLogin(LogIn) as any;
	useEffect(() => {
		async function fetchData() {
			const data = await GetData({Api:page, user : ""}) as any;
			if (data == undefined) {
				Cookies.remove("access_token");
				LogIn.logInHook.setState(false);
				setOnline("OFF");
			}
			else {
				LogIn.dataHook.setState(data);
				setOnline("ON");
			}
		}
		fetchData();
		LogIn.cookieHook.setState(Cookies.get("access_token") || "");
	}, [LogIn.logInHook.state]);


	return (
		<>
			{LogIn.logInHook.state == false && LogIn.cookieHook.state == "" ? render : null}
		</>
	)


}