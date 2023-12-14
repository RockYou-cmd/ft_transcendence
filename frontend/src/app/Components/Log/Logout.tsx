"use client"
import React from 'react';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLogContext } from './LogContext';
import { Get } from '../Fetch/Fetch';
import { APIs } from '@/app/Props/APIs';


export default function Logout() {
	const router = useRouter();
	const { online, setOnline } = useLogContext();
	async function logout(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const res = await fetch(APIs.Logout, {
			credentials: 'include' as RequestCredentials,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res?.status == 200) {
			setOnline("OFF");
			router.push("/");
		}
	}

	return (
		<>
			<button id="logout" onClick={logout}>Logout</button>
		</>
	);

}

