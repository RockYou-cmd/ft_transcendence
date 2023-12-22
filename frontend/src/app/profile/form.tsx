
import '../assest/login.css'
import { useEffect, useRef, useState } from 'react';
import { Post , GetRes } from '../Components/Fetch/Fetch';
import Link from 'next/link';
import React from 'react';
import { APIs } from '../Props/APIs';
import { useLogContext, useSocket } from '../Components/Log/LogContext';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import ParticleBackground from '../Components/Log/particles';


var data: { username: string, password: string } = {
	username: '',
	password: '',
};

export default function Form({TwoEA, User} : {TwoEA? : boolean, User? : string}) {
	
	const host = "http://localhost:3001";
	// const host = "http://10.12.11.1:3001";
	const { online, setOnline } = useLogContext();
	const [hide, setHide] = useState(false);
	const [show2FA, setshow2FA] = useState(false);
	const [token, setToken] = useState('');
	const [user, setUser] = useState("");
	const route = useRouter();

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	async function  handle2fa(e: any) {
		e.preventDefault();

		const verify2FAResponse = await GetRes(`http://localhost:3001/auth/verifyToken/?username=${user}&token=${token}`)
		console.log("verify", verify2FAResponse);
		if (verify2FAResponse.ok) {
			if (online != "ON") {
				setOnline("ON");
				route.push("/");
				
			}
		} else {
			alert("2FA code not corerct");
		}
		setToken('');
	}  

	
	async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.username = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			setUser(data.username);
			try {
				const res = await Post(data, APIs.SignIn);
				console.log("salam ", res);
				const resData = await res?.json();
				console.log("data", resData);
				if (res.status == 201) {
					if (resData?.status == 425){
						setshow2FA(true);
						console.log("heeer");
					}
					else{
						console.log("hey");
						if (online != "ON") {
							setOnline("ON");
						}
					}
				}
				else {
					alert(resData?.message);
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

	useEffect(()=>{
		if (TwoEA)
			setshow2FA(true);
		if (User)
			setUser(User);
	},[])
	return (
		<>
		<div className=' relative mt-[30vh]'>
			<ParticleBackground />

			{/* <Link href="/" >back to Home</Link> */}
			<div id="main" className='' >
				{!show2FA ?  <>
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
			</> : 
				<>

				<form onSubmit={handle2fa} className='flex bg-red-500 items-center justify-center'>
					<input className='text-black p-3'
					type='text'
					value={token}
					onChange= {(e) => setToken(e.target.value)}
					onKeyDown={(e : any)=>handle2fa}
					>
					</input>
					{/* <button onClick={(e:MouseEvent)=>handle2fa}> Verify </button> */}
					<button type='submit'> Verify </button>
				
				</form>
				</>	
				}
			</div>
		</div>
		</>

	)

}