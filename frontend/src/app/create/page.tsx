"use client";

import './create.css'
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

var info: { firstname: string, lastname: string, email: string, password: string, username: string} = {
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	username: '',
};



export default function Create(){
	
	const first_nameRef = useRef<HTMLInputElement>(null);
	const last_nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const user_nameRef = useRef<HTMLInputElement>(null);
	const repeat_passwordRef = useRef<HTMLInputElement>(null);


	return (
		<>
			<form className="create">
				<h1>Create Account</h1>

				<label htmlFor="firstname" className="label">
					<span>First Name </span>
					<input ref={first_nameRef} type="text" id="firstname" name="firstname" placeholder="Your name.."></input>			
				</label>
				
				<label htmlFor="lastname" className="label">
					<span>Last Name </span>
					<input ref={last_nameRef} type="text" id="lastname" name="lastname" placeholder="Your last name.."></input>
				</label>

				<label htmlFor="email" className="label">
					<span>Email </span>
					<input ref={emailRef} type="email" id="email" name="email" placeholder="Your email.."></input>
				</label>

				<label htmlFor="username" className="label">
					<span>Username </span>
					<input ref={user_nameRef} type="text" id="username" name="username" placeholder="Your username.."></input>
				</label>

				<label htmlFor="password" className="label">
					<span>Password </span>
					<input ref={passwordRef} type="password" id="password" name="password" placeholder="Your password.."></input>
				</label>

				<label htmlFor="repeat_password" className="label">
					<span>Repeat Password </span>
					<input ref={repeat_passwordRef} type="password" id="repeat_password" name="repeat_password" placeholder="Repeat your password.."></input>
				</label>
			

					
				
				<button type="submit">Create</button>

				<p>you already have account ? <Link href="/login">Sing IN</Link> </p>

			</form>
		</>
	)
}