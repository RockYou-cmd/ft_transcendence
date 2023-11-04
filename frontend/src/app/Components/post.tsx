
export default async function Post(data : object, path : string){

	const res = await fetch(path , {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return res;
}