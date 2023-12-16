"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import Hero_section from '../Components/landing_page/Hero_section';
import Landing_navbar from '../Components/landing_page/Landing_navbar';


export default function Home({setSignIn} : {setSignIn : any}) {


	return (
		<>
		<div>
			
			{/* <h1 className='Ping'>Ping Pong</h1> */}
			<Landing_navbar/>
			<button className='bg-black text-white p-2 rounded mt-12 ml-96 flex justify-center items-center' onClick={()=>setSignIn(true)}>Sing In</button>
			<Hero_section/>
			
		</div>
		</>
	)
}