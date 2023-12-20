
import Cookies from 'js-cookie';
import axios from 'axios';

export async function Post(data : object, path : string){
	const header = {
		method: 'POST',
		credentials: 'include' as RequestCredentials,
		headers: {
			'Content-Type': 'application/json',
			// 'authorization': 'Bearer ' + Cookies.get('access_token'),
		},
		body: JSON.stringify(data),
	};

	const res = await fetch(path , header);
	// try{
	// 	const res = await axios.post(path, data, {withCredentials: true});
	// 	return res;

	// }catch(err){
	// 	alert(err);
	// }
	return res;
}

export async function Get(path : string){
	const header = {
		credentials: 'include' as RequestCredentials,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const res = await fetch(path, header);
	if (res.status == 401)
		return undefined;
	const data = await res.json();
	return data;
}


export async function GetRes(path : string){
	const header = {
		credentials: 'include' as RequestCredentials,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const res = await fetch(path, header);
	return res;
}



export async function Put(data : object, path : string){
	const header = {
		method: 'PUT',
		credentials: 'include' as RequestCredentials,
		headers: {
			'Content-Type': 'application/json',
			// 'authorization': 'Bearer ' + Cookies.get('access_token'),
		},
		body: JSON.stringify(data),
	};
	const res = await fetch(path , header);
	return res;
}