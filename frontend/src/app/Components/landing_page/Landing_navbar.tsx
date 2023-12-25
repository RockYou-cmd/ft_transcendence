import { useEffect, useRef,useState } from "react";
import logo from "../../../../public/logo.png"
import Image from "next/image";
import Link from "next/link";
import { Inter } from 'next/font/google'


export default function Landing_navbar() {
    return (
        <>
            <header className="font-inter  flex h-[80px] w-full bg-gray-900 items-center justify-between" >
                <div className="flex ml-20 items-center justify-center h-[70px] w-[140px]">
                    <Image id="logo" src={logo} alt="logo" priority={true} width={130} height={130}></Image>
                </div >

                <div className="flex mr-20  ">
                    <Link href="#" className="mr-5">The Game</Link>
                    <Link href="#" className="mr-5">How to</Link>
                    <Link href="#" className="mr-5">Arena</Link>
                    <Link href="#" className="mr-5">Team</Link>
                    <Link href="#" className="mr-5">Contat us</Link>
                </div>
            </header>
        </>
    );
}