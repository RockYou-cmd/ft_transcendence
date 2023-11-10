
import { Userdb }from '../Props/Userdb';
import React from 'react';


export default function Profile({User, logOut}: {User: Userdb, logOut: any}){
	
	const handlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		logOut.logOutHook?.setState(true);
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