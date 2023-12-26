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

export default function Home({ setSignIn }: { setSignIn: any }) {

  return (
    <>
      <div className='felx bg-gradient-to-br from-black via-gray-800 to-black '>

        <Landing_navbar />
        <Hero_section />
        <button className=' cursor-pointer opacity-90 hover:opacity-100 transition-opacity w-[10rem] h-[4rem] p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] ">' onClick={() => setSignIn(true)}>Sing In</button>
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