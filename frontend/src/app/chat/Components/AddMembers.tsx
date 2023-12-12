
import { Post, Get } from "@/app/Components/Fetch/Fetch"
import Add from "./Add"
import { APIs } from "@/app/Props/APIs"
import { useState, useEffect } from "react";





export default function AddMembers({ group, close }: { group: any, close: any }) {

	const [data, setData] = useState({} as any);
	const [refresh, setRefresh] = useState(false);

	async function getUsers() {
		const data = await Get(APIs.addNewMembers + group?.id);
		setData(data);
	}


	useEffect(() => {
		getUsers();
	}, [refresh]);


	async function AddMem(User: any) {
		await Post({ id: group.id, username: User?.username }, APIs.addMember);
		setRefresh(!refresh);
	}
	return (
		<>
			<Add Users={data?.users} Make={AddMem} title="Add Members" join="JOIN" close={close} />
		</>
	)

}