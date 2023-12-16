
import { Post, Put } from '../Fetch/Fetch';
import { APIs } from '../../Props/APIs';



export async function SendFriendRequest({ username, status }: { username: string, status: string }) {

	let subApi = "";
	let res : any;



	if (status == "request friend")
		subApi = APIs.SendFriendRequest;
	else if (status == "cancel request")
		subApi = APIs.Remove;
	else if (status == "accept request")
		subApi = APIs.AcceptFriendRequest;
	else if (status == "remove friend")
		subApi = APIs.Remove;
	else if (status == "block")
		subApi = APIs.Block;
	else if (status == "unblock")
		subApi = APIs.Remove;

	// console.log("user", username);
	// console.log("status", status);
	// console.log("api", subApi);


	const data = { username: username };

	if (status == "block")
		res = await Put(data, subApi);
	else
		res = await Post(data, subApi);

	if (res.status == 401)
		return undefined;

	return res;
	// return response;
}