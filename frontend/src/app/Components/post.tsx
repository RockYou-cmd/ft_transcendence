
import Cookies from 'js-cookie';


export async function Post(data : object, path : string){

	const res = await fetch(path , {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Autorization': 'Bearer ' + Cookies.get('access_token'),
		},
		body: JSON.stringify(data),
	});
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

	let res = await fetch(path, header);
	// const res = await axios.get(path, {
		// 	headers: {
			// 		'Content-Type': 'application/json',
			// 		'Autorization': 'Bearer ' + Cookies.get('access_token'),
			// 	},
			// 	});
	// const data = JSON.stringify(res);
	
	
	if (res.status == 401)
		return undefined;
	else if (res.status != 200)
		res = await fetch(path, header);
	const data = await res.json();
	return data;

}