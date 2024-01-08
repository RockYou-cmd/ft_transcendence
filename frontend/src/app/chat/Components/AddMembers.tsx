
import { Post, Get } from "@/app/Components/Fetch/Fetch"
import Add from "./Add"
import { APIs } from "@/app/Props/APIs"
import { useState, useEffect } from "react";
import { useSocket } from "@/app/Components/Log/LogContext";



export default function AddMembers({ group, close }: { group: any, close: any }) {

	const [data, setData] = useState({} as any);
	const [refresh, setRefresh] = useState(false);
	const { socket } = useSocket();

	async function getUsers() {
		const data = await Get(APIs.addNewMembers + group?.id);
		setData(data);
	}


	useEffect(() => {
		getUsers();
	}, [refresh]);



	async function AddMem(User: any) {
		await Post({ id: group.id, username: User?.username }, APIs.addMember);
		socket?.emit("update", {type : "friendship",  option : "joinGroup" , groupId : group?.id , receiver : User?.username});
		setRefresh(!refresh);
	}
	return (
		<>
			<Add Users={data?.users} Make={AddMem} title="Add Members" join="ADD" close={close} id={group} refresh={refresh} setRefresh={setRefresh} />
		</>
	)

}