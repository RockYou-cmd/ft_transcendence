import React from 'react';
import { useState, useRef, useEffect, use } from 'react';
import { MouseEvent } from 'react';
import { KeyboardEvent } from 'react';
import { Get } from './post';
import { APIs } from '../../Props/APIs';
import Image from 'next/image';
import avatar from '../../../../public/avatar.png';
import '../../assest/chat.css';
import '../../assest/Components.css';
import { useLogContext } from '../Log/LogContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function SearchBar({title }: { title: string }) {

	const visible = useRef(null) as any;
	const [data, setData] = useState({} as any);
	const [Style, setStyle] = useState({} as any);
	const [input, setInput] = useState("");
	const router = useRouter();
	const { online, setOnline } = useLogContext();


	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
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
				Cookies.remove('access_token');
			}
			else
				setData(resData);
		}
		if (input != "") {
			getData();
			setStyle({
				"height": "21vh",
				// "padding-bottom": "15px",
				// "padding" : "0px 0px 20px",
				// "width" : "70%",
			})
		}
		else
			setStyle({});

	}, [input]);




	return (
		<>
			<div id="SearchComponent" ref={visible} style={Style}>
				<input className='searchInput' onChange={(e) => { setInput(e.target.value) }} type="text" placeholder="Search" />
				{input != "" && <>
					<div className='line'></div>
					<div className='resBar'  >
						{data?.users?.map((user: any, index: number) => (
							<div className='results' key={index} onClick={()=>{setInput("");router.push("/users/" + user.username)}}>
								{user.photo == null ? <Image className="g_img" src={avatar} priority={true} alt="img" width={45} height={45} /> :
									<Image className="g_img" src={user?.photo} priority={true} alt="img" width={45} height={45} />}
								<span>{user.username}</span>
								<span>Rank</span>
							</div>
						))}
					</div>
				</>}
			</div>
		</>
	)
}

