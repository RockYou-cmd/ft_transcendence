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

export default function Home({ setSignIn }: { setSignIn: any }) {

  return (
    <>
      <div className='felx bg-gradient-to-br from-black via-gray-800 to-black '>

        <Landing_navbar />
        <Hero_section />
        <button className=' cursor-pointer opacity-90 hover:opacity-100 transition-opacity w-[10rem] h-[4rem] p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] ">' onClick={() => setSignIn(true)}>Sing In</button>
        
        <div className='flex relative items-center justify-center'>
          <div className='absolute w-[92%] h-[26rem] bg-[#e7ebf4]/65 rounded-[50px] mt-8 '></div>
          <div className='flex flex-col relative items-center  justify-between   overflow-hidden w-[90%] h-[25rem] bg-[#e7ebf4]  rounded-[50px] mt-8 '>
            <div className='flex w-full relative items-center justify-center mt-4'>
              <h1 className='text-black font-bold text-2xl'>PLAY IN DIFFRENT MAPS </h1>
            </div>
            <div className='flex'>

              <div className='flex flex-col relative w-92 h-52 m-8 bg-slate-300 rounded-xl items-center overflow-hidden'>
              <h1 className='text-black font-bold text-2xl m-1'>CLASSIC MAPS</h1>
                <img src={screen1.src} alt={"screen1"} className='w-full h-full'></img>
              </div>

              <div className='flex flex-col relative w-92 h-52 m-8 items-center bg-blue-300 rounded-xl overflow-hidden'>
              <h1 className='text-white font-bold  text-2xl m-1'>SHARK MAPS</h1>
                <img src={screen2.src} alt={"screen1"} className='w-full h-full'></img>
              </div>
              <div className=' flex flex-col items-center relative w-92 h-52 m-8  bg-red-300 rounded-xl overflow-hidden'>
              <h1 className=' text-white font-bold text-2xl m-1'>SHARK MAPS</h1>
                <img src={screen3.src} alt={"screen1"} className='w-full h-full'></img>
              </div>

            </div>
          </div>
        </div>
        <div className='mt-12 mb-12'>
          <Features />
        </div>
        <div className='flex justify-center items-center mt-16'>
          <Slider />
        </div>
        <div className='flex justify-between mt-32 mb-32 mr-12 ml-12 ' >
          <ProfileCard imageurl={bboulhan} name={"BRAHIM"} title={"FULL-STACK DEV"} discription={"our versatile Full Stack Developer, seamlessly blends creativity with functionality to build robust and efficient systems. "} ></ProfileCard>
          <ProfileCard imageurl={yelqabl} name={"YOUSSEF"} title={"FRONTEND UX/UI"} discription={"our UX/UI and Frontend Developer, crafts immersive and user-friendly interfaces that elevate the overall experience."} ></ProfileCard>
          <ProfileCard imageurl={aelkorc} name={"ALAE"} title={"BACKEND DEVOPS"} discription={"our backend-DevOps Developer, powers the heart of our projects with his expertise, ensuring a solid foundation for seamless functionality."} ></ProfileCard>
        </div>
        <div className='w-[90%]'>
          <image src={contact.src} alt={"contact"} width={256} height={256} />
        <ContactForm/>
        </div>
      <div className='mt-32'>
        <Footer/>
      </div>
      </div>
    </>
  )
}