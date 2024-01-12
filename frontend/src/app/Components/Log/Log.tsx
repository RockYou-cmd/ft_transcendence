import React, { useEffect, useState } from "react";
import { GetData } from "./CheckLogin";
import { useLogContext, useSocket } from "./LogContext";
import { io, Socket } from "socket.io-client";
import Form from "../../profile/form";



export default function LoG({ page, LogIn, User , back}: { page: string, LogIn: any , User? : string, back? : any}) {

	const host = `${process.env.NEXT_PUBLIC_LOCALHOST}`;

	const { socket, setSocket } = useSocket();
	const { online, setOnline } = useLogContext();

	useEffect(() => {
		const UserProfile = User ? User : "";
		async function fetchData() {
			const data = await GetData({ Api: page, user: UserProfile }) as any;
			LogIn.waitHook.setState(true);
			if (data == undefined) {
				console.log("log", data);
				setOnline("OFF");
			}
			else {
	
				if (online != "ON"){
					setOnline("ON");
				}
				
					socket?.disconnect();
					setSocket(io(host + "/events", {
					withCredentials: true,
				}));
		
				LogIn.dataHook.setState(data);
			}

		}
		fetchData();
		
	}, []);

	if (LogIn.waitHook.state == false)
		return null;

	return (
		<>
			{online == "OFF" && LogIn.waitHook.state ? <Form back={back}/> : null}
		</>
	)


}