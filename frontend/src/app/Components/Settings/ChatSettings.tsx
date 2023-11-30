
import {Post} from '../Fetch/post'; 
import {APIs} from '../../Props/APIs';



export async function SendFriendRequest({user, status}: {user : string, status : string}){

	let subApi = "";




	if (status == "request friend")
		subApi = "send";
	else if (status == "cancel request")
		subApi = "cancel";
	else if (status == "accept request")
		subApi = "accept";
	else if (status == "remove friend")
		subApi = "remove";
	else if (status == "block")
		subApi = "block";
	else if (status == "unblock")
		subApi = "unblock";
	
	
	
	
	
	const res = await Post({user}, APIs.SendFriendRequest + "/" + subApi);
	
	const response = await res.json();
	
	if (res.status == 401)
		return undefined;
	
	return response;
}