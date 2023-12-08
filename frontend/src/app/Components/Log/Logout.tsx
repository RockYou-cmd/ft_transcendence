"use client"
import React from 'react';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useLogContext } from './LogContext';

export default function Logout() {
	const router = useRouter();
	const { online, setOnline } = useLogContext();
	function logout(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setOnline("OFF");
		router.push("/");
	}

	return (
		<>
			<button id="logout" onClick={logout}>Logout</button>
		</>
	);

}

