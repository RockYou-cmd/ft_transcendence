"use client"
import React from 'react';
import { MouseEvent } from 'react';
// import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function Logout() {
	const router = useRouter();

	function logout(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		Cookies.remove('access_token');
		router.push("/");
		router.refresh();
	}

	return (
		<>
			<button id="logout" onClick={logout}>Logout</button>
		</>
	);

}

