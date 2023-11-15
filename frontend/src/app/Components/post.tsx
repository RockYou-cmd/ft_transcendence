import Cookies from 'js-cookie';
import axios from 'axios';

export async function Post(data : object, path : string){

	const res = await fetch(path , {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Autorization': 'Bearer ' + Cookies.get('access_token'),
		},
		body: JSON.stringify(data),
	});
	return res;
}

export async function Get(path : string){
try{
	const res = await fetch(path, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Autorization': 'Bearer ' + Cookies.get('access_token'),
		},
	});
	
	// const res = await axios.get(path, {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Autorization': 'Bearer ' + Cookies.get('access_token'),
	// 	},
	// 	});
		
		
		// const data = JSON.stringify(res);
		// console.log("data", data);
		// console.log("res", res);
		// console.log("res2", res2);
		const data = await res.json();
	return data;
	// return data;
}catch(err){}
}