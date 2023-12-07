
import Add from "./Add"
import { APIs } from "../../Props/APIs"
import { useState, useEffect } from "react"
import { Get } from "../../Components/Fetch/post";

export default function StartChat({close, User} : {close: any, User : any}) {

	const [data, setData] = useState({} as any);

	async function getFriends(){
		const data = await Get(APIs.Friends + "false");
		setData(data);
	}

	useEffect(() => {
		getFriends();
	}, []);

	


	return(
		<>
			<Add Users={data?.friends} Make={User} title="Start Chat" join="StartChat" close={close}/>
		</>
	)
}