
import './login.css'
import { use, useEffect, useRef, useState } from 'react';
import UserNotFound from '../[form]/not-found';
import { notFound } from 'next/navigation';

export interface FormProps {
	login: string;
	password: string;
	firstname: string;
	familyname: string;
}


var data: { email: string, password: string } = {
	email: '',
	password: '',
};

//post request

// const ApiRequest = async () => {
// 	await fetch('http://localhost:3000/API/db.json', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(data),
// 	});
// };

const ApiRequest = async (Username: string) => {
	const res = await fetch('http://localhost:4000/users/' + Username);
	return res.json();
};


export default function Form() {
	// const[inputValue, setInput] = useState('');
	// var check = false;
	const [wait, checkwait] = useState(false);
	const [check, checkUpdate] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);




	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.email = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			const datas = await ApiRequest(data.email);


			if (datas.login == data.email && datas.password == data.password) {
				window.location.href = `${data.email}`;
			}
			else {
				checkUpdate(true);
			}
			// data.email += datas;
			// data.password += datas.password;
		}
	};
	useEffect(() => {
		checkwait(true);
	}, []);

	if (!wait) {
		return <div>loading...</div>
	}
	return (
		<>
			<input ref={emailRef} type="text" className="email" placeholder="Enter your Username" />
			<input ref={passwordRef} type="password" className="password" name="password" placeholder="Type your password" />

			<a href="" className="forgot">Forgot your password?</a>
			<button id="btn" onClick={handleClick}>Login</button>
			{check && notFound()}
			{/* {check&& (
				<p className='check' >email {data?.email} | password {data?.password} </p>
			)} */}

		</>
	);
}