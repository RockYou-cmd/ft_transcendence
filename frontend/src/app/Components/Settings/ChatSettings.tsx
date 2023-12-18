
import { Post, Put } from '../Fetch/Fetch';
import { APIs } from '../../Props/APIs';
import { useSocket, useMe } from '../Log/LogContext';


export async function SendFriendRequest({ username, status , socket, me}: { username: string, status: string, socket? : any, me? : any }) {

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


	const data = { username: username };

	if (status == "block")
		res = await Put(data, subApi);
	else
		res = await Post(data, subApi);

	if (res.ok){
		const msg = status == "request friend" ? "has sent a friend request" : status == "accept request" ? "has accepted your friend request" : "";
		socket?.emit("update", {type : "friendship",  content : msg , option : status , receiver: username , sender : me?.username});
	}

	if (res.status == 401)
		return undefined;

	return res;
	// return response;
}