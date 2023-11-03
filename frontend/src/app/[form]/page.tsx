import Link from 'next/link';
// import '../login/login.css'
import { notFound } from 'next/navigation';
// import UserNotFound from './not-found';
// import {useRouter} from 'next/router';
// import { FormProps } from '../login/form';
import './form.css';

import Loading from './loading';



const ApiRequest = async (id:string) => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	
	const res = await fetch('http://localhost:4000/users/'+id);
	return res.json();	
};


export default async function UserPage({params} : {params: {form: string}}) {
	
	const id = params.form;
	const data = await ApiRequest(id);
	
	// const data = await ApiRequest(id);
	// console.log(data);
	return (
		<>
			<h1 className='text-gray-500 text-3xl uppercase m-5 p-2 border-2 border-black font-sans'>welcome  {data.login}</h1>
	
				<h1 className='bg-red-500 h-6 w-80 m-6'>{data.firstname + ' ' + data.familyname}</h1>
				<h1 className="text-red-700"> {data.password}</h1>
			
				<br />
				<Link href="/login">logout</Link>
				<Link href="/">back to Home</Link>
		</>
	);
} 