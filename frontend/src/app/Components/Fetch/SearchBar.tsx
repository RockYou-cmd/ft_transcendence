import React from 'react';
import { useState, useRef, useEffect} from 'react';
import { Get } from './Fetch';
import { APIs } from '../../Props/APIs';
import Image from 'next/image';
import avatar from '../../../../public/avatar.png';
import '../../assest/chat.css';
import '../../assest/Components.css';
import { useLogContext , useMe } from '../Log/LogContext';
import { useRouter } from 'next/navigation';

export default function SearchBar({ title }: { title: string }) {

	const visible = useRef(null) as any;
	const {me} = useMe() as any;
	const [data, setData] = useState({} as any);
	const [Style, setStyle] = useState({} as any);
	const [input, setInput] = useState("");
	const router = useRouter();
	const {setOnline } = useLogContext();


	useEffect(() => {
		function handleOutsideClick(event: any) {
			if (!visible.current.contains(event.target as Node)) {
				setInput("");
			}

		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};

	}, [])


	useEffect(() => {
		async function getData() {
			const resData = await Get(APIs.Search + input);
			if (resData == undefined) {
				setOnline("OFF");
			}
			else
				setData(resData);
		}
		if (input != "") {
			getData();
			setStyle({
				"height": "21vh",

			})
		}
		else
			setStyle({});

	}, [input]);

	function getProfile(user : any){
		setInput(""); 
		if (user.username == me.username)
			router.push("/");
		else
			router.push("/users/" + user.username);

	}



	return (
		<>
			<div id="SearchComponent" ref={visible} style={Style}>
				<input className='searchInput' value={input} onChange={(e) => { setInput(e.target.value) }} type="text" placeholder="Search" />
				{input != "" && <>
					<div className='line'></div>
					<div className='resBar'  >
						{data?.users?.map((user: any, index: number) => (
							<div className='results' key={index} onClick={() => getProfile(user)}>
								{user.photo == null ? <Image className="g_img" src={avatar} priority={true} alt="img" width={45} height={45} /> :
									<Image className="g_img" src={user?.photo} priority={true} alt="img" width={45} height={45} />}
								<span>{user.username}</span>
							</div>
						))}
					</div>
				</>}
			</div>
		</>
	)
}

