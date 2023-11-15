
import '../assest/login.css'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Post} from '../Components/post';
import Link from 'next/link';
import React from 'react';
import { APIs }from '../Props/APIs';
import Cookies from 'js-cookie';




var data: { username: string, password: string } = {
	username: '',
	password: '',
};

export default function Form() {


	const [wait, checkwait] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	// const route = useRouter();
	const [log, setLog] = useState(false);


	async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.username = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			try{
				const res = await Post(data, APIs.SignIn);
				if (res.status == 201) {
					const responseData = await res.json();
					console.log(responseData.status);
					if (responseData.status == 300) {
						alert(responseData.message);
					}
					else {
						// LogIn.logInHook?.setState(true);
						setLog( true);
						Cookies.set('access_token', responseData.username);
						Cookies.set('user', responseData.username);
						console.log("logged in");
					}
				}
			
			
			}
			catch(err){
				// return <Error error={err as Error} reset={LogIn.resetHooks} />
			}
			
		}

		else {
			alert('Please fill all fields');
		};
	};

	useEffect(() => {
		checkwait(true);
	}, []);

	if (!wait) {
		return {render :  (<div>loading...</div>)}
	}

	return{
		log,
		render: (
		 <>
			{/* <Link href="/" >back to Home</Link> */}
			<div id="main">
				<h2 className="title">Login</h2>
				<div className="line"></div>
				<input ref={emailRef} type="text" className="email" placeholder="Enter your Username" />
				<input ref={passwordRef} type="password" className="password" name="password" placeholder="Type your password" />

				<a href="" className="forgot">Forgot your password?</a>
				<button id="btn" onClick={handleClick}>Login</button>
				<button id="Intra">Login with Intranet</button>

				<Link href="/create" className="createbtn">Create an account</Link>
			</div>
		</>
		
	)
	}
}