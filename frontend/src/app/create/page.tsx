"use client";

import '../assest/create.css';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {Post} from '../Components/post';

var info: { firstname: string, lastname: string, email: string, password: string, username: string } = {
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	username: '',
};

var rep_password: string = '';



export default function Create() {

	const first_nameRef = useRef<HTMLInputElement>(null);
	const last_nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const user_nameRef = useRef<HTMLInputElement>(null);
	const repeat_passwordRef = useRef<HTMLInputElement>(null);
	const [wait, checkwait] = useState(false);
	const route = useRouter();
	const [refresh, checkRefresh] = useState(false);
	const [Fname, checkFname] = useState('');
	const [Lname, checkLname] = useState('');
	const [Email, checkEmail] = useState('');
	const [Pword, checkPassword] = useState('');
	const [Uname, checkUsername] = useState('');
	const [Rpassword, checkRpassword] = useState('');


	async function sumbitHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		info.firstname = first_nameRef.current?.value || '';
		info.lastname = last_nameRef.current?.value || '';
		info.email = emailRef.current?.value || '';
		info.password = passwordRef.current?.value || '';
		info.username = user_nameRef.current?.value || '';
		rep_password = repeat_passwordRef.current?.value || '';



		if (info.email && info.password && info.firstname && info.lastname && info.username && rep_password) {

			if (rep_password != info.password) {
				alert('passwords are not equal');
			}

			else {
				const data: { username: string, password: string, email: string } = { username: info.username, password: info.password, email: info.email };

				const res = await Post(data, 'http://localhost:3001/auth/signUp');
				console.log(res);
				const msg = await res.json();

				if (res.status == 201) {
					alert('user created');
					route.refresh();
					route.push('/');
				}
				else
					alert(msg.message);
			}

		}
		else {
			alert('Please fill all fields');
		}
	}


	useEffect(() => {
		checkwait(true);
	}, []);

	if (!wait) {
		return <div>loading...</div>
	}
	return (
		<>
			<form className="create" onSubmit={sumbitHandler}>
				<h1>Create Account</h1>

				<div className="col1">
					<label htmlFor="firstname" className="label">
						<span>First Name </span>
						<input ref={first_nameRef} type="text" value={Fname} onChange={(e) => checkFname(e.target.value)} placeholder="Your name.."></input>
					</label>

					<label htmlFor="lastname" className="label">
						<span>Last Name </span>
						<input ref={last_nameRef} type="text" value={Lname} onChange={(e) => checkLname(e.target.value)} placeholder="Your last name.."></input>
					</label>

					<label htmlFor="email" className="label">
						<span>Email </span>
						<input ref={emailRef} type="email" value={Email} onChange={(e) => checkEmail(e.target.value)} placeholder="Your email.."></input>
					</label>

				</div>
				<div className="col2">
					<label htmlFor="username" className="label">
						<span>Username </span>
						<input ref={user_nameRef} type="text" value={Uname} onChange={(e) => checkUsername(e.target.value)} placeholder="Your username.."></input>
					</label>

					<label htmlFor="password" className="label">
						<span>Password </span>
						<input ref={passwordRef} type="password" value={Pword} onChange={(e) => checkPassword(e.target.value)} placeholder="Your password.."></input>
					</label>

					<label htmlFor="repeat_password" className="label">
						<span>Repeat Password </span>
						<input ref={repeat_passwordRef} type="password" value={Rpassword} onChange={(e) => checkRpassword(e.target.value)} placeholder="Repeat your password.."></input>
					</label>
				</div>




				<button type="submit">Create</button>

				<p>you already have account ? <Link href="/Profile"><span>Sing IN</span></Link> </p>

			</form>
		</>
	)
}