import React, { useEffect } from "react";
import { GetData } from "./CheckLogin";
import Cookies from "js-cookie";
import CheckLogin from "./CheckLogin";


export default function LoG({page , LogIn} : {page : string, LogIn : any})  {


	const render = CheckLogin(LogIn) as any;
	useEffect(() => {
		LogIn.waitHook.setState(true);
		async function fetchData() {
			const data = await GetData(page) as any;
			if (data == undefined){
				Cookies.remove("access_token");
				LogIn.logInHook.setState(false);
			}
			else{
				LogIn.dataHook.setState(data);
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