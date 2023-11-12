

import { cookies} from 'next/headers';

export default function GetCookie(){
	const myCookie = cookies();
	const hasCookie = myCookie.get("username");
	console.log(hasCookie);
	if (hasCookie != undefined){
		if (hasCookie.value !== "")
			return true;
	}
	return false;
}

// export async function createCookie(){
// 	cookies().set('name', 'user')
// }