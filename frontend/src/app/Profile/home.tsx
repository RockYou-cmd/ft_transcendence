"use client"
import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import Form from './form';
import { MouseEvent } from 'react';
import CheckLogin from '../Components/CheckLogin';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Profile from './profile';
import LoG from '../Components/Log';




export default function Home({setSignIn} : {setSignIn : any}) {



	return (
		<>
		<div>
			
			<h1 className='Ping'>Ping Pong</h1>
			<button className='bg-black text-white p-2 rounded mt-12 ml-96 flex justify-center items-center' onClick={()=>setSignIn(true)}>Sing In</button>

				{/* {!logIn  && Cookies.get("access_token") == undefined? (<>
				</>) : render}
				
				{logIn && <Profile />} */}
		</div>
		</>
	)
}