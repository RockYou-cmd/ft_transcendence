
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
		if (res?.status == 401 || res?.status == 403){
			return undefined;
		}
		const data = await res?.json();
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