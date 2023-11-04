

export interface Userinfo {
	username: string;
	password: string;
	email: string;
}

export default async function GetData(path: string) {
	const res = await fetch(path);
	// const info = await res.json();

	return res;
}