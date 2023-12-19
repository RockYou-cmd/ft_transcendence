

import { APIs } from "@/app/Props/APIs";
import { Post } from "./Fetch";
import { Put } from "./Fetch";
import { useMe, useSocket } from "../Log/LogContext";




export  async function  Make({ option, group, person , socket , me}: { option: string, group: any, person: string, socket? : any , me? : any}) {
	
	const data = { id: group?.id, username: person };
	let Api = "";
	let put = false;

	if (option == "Kick") {
		put = false;
		Api = APIs.Kick;
	}
	else if (option == "Ban") {
		put = true;
		Api = APIs.Ban;
	}
	else if (option == "MakeAdmin") {
		put = true;
		Api = APIs.MakeAdmin;
	}
	else if (option == "removeAdmin") {
		put = true;
		Api = APIs.RemoveAdmin;
	}

	// console.log(option , group?.id , person , me?.username);
	

	let res: any;
	if (put == false)
		res = await Post(data, Api);
	else
		res = await Put(data, Api);

	if (res.ok && option == "Kick" || option == "Ban"){
		socket?.emit("update", {type : "friendship",  option : option , groupId : group?.id , receiver : person, sender : me?.username});
	}
	return res;
}

