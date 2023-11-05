"use client"
import './login.css'
import { useRef, useEffect, useState } from 'react';
import Form from './form';
import Link from 'next/link';



export default function Login() {
	
	const [LogIn, setLogIn] = useState(false);

	const hooks = {
		logInHook: {state: LogIn, setState: setLogIn},
	}

	return (
		<>
			{ hooks.logInHook.state == false ? <Form logIn={hooks}/> : <h1>Not Logged In</h1>}
			
			{/* <Link href="/" >back to Home</Link>
			<div id="main">
				<h2 className="title">Login</h2>
				<div className="line"></div>

				<Form />

				<button id="Intra">Login with Intranet</button>

				<Link href="/create" className="createbtn">Create an account</Link>
			</div> */}
		</>
	)
}