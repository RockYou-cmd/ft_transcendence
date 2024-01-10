
import { APIs } from "../../Props/APIs";
import { Get } from "../Fetch/Fetch";

export async function GetData({ Api, user }: { Api: string, user: string }) {

	let data: any;


	if (Api == "User")
		data = await Get(APIs.User + user);
	else if (Api == "Profile")
		data = await Get(APIs.Profile);
	else if (Api == "Navbar")
		data = await Get(APIs.Navbar);
	return data;
}
