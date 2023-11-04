import { Userinfo } from '../Components/get_data';
import Link from 'next/link';

export default function User(data: Userinfo){
	

	return (
		<>
			<Link href="/login">log out</Link>
		    <h2>{data.username}</h2>
			<h2>{data.email}</h2>
			<h2>{data.password}</h2>
		</>
	)
}