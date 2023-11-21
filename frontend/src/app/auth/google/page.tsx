"use client"
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { APIs } from "../../Props/APIs";
import { Get, Post } from "../../Components/post";
import Cookies from "js-cookie";
import Loading from "../../loading";
import { useRouter } from "next/navigation";

export default function Auth({ searchParam, }: { searchParam: { param: string | undefined } }) {

	const [code, setValue] = useState(null) as any;
	const [value, setCode] = useState(false);

	const search = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		setValue(search.get("code") as any);
		setCode(true);
	}, []);

	useEffect(() => {
		async function fetchToken() {
			const res = await Post({code,}, APIs.googleToken);
			const data = await res.json();
			if (res.status == 201) {
				Cookies.set('access_token', data.access_token);
				router.push("/profile");
			}
			else {
				alert(data.message);
			}
		}
		if (value && code)
			fetchToken();
	}, [value]);

	return (
		<>
			<h1>Auth</h1>
			<Loading />
		</>
	)
}