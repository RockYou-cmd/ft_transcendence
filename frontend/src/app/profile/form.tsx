
import '../assest/login.css'
import { useEffect, useRef, useState } from 'react';
import { Post , GetRes } from '../Components/Fetch/Fetch';
import Link from 'next/link';
import React from 'react';
import { APIs } from '../Props/APIs';
import { useLogContext, useSocket } from '../Components/Log/LogContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye , faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import ParticleBackground from '../Components/Log/particles';
import swal from 'sweetalert';


var data: { username: string, password: string } = {
	username: '',
	password: '',
};

export default function Form({TwoEA, User, back} : {TwoEA? : boolean, User? : string, back? : any}) {
	
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
		if (verify2FAResponse.ok) {
			if (online != "ON") {
				setOnline("ON");
				route.push("/");
				
			}
		} else {
			swal("2FA code not corerct", "", "error")
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
				const resData = await res?.json();
				console.log("res", res);
				console.log("resData", resData);
	
				if (res?.status == 201) {
					if (online != "ON") {
						setOnline("ON");
					}
				}
				else if (res?.status == 425) {
					setshow2FA(true);
				}
				else {
					swal(resData?.message, "", "error");
				}
			}
			catch (err) {
				swal(err as string, "", "error");
			}
		}
		else {
			swal("Please fill all the fields", "", "info");
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
		<div className=' relative mt-[30vh] '>
			<ParticleBackground />

			{/* <Link href="/" >back to Home</Link> */}
			<div id="main" className='' >
				{!show2FA ?  <>
					{back && <button id='backBtn' onClick={()=>{back(false);}}><FontAwesomeIcon icon={faCircleLeft} id="icon" /></button>}
				<h2 className="title">Login</h2>
				<div className="Fline"></div>
				<input ref={emailRef} type="text" className="email" placeholder="Enter your Username" />
				<div className="password">
					<input ref={passwordRef} type={hide ? "text" : "password"} className="pasIn" name="password" placeholder="Type your password" />
					{!hide ? <FontAwesomeIcon id="icon" icon={faEyeLowVision} onClick={() => setHide(!hide)} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faEye} id="icon" onClick={() => setHide(!hide)} style={{ cursor: "pointer" }} />}
				</div>
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