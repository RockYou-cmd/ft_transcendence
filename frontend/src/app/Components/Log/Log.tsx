import React, { useEffect, useState } from "react";
import { GetData } from "./CheckLogin";
import { useLogContext, useSocket } from "./LogContext";
import { io } from "socket.io-client";
import Form from "../../profile/form";




export default function LoG({ page, LogIn }: { page: string, LogIn: any }) {

	const host = "http://localhost:3001";
	const { socket, setSocket } = useSocket();
	const { online, setOnline } = useLogContext();

	useEffect(() => {
		async function fetchData() {
			const data = await GetData({ Api: page, user: "" }) as any;
			LogIn.waitHook.setState(true);
			if (data == undefined) {
				setOnline("OFF");
			}
			else {
				if (online != "ON") {
					setOnline("ON");
					setSocket(io(host + "/events", {
						withCredentials: true,
					}));
					console.log("socket created");
				}

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