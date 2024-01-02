"use client"
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { APIs } from "../../Props/APIs";
import { Get, Post } from "../../Components/Fetch/Fetch";
import Loading from "../../loading";
import { useRouter } from "next/navigation";
import { useLogContext, useSocket } from "../../Components/Log/LogContext";
import Form from "@/app/profile/form";
import swal from "sweetalert";


export default function Auth({ searchParam, }: { searchParam: { param: string | undefined } }) {

	const { online, setOnline } = useLogContext();
	const [TwoEA, setTwoEA] = useState(false);
	const [User, setUser] = useState("");

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
			const res = await Post({ code, }, APIs.googleToken);
			const data = await res.json();
			if (res.status == 201) {

				if (online != "ON") {
					setOnline("ON");
					if (data?.new == 1)
						router.push("/setting");
					else
						router.push("/");

				}
			}
			else if (res?.status == 425){
				setTwoEA(true);
				setUser(data?.username?.username);
			}
			else {
				swal(data.message, "", "error");
			}
		}
		if (value && code)
			fetchToken();
	}, [value]);

	return (
		<>
			{!TwoEA ? <Loading />
			: <Form TwoEA={TwoEA} User={User}/>	
		}
		</>
	)
}