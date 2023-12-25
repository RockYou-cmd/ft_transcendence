"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Hero_section from '../Components/landing_page/Hero_section';
import Landing_navbar from '../Components/landing_page/Landing_navbar';
import ProfileCard from "../../app/Components/landing_page/profile_card"
import bboulhan  from "../../../public/bboulhan.jpg"
import yelqabl  from "../../../public/yel-qabl.jpg"
import aelkorc  from "../../../public/ael-korc.jpg"
import Slider from '../Components/landing_page/slider';

export default function Home({setSignIn} : {setSignIn : any}) {


  return (
    <>
      <div className='felx bg-gradient-to-br from-black via-gray-800 to-black '>

        <Landing_navbar />
        <Hero_section />
        <div className='flex justify-between mr-12 ml-12 mt-10' >
          <ProfileCard imageurl={bboulhan} name={"BRAHIM"} title={"FULL-STACK DEV"} discription={"this the disc"} ></ProfileCard>
          <ProfileCard imageurl={yelqabl} name={"YOUSSEF"} title={"FRONTEND UX/UI"} ></ProfileCard>
          <ProfileCard imageurl={aelkorc} name={"ALAE"} title={"BACKEND DEVOPS"} ></ProfileCard>
        </div>
        <div>
           <Slider/> 
        </div>
        <button className='relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity w-[10rem] h-[4rem] p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] ">' onClick={() => setSignIn(true)}>Sing In</button>
      </div>
    </>
  )
}