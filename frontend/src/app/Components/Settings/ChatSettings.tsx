
import { Post } from '../Fetch/Fetch';
import { APIs } from '../../Props/APIs';



export async function SendFriendRequest({ username, status }: { username: string, status: string }) {

	let subApi = "";




	if (status == "request friend")
		subApi = APIs.SendFriendRequest + "send";
	else if (status == "cancel request")
		subApi = APIs.Remove;
	else if (status == "accept request")
		subApi = APIs.SendFriendRequest + "accept";
	else if (status == "remove friend")
		subApi = APIs.Remove;
	else if (status == "block")
		subApi = "block";
	else if (status == "unblock")
		subApi = "unblock";

	// console.log("user", username);
	// console.log("status", status);
	// console.log("api", subApi);


	const data = { username: username };

	const res = await Post(data, subApi);

	if (res.status == 401)
		return undefined;

	return res;
	// return response;
}