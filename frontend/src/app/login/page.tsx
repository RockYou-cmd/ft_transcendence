"use client"
import './login.css'
import { useRef, useEffect, useState } from 'react';
import Form from './form';
import Link from 'next/link';
import { Userdb } from '../Props/Userdb';
import Profile from './profile';


var info : Userdb = {username: '', email: '', password: '', firstName: '', lastName: ''};



export default function Login() {
	


	const [LogIn, setLogIn] = useState(false);
	const [LogOut, setLogOut] = useState(false);

	const hooks = {
		logInHook: {state: LogIn, setState: setLogIn},
		logOutHook : {state: LogOut, setState: setLogOut},
		resetHooks : () => {LogIn && setLogIn(false); LogOut && setLogOut(false);}
	}
	const {User, render} = Form(hooks);
	


	info.username = User?.username || '';
	info.email = User?.email || '';
	info.password = User?.password || '';

	console.log(" login " ,  hooks.logInHook.state);
	console.log("logOut" , hooks.logOutHook.state);
	return (
		<>
		
			{ hooks.logInHook.state == false ? render  : 
				(hooks.logOutHook.state == false ? <Profile User={info} logOut={hooks}/> : hooks.resetHooks())}
		
			{/* {render} */}
			{/* <h1>{info.username} && {info.email} && {info.password}</h1>
			<h1>{User?.email} && {User?.username} && {User?.password}</h1> */}
			{/* <h1>{data.username} && {data.email} && {data.password} </h1> */}
			
		</>
	)
}