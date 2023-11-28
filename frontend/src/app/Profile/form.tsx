
import '../assest/login.css'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../Components/Fetch/post';
import Link from 'next/link';
import React from 'react';
import { APIs } from '../Props/APIs';
import Cookies from 'js-cookie';
import { useLogContext } from '../Components/Log/LogContext';



var data: { username: string, password: string } = {
	username: '',
	password: '',
};

export default function Form() {

	const { online, setOnline } = useLogContext();

	const [wait, checkwait] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const [log, setLog] = useState(false);


	async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.username = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			try {
				const res = await Post(data, APIs.SignIn);
				const responseData = await res.json();
				if (res.status == 201) {
					setLog(true);
					Cookies.set('access_token', responseData.access_token);
					setOnline("ON");
				}
				else {

					alert(responseData.message);
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


	useEffect(() => {
		checkwait(true);
	}, []);

	if (!wait) {
		return { render: (<><div>loading...</div><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></>) }
	}

	return {
		log,
		render: (
			<>
				{/* <Link href="/" >back to Home</Link> */}
				<div id="main">
					<h2 className="title">Login</h2>
					<div className="Fline"></div>
					<input ref={emailRef} type="text" className="email" placeholder="Enter your Username" />
					<input ref={passwordRef} type="password" className="password" name="password" placeholder="Type your password" />

					<Link href="" className="forgot">Forgot your password?</Link>
					<button className="btn" onClick={handleClick}>Login</button>
					<Link href={APIs.intraAuth} className="Intra">Login with Intranet</Link>
					<Link href={APIs.googleAuth} className="Intra Google">Login with Google</Link>


					<Link href="/create" className="createbtn">Create an account</Link>
				</div>
			</>

		)
	}
}