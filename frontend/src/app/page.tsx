// "use client"
import React from 'react';
import Image from 'next/image';
import Login from './login/page';
import './login/login.css'
import Link from 'next/link';



export default function Home() {
	return (
		<>
			<React.StrictMode>
				<h1 className='Ping'>Ping Pong</h1>
				<p>welcome <Link href="/login"> sign in</Link> </p>
	
				{/* <Login /> */}
			</React.StrictMode>
		</>
	)
}
