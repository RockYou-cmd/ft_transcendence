
import './login.css'
import { use, useEffect, useRef, useState } from 'react';
import UserNotFound from '../[form]/not-found';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';


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

const ApiRequest = async (data: object) => {

	await fetch('http://server:3001/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	
};


export default function Form() {
	// const[inputValue, setInput] = useState('');
	// var check = false;
	const [wait, checkwait] = useState(false);
	const [check, checkUpdate] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const route = useRouter();



	async function handleClick(event: React.MouseEvent<HTMLButtonElement>){
		event.preventDefault();
		if (emailRef.current?.value && passwordRef.current?.value) {
			data.email = emailRef.current?.value;
			data.password = passwordRef.current?.value;
			// const res = await ApiRequest(data);

			// const updateQuery = () => {
				// route.push(`http://server:3001/?name=${data.email}&password=${data.password}`);
			const res = await fetch(`http://server:3001/?name=${data.email}&password=${data.password}`);
			if (res.status == 201) {
				const user = await res.json();
				if (user.name == data.email)
					route.push(`${data.email}`);
				else
					route.refresh();
				
			}
			// 	console.log(route);
			// console.log(data);
			route.refresh();
			// };
			// data.email += datas;
			// data.password += datas.password;
		}
		
		else {
			alert('Please fill all fields');
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