import React, { useEffect, useState } from "react";
import { GetData } from "./CheckLogin";
import { useLogContext, useSocket } from "./LogContext";
import { io, Socket } from "socket.io-client";
import Form from "../../profile/form";



export default function LoG({ page, LogIn, User }: { page: string, LogIn: any , User? : string}) {

	const host = "http://localhost:3001";

	const { socket, setSocket } = useSocket();
	const { online, setOnline } = useLogContext();
	
	useEffect(() => {
		const UserProfile = User ? User : "";
		async function fetchData() {
			const data = await GetData({ Api: page, user: UserProfile }) as any;

			LogIn.waitHook.setState(true);
			if (data == undefined) {
				setOnline("OFF");
			}
			else {
					if (online == "ON"){
						socket?.disconnect();
						setSocket(io(host + "/events", {
							withCredentials: true,
						}));
						console.log("socket created");
					}
					setOnline("ON");
			}

		}
		fetchData();
	
	}, [online]);

	if (LogIn.waitHook.state == false)
		return null;

	return (
		<>
			{online == "OFF" && LogIn.waitHook.state ? <Form /> : null}
		</>
	)


}