
import {Post} from '../Fetch/post'; 
import {APIs} from '../../Props/APIs';



export  function SendFriendRequest({user, status}: {user : string, status : string}){


	// const res = await Post({user}, APIs.SendFriendRequest + user);
	
	// const response = await res.json();
	// if (res.status == 401)
	// 	return undefined;
	// return response;
	
	if (status == "friend"){
		console.log("remove friend ", user);
	}
	else if (status == "request sent"){
		console.log("cancel friend request to ", user);
	}
	else if (status == "request received"){
		console.log("accept friend request to ", user);
	}
	else
		console.log("send friend request to ", user);

	return null;
}