"use client"
import React from 'react';
import { MouseEvent } from 'react';
// import { cookies } from 'next/headers';
import { useRouter} from 'next/navigation';

export default function Logout() {
	const router = useRouter();

	function logout(e : MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		router.push("/login");
	}

	return(
		<>
			<button id="logout" onClick={logout}>Logout</button>
		</>
	);

}

