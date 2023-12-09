
import '../assest/login.css'
import { useEffect, useRef, useState } from 'react';
import { Post } from '../Components/Fetch/post';
import Link from 'next/link';
import React from 'react';
import { APIs } from '../Props/APIs';
import { useLogContext, useSocket } from '../Components/Log/LogContext';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';


var data: { username: string, password: string } = {
	username: '',
	password: '',
};

export default function Form() {

	const host = "http://localhost:3001";
	const { socket, setSocket } = useSocket();
	const { online, setOnline } = useLogContext();
	const [hide, setHide] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);


	async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.username = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			try {
				const res = await Post(data, APIs.SignIn);
				if (res.status == 201) {
					if (online != "ON") {

						setOnline("ON");
						setSocket(io(host + "/events", {
							withCredentials: true,
						}));
						// console.log("socket created");
					}
				}
				else {

				}
			}
			catch (err) {
				alert(err);
				// return <Error error={err as Error} reset={LogIn.resetHooks} />
			}

		}

		else {
			alert('Please fill all fields');
		};
	};

	return (
		<>
			{/* <Link href="/" >back to Home</Link> */}
			<div id="main">
				<h2 className="title">Login</h2>
				<div className="Fline"></div>
				<input ref={emailRef} type="text" className="email" placeholder="Enter your Username" />
				<div className="password">
					<input ref={passwordRef} type={hide ? "text" : "password"} className="pasIn" name="password" placeholder="Type your password" />
					{!hide ? <FontAwesomeIcon id="icon" icon={faEyeLowVision} onClick={() => setHide(!hide)} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faEye} id="icon" onClick={() => setHide(!hide)} style={{ cursor: "pointer" }} />}
				</div>

				<Link href="" className="forgot">Forgot your password?</Link>
				<button className="btn" onClick={handleClick}>Login</button>
				<Link href={APIs?.intraAuth} className="Intra">Login with Intranet</Link>
				<Link href={APIs?.googleAuth} className="Intra Google">Login with Google</Link>


				<Link href="/create" className="createbtn">Create an account</Link>
			</div>
		</>

	)

}