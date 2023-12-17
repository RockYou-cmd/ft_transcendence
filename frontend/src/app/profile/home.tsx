"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Hero_section from '../Components/landing_page/Hero_section';
import Landing_navbar from '../Components/landing_page/Landing_navbar';
import ProfileCard from "../../app/Components/landing_page/profile_card"


export default function Home({setSignIn} : {setSignIn : any}) {


	return (
		<>
		<div className='felx'>
			
			{/* <h1 className='Ping'>Ping Pong</h1> */}
			<Landing_navbar/>
			<Hero_section/>
      <div className='flex justify-between mr-10 ml-10' >
        <ProfileCard imageurl={""} text={""} ></ProfileCard>
        <ProfileCard imageurl={""} text={""} ></ProfileCard>
        <ProfileCard imageurl={""} text={""} ></ProfileCard>
      </div>
			<button className='relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95">
  <span className= "w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-[#f1d5fe] rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
    <svg
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="currentColor"
      fill="none"
      class="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"
      ></path></svg
    >' onClick={()=>setSignIn(true)}>Sing In</button>
			
		</div>
		</>
	)
}