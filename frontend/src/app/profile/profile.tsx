"use client"

import avatar from "../../../public/avatar.png";
import { useEffect, useState , useRef } from 'react';
import Image from "next/image";
import { GetData } from '../Components/Log/CheckLogin';
import { useLogContext } from '../Components/Log/LogContext';
import '../assest/profile_grid_blur.css'
import Profile_info from "../Components/profile/profile_info";


export default function Profile({User} : {User : string}) {

	const [wait, checkwait] = useState(false);

	useEffect(() => {
		checkwait(true);
	}, []);

	if (!wait) {
		return (<div>loading...</div>)
	}

	return (
		<>
			<Profile_info />
		</>
	)
}