import { log } from 'console';
import { Userdb }from '../Props/Userdb';
import React from 'react';


interface Props {
	User: Userdb;
	logOut: any;
}

export default function Profile({User, logOut}: Props){
	
	const handlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		logOut.logOutHook?.setState(true);
		console.log(logOut.logInHook?.state);
	}


	return(
		<>
			<h1>{User.username}</h1>
			<h1>{User.email}</h1>
			<h1>{User.password}</h1>

			<button onClick={handlClick}>Log Out</button>
		</>
	)

}