"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Hero_section from '../Components/landing_page/Hero_section';
import Landing_navbar from '../Components/landing_page/Landing_navbar';
import ProfileCard from "../../app/Components/landing_page/profile_card"
import bboulhan from "../../../public/bboulhan.jpg"
import yelqabl from "../../../public/yel-qabl.jpg"
import aelkorc from "../../../public/ael-korc.jpg"
import Slider from '../Components/landing_page/slider';
import Features from "../Components/landing_page/features"
import ContactForm from "../Components/landing_page/contactForm"
import Footer from '../Components/landing_page/footer';
import contact from "../../../public/contact.jpg"
import screen1 from "../../../public/screen1.png"
import screen2 from "../../../public/screen2.png"
import screen3 from "../../../public/screen3.png"
import "../assest/mapBorder.css"
import GameDemo from  './gameDemo'

export default function Home({ setSignIn }: { setSignIn: any }) {

	return (
		<>
			<div className='felx h- bg-gradient-to-br from-black via-gray-800 to-black p-8'>
				<div className='mx-8 w-[95%]'>
					<div >
						<Landing_navbar />
					</div>
					<Hero_section setSignIn={setSignIn}/>
					<div className='flex relative mt-32 bg-green-500'>
						<div className='w-[48%] rounded-xl m-4 bg-red-500'>
							<GameDemo gameSettings={{map : "shark", ballColor : "white" , paddleColor : "white"}} />
						</div>
						<div className='flex relative items-center w-[48%] justify-center'>
							<div className='absolute w-[92%] h-[26rem] bg-[#e7ebf4]/65 rounded-[50px]  '></div>
							<div className='flex flex-col relative items-center  justify-between my-8  overflow-hidden w-[90%] h-[25rem] bg-[#e7ebf4]  rounded-[50px]  '>
								<div className='flex w-full relative items-center justify-center mt-4'>
									<h1 className='text-black font-bold text-2xl'>PLAY IN DIFFRENT MAPS </h1>
								</div>
								<div className='flex'>
									<div className='  flex flex-col relative w-92 h-52 m-8 items-center bg-slate-300 rounded-xl overflow-hidden'>
										<h1 className='text-black font-bold text-2xl m-1'>CLASSIC MAP</h1>
										<img src={screen1.src} alt={"screen1"} className='w-full h-full'></img>
									</div>

									<div className='flex flex-col relative w-92 h-52 m-8 items-center bg-blue-300 rounded-xl overflow-hidden'>
										<h1 className='text-white font-bold  text-2xl m-1'>SHARK MAP</h1>
										<img src={screen2.src} alt={"screen1"} className='w-full h-full'></img>
									</div>
									<div className=' flex flex-col items-center relative w-92 h-52 m-8  bg-red-300 rounded-xl overflow-hidden'>
										<h1 className=' text-white font-bold text-2xl m-1'>DRAGON MAP</h1>
										<img src={screen3.src} alt={"screen1"} className='w-full h-full'></img>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <div className='flex flex-col items-center my-16 bg-[#e7ebf4]  w-full rounded-[30px] p-12 overflow-hidden'>
						<h1 className='text-center top-0  font-bold text-white text-2xl mb-8 rounded-b-xl bg-black w-fit p-2'>PLATFORM FEATURES</h1>
						<Features />
					</div> */}

					{/* <div className='flex justify-center items-center mt-16'>
          <Slider />
        </div>

					{/* <div className='flex justify-center'>
					</div>
					<div className='flex  flex-col justify-between  bg-[#e7ebf4] rounded-3xl p-7 mt-16 mb-16 overflow-hidden' >
						<h1 className='  items-center font-bold text-2xl bg-slate-400 w-fit rounded-[30px] text-center p-4 '>MEET THE TEAM</h1>
						<div className='flex flex-col items-center '>
							<h2 className='font-bold m-7 text-black text-lg'>At PONGY, we are a dynamic trio of passionate developers, each bringing a unique set of skills to the table.</h2>
						</div>
						<div className='flex justify-between w-full'>
							<ProfileCard imageurl={bboulhan} name={"BRAHIM"} title={"FULL-STACK DEV"} discription={"our versatile Full Stack Developer, seamlessly blends creativity with functionality to build robust and efficient systems. "} ></ProfileCard>
							<ProfileCard imageurl={yelqabl} name={"YOUSSEF"} title={"FRONTEND UX/UI"} discription={"our UX/UI and Frontend Developer, crafts immersive and user-friendly interfaces that elevate the overall experience."} ></ProfileCard>
							<ProfileCard imageurl={aelkorc} name={"ALAE"} title={"BACKEND DEVOPS"} discription={"our backend-DevOps Developer, powers the heart of our projects with his expertise, ensuring a solid foundation for seamless functionality."} ></ProfileCard>
						</div>
					</div>
					<div className=' flex h-fit'>
						<div className=' h-full rounded-l-2xl overflow-hidden'>
						<Image src={contact.src} priority={true} alt={"contact"} width={750} height={512} />
						</div>
						<ContactForm />
					</div>
					<div className='mt-32'>
						<Footer />
					</div>
				</div>  */}
			</div>
			</div>
		</>
	)
}