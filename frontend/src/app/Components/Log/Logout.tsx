"use client"
import React from 'react';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLogContext } from './LogContext';
import { Get } from '../Fetch/post';


export default function Logout() {
	const router = useRouter();
	const { online, setOnline } = useLogContext();
	async function logout(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setOnline("OFF");
		router.push("/");
		const res = await Get("http://localhost:3001/auth/logout");

	}

	return (
		<>
			<button id="logout" onClick={logout}>Logout</button>
		</>
	);

}

