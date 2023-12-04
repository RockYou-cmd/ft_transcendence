
import { Post , Get} from "@/app/Components/Fetch/post"
import Add from "./Add"
import { APIs } from "@/app/Props/APIs"
import { useState, useEffect } from "react";





export default function AddMembers({ group, close}: { group: any, close: any }) {
	
	const [data, setData] = useState({} as any);
	
	async function getUsers() {
		const data = await Get(APIs.Search);
		setData(data);
		
	}

	useEffect(() => {
		getUsers();
	}, []);
	
	function AddMem(User : any){
		const res = Post({id : group.id, username : User?.username}, APIs.addMember);
	
	}
	return(
		<>
			<Add Users={data?.users} Make={AddMem} title="Add Members" join="JOIN" close={close} />
		</>
	)

}