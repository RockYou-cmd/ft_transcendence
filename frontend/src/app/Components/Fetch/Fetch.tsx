
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
		swal("Error", "", "error");
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
		// console.log("path", path)
		const res = await fetch(path, header);
		if (!res?.ok){
			return undefined;
		}
		const data = await res?.json();
		return data;
	}
	catch(err){
		// console.log("err", err);
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