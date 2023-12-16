

import { APIs } from "@/app/Props/APIs";
import { Post } from "./Fetch";
import { Put } from "./Fetch";




export async function Make({ option, group, person }: { option: string, group: any, person: string }) {

	const data = { id: group?.id, username: person };
	let Api = "";
	let put = false;


	if (option == "Kick") {
		put = false;
		Api = APIs.Kick;
	}
	else if (option == "Ban") {
		put = true;
		Api = APIs.Ban;
	}
	else if (option == "Mute") {
		put = true;
		Api = APIs.Mute;
	}
	else if (option == "MakeAdmin") {
		put = true;
		Api = APIs.MakeAdmin;
	}
	else if (option == "removeAdmin") {
		put = true;
		Api = APIs.RemoveAdmin;
	}


	let res: any;
	if (put == false)
		res = await Post(data, Api);
	else
		res = await Put(data, Api);

	return res;
}

