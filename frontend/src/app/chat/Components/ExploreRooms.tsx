
import { APIs } from "../../Props/APIs"
import { useState, useEffect } from "react"
import { Get } from "../../Components/Fetch/Fetch";
import { Post } from "../../Components/Fetch/Fetch";
import '../../assest/Components.css';
import '../../assest/chatComponents.css';
import Image from 'next/image';
import avatar from '../../../../public/avatar.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeLowVision, faEye , faLock , faLockOpen} from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';






export default function ExploreRooms({ close }: { close: any }) {

	const [data, setData] = useState({} as any);
	const [search, setSearch] = useState(null) as any;
	const [roomSelected, setRoomSelected] = useState({} as any);
	const [refresh, setRefresh] = useState(false);

	function JoinGroup({ Room }: { Room: any }) {

		let res: any;
		const [view, setView] = useState(false);
		const [password, setPassword] = useState("");

		async function SubmitHandler(e: any) {
			if (e.type == "keydown" && e.key != "Enter")
				return;
			e.preventDefault();
			res = await Post({ id: Room?.id, password: password }, APIs.JoinProtectedRoom);
			if (res?.status == 201) {
				swal("Joined", "", "success");
				setRoomSelected({});
				setRefresh(!refresh);
			}
			else {
				swal("Wrong Password", "", "error");
			}
			setPassword("");
		}

		async function Join() {
			res = await Post({ id: Room?.id }, APIs.JoinRoom);
			setRefresh(!refresh);
			setRoomSelected({});

		}

		if (Room?.privacy == "PUBLIC") {
			Join();
			return null;
		}
		return (<>
			<div className="Join">
				<form className="PassWord" onSubmit={SubmitHandler}>
					<button onClick={() => setRoomSelected({})} className='closeBtn'><div></div></button>
					<label>Enter Password To Join {Room?.name} group</label>
					<div className="input">
						<input type={view ? "text" : "password"} value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} onKeyDown={SubmitHandler}/>
						{!view ? <FontAwesomeIcon icon={faEyeLowVision} onClick={() => setView(!view)} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faEye} onClick={() => setView(!view)} style={{ cursor: "pointer" }} />}
					</div>
					<button type="submit">Join</button>
				</form>
			</div>
		</>)
	}



	async function getRooms() {
		const data = await Get(APIs.Groups);
		setData(data);
		if (search != null) {
			const filter = data?.rooms?.filter((room: any) => {
				return room?.name?.toLowerCase().includes(search?.toLowerCase());
			})
			setData({ rooms: filter });
		}
	}

	useEffect(() => {
		getRooms();
	}, [refresh, search]);



	function Print(users: any) {
		const user = users?.users;
	
		const print = <>
			<div className={"user"}>
				<Image className="g_img" src={user?.photo ? user?.photo : avatar} priority={true} alt="img" width={45} height={45} />
				<h3>{user?.name}</h3>
				{user?.privacy == "PROTECTED" ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />}
				<button className='UseraddBtn' onClick={() => setRoomSelected(user)}>JOIN</button>
			</div>
		</>
		return <div>{print}</div>
	}



	return (
		<>
			<div className="JoinRoom">

				<div className="Add">
					<h1>Explore Groups</h1>
					<input type="text" className='searchInput' placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
					<button onClick={() => close(false)} className='closeBtn'><div></div></button>
					<div className="content">
						{roomSelected?.name ? <JoinGroup Room={roomSelected} /> :
							data?.rooms?.map((room: any, index: number) => (<Print key={index} users={room} />))}
					</div>
				</div>
			</div>
		</>
	)
}