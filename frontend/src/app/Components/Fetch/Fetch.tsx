
import swal from 'sweetalert';

export async function Post(data: object, path: string) {
	try{

		const header = {
			method: 'POST',
			credentials: 'include' as RequestCredentials,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};
		
		const res = await fetch(path, header);
		return res;
	}catch(err){
		return null;
	}
}

export async function Get(path: string) {
	try{

		const header = {
			credentials: 'include' as RequestCredentials,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const res = await fetch(path, header);
		console.log("res", res)
		if (res?.status == 401){
			return undefined;
		}
		const data = await res?.json();
		console.log("data", data)
		return data;
	}
	catch(err){
		return undefined;
	}
}


export async function GetRes(path: string) {
	try{

		const header = {
			credentials: 'include' as RequestCredentials,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const res = await fetch(path, header);
		return res;
	}catch{
		return null;
	}
}



export async function Put(data: object, path: string) {
	try{

		const header = {
			method: 'PUT',
			credentials: 'include' as RequestCredentials,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
	};
	const res = await fetch(path, header);
	return res;
	}
	catch(err){

	}
}