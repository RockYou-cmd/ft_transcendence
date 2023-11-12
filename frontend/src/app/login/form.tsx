
import '../assest/login.css'
import { useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import  Post  from '../Components/post';
import GetData from '../Components/get_data';
import { Userdb } from '../Props/Userdb';
import Link from 'next/link';
import React from 'react';
// import GetCookie from '../Components/Cookies';


var User: Userdb = {username: '', email: '', password: '', firstName: '', lastName: ''};

var ab : any;
var data: { username: string, password: string } = {
	username: '',
	password: '',
};

var info :{userId : string ,  title :string} = { userId : '', title : ''};

// interface Props {
	// 	updateData: (newData: {username: string, password: string, email: string}) => void;
	// }
	
	
export default function Form(LogIn : any) {
		// const[inputValue, setInput] = useState('');
		// var check = false;
		
		const [wait, checkwait] = useState(false);
		const [check, checkUpdate] = useState(false);
		const emailRef = useRef<HTMLInputElement>(null);
		const passwordRef = useRef<HTMLInputElement>(null);
		const route = useRouter();
		

		useEffect(() => {
			checkwait(true);
		}, []);
	// if (document.cookie.search("username") != -1)
	// 	return (<></>);
	
	async function handleClick(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.username = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			
			const res = await Post(data, "http://localhost:3001/auth/signIn");
			
			if (res.status == 201) {
				const responseData = await res.json();
				// User = responseData;
				console.log(responseData.status);
				if (responseData.status == 300){
					alert(responseData.message);
				}
				else{
					User.username = responseData.username;
					User.email = responseData.email;
					User.password = responseData.password;

					// ab = responseData;
					
					LogIn.logInHook?.setState(true);
					
					// document.cookie = "username=" + User.username;
				}
			}
		}
		
		else {
			alert('Please fill all fields');
		};
	};
	
	if (!wait) {
		return{ render: (<div>loading...</div>)}
	}
	
	return{
		User,
		render: (<>
			<Link href="/" >back to Home</Link>
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
	),
	}
}