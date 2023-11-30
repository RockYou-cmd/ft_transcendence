import Cookies from "js-cookie";
import { APIs } from "../../Props/APIs";
import { Get } from "../Fetch/post";
import Form from "../../profile/form";

export async function GetData({ Api, user }: { Api: string, user: string }) {

	let data: any;

	// if ((user != undefined && user != "") && Api == "Profile") {
	// 	data = await Get(APIs.User + user);
	// }

	if (Api == "User") 
		data = await Get(APIs.User + user);
	else if (Api == "Profile") 
		data = await Get(APIs.Profile);
	else if (Api == "Chat")
		data = await Get(APIs.Chat);
	else if (Api == "Game")
		data = await Get(APIs.Game);
	else if (Api == "Navbar")
		data = await Get(APIs.Navbar);
	return data;
}



export default async function CheckLogin(LogIn: any) {


	const { log, render } = Form();
	let cookie = Cookies.get("access_token");

	if (cookie == undefined) {
		return (<>{log == false ? render : null}</>);
	}
	if (LogIn.logInHook?.state == false)
		LogIn.logInHook?.setState(true);
	return (null)
}