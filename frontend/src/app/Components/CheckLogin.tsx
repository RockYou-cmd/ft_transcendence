import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {Post} from "./post";
import {APIs} from "../Props/APIs";
import { notFound } from "next/navigation";
import {Get} from "./post";
import React from "react";
import Form from "../Profile/form";
import axios from "axios";

export async function GetData(Api : string, user: string){
	
	let data : any;

	// console.log("Profile ", APIs.Profile + user);
	// console.log(APIs.Navbar + user);

	if (Api == "Profile")
		data = await Get(APIs.Profile + user);
	else if (Api == "Chat")
		data = await Get(APIs.Chat);
	else if (Api == "Game")
		data = await Get(APIs.Game);
	else if (Api == "Navbar")
		data = await Get(APIs.Navbar + user);
	
	console.log("data", data);
	// const res = await data.json();
	// console.log("res", res);
	return data;
	// return res;
}



export default async function CheckLogin(LogIn : any) {

	const cookie = Cookies.get("access_token");
	const User = Cookies.get("user") || "undefined";


	let data : any = undefined;
	const {log, render} = Form();

	if (cookie == undefined || User == "undefined"){
		LogIn.logInHook?.setState(true);
		return (<>{log == false ? render : null}</>);
	}
	// if (log == false && cookie != undefined){
	// 	try{
	// 		data = GetData(Api, User);
	// 	}catch(err){
	// 		alert(err);
	// 	}
	// }

	// return {data,
	// 	render: (<></>)
	// };
	return(<></>)
}