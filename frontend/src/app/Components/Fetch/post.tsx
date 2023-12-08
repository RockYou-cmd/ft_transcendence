
import Cookies from 'js-cookie';
import axios from 'axios';

export async function Post(data : object, path : string){
	const header = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + Cookies.get('access_token'),
		},
		body: JSON.stringify(data),
	};
	const res = await fetch(path , header);

	return res;
}

export async function Get(path : string){
	const header = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + Cookies.get('access_token'),
		},
	}
	const res = await fetch(path, header);
	if (res.status == 401)
		return undefined;
	const data = await res.json();
	return data;

}

export async function Put(data : object, path : string){
	const header = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + Cookies.get('access_token'),
		},
		body: JSON.stringify(data),
	};
	const res = await fetch(path , header);

 return res;
}