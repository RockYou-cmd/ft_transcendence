
import Add from "./Add"
import { APIs } from "../../Props/APIs"
import { useState, useEffect } from "react"
import { friends } from "../page";
import { Get } from "../../Components/Fetch/post";

export function SendFirstMsg(){

}


export default function StartChat({close, User} : {close: any, User : any}) {

	const [data, setData] = useState({} as any);

	async function getFriends(){
		const data = await Get(APIs.Friends);
		setData(data);
	}

	useEffect(() => {
		getFriends();
	}, []);



	return(
		<>
			<Add Users={friends} Make={User} title="Start new chat" join="StartChat" exploreG={close}/>
		</>
	)
}