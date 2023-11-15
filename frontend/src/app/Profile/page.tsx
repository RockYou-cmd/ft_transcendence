"use client"
import '../assest/login.css';
import { useRef, useEffect, useState } from 'react';
import Form from './form';
import Link from 'next/link';
import { Userdb } from '../Props/Userdb';
import Profile from '../user/profile';
import Cookies from 'js-cookie'
import {APIs} from '../Props/APIs';
import  CheckLogin  from '../Components/CheckLogin';


var info: Userdb = { username: '', email: '', password: '', firstName: '', lastName: '' };



export default function Login() {

	// const [waitt, checkwait] = useState(false);

	// const [LogIn, setLogIn] = useState(false);
	// const [LogOut, setLogOut] = useState(false);

	// const hooks = {
	// 	logInHook: { state: LogIn, setState: setLogIn },
	// 	logOutHook: { state: LogOut, setState: setLogOut },
	// 	resetHooks: () => { LogIn && setLogIn(false); LogOut && setLogOut(false); }
	// }

	
	

	// const cookie = Cookies.get("access_token");
	
	// console.log("cookie", cookie);
	// let data;
	// if (cookie == undefined)
	// const {data, render} = Form();

	// info.username = User?.username || '';
	// info.email = User?.email || '';
	// info.password = User?.password || '';
	// console.log("heyy " ,Cookies.get('access_token'));

	// useEffect(() => {setLogIn(true);},[Cookies.get('access_token')]);

	// useEffect(() => {
	// 	checkwait(true);
	// }, []);
	// if (!waitt){
	// 	return(<div>loading...</div>);
	// }
	// || Cookies.get("acces_token") == undefined

	// console.log("hook ",hooks.logInHook.state);
	return (
		<>
			<Profile/>
		    {/* <Form/> */}
			{/* {hooks.logInHook.state == false && Cookies.get("access_token") == undefined ? render : <Profile/>} */}
		{/* {render} */}
			{/* {Cookies.get("access_token") == undefined ? render :
				<Profile />} */}

			{/* {render} */}
			{/* <h1>{info.username} && {info.email} && {info.password}</h1>
			<h1>{User?.email} && {User?.username} && {User?.password}</h1> */}
			{/* <h1>{data.username} && {data.email} && {data.password} </h1> */}

		</>
	)
}