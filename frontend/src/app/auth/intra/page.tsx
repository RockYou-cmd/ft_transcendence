"use client"
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { APIs } from "../../Props/APIs";
import { Get, Post } from "../../Components/Fetch/post";
import Cookies from "js-cookie";
import Loading from "../../loading";
import { useRouter } from "next/navigation";
import { useLogContext, useSocket } from "../../Components/Log/LogContext";
import { io } from "socket.io-client";


export default function Auth({ searchParam, }: { searchParam: { param: string | undefined } }) {

	const { online, setOnline } = useLogContext();
	const { socket, setSocket } = useSocket();
	const host = "http://localhost:3001";
	// const host = "http://10.12.11.1:3001";
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
			const res = await Post({ code, }, APIs.intraToken);
			if (res.status == 201) {
				if (online != "ON") {
					setOnline("ON");
					router.push("/");
					setSocket(io(host + "/events", {
						withCredentials: true,
					}));
					console.log("socket created");
				}
			}
			else {
				// alert(data.message);
			}
		}
		if (value && code)
			fetchToken();
	}, [value]);

	return (
		<>
			<Loading />
		</>
	)
}