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
import { SendFriendRequest } from '../Settings/ChatSettings';
import Router from 'next/navigation';

export default function SearchBar({title }: { title: string }) {

	const visible = useRef(null) as any;
	const [data, setData] = useState({} as any);
	const [Style, setStyle] = useState({} as any);
	const [input, setInput] = useState("");
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
				"height": "22vh",
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
					<div className='resBar'  >
						<div className='line'></div>
						{data?.users?.map((user: any, index: number) => (
							<div className='results' key={index} onClick={()=>{}}>
								{user.photo == null ? <Image className="g_img" src={avatar} priority={true} alt="img" width={45} height={45} /> :
									<Image className="g_img" src={user?.photo} priority={true} alt="img" width={45} height={45} />}
								<span>{user.username}</span>
								<button onClick={(e : MouseEvent)=>{e.preventDefault;SendFriendRequest({user:  user.username, status :  user.status})}}>Friend request</button>
							</div>
						))}
					</div>
				</>}
			</div>
		</>
	)
}

