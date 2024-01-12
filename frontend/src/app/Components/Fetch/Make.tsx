

import { APIs } from "@/app/Props/APIs";
import { Post } from "./Fetch";
import { Put } from "./Fetch";



export  async function  Make({ option, group, person , socket , me}: { option: string, group: any, person: string, socket? : any , me? : any}) {
	
	const data = { id: group?.id, username: person };
	let Api = "";
	let put = false;

	if (option == "Kick") 
		Api = APIs.Kick;
	
	else if (option == "Ban") 
		Api = APIs.Ban;
	
	else if (option == "MakeAdmin") 
		Api = APIs.MakeAdmin;
	
	else if (option == "removeAdmin") 
		Api = APIs.RemoveAdmin;
	
	else if (option == "unMute") 
		Api = APIs.unMute;
	
	if (option == "Kick")
		put = false;
	else
		put = true;
	
	let res: any;
	if (put == false)
		res = await Post(data, Api);
	else
		res = await Put(data, Api);

	if (res.ok){
		socket?.emit("update", {type : "friendship",  option : option , groupId : group?.id , receiver : person, sender : me?.username});
	}
	return res;
}

