
import Add from "./Add"
import { APIs } from "../../Props/APIs"
import { useState, useEffect } from "react"
import { Get } from "../../Components/Fetch/Fetch";

export default function StartChat({ close, User }: { close: any, User: any }) {

	const [data, setData] = useState({} as any);

	async function getFriends() {
		const data = await Get(APIs.Friends);
		setData(data);
	}

	useEffect(() => {
		getFriends();
	}, []);

	// console.log("friends", data?.friends);
	return (
		<>
			<Add Users={data?.friends} Make={User} title="Start Chat" join="Start Chat" close={close} />
		</>
	)
}