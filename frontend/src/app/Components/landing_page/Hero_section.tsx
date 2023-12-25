import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import BG1 from "../../../../public/pingpong.gif"
import { useRef, useEffect } from "react";
import Typed from "typed.js";


export default function Hero_section() {

    function typing() {
        const el = useRef(null);
        useEffect(() => {
            const typed = new Typed(el.current, {
                strings: ['Dive into PONGY Arena – the ultimate online Pong experience with seamless chat.',
                    'Challenge opponents, showcase your skills, and chat in real-time.',
                    "It's PONGY time – let the games and conversations begin!"],
                typeSpeed: 30,
                loop: true,
                backDelay: 2000,
            });
            return () => {
                typed.destroy();
            };
        }, []);

        return (
            <div>
                <span ref={el} />
            </div>
        );
    }
    return (
        <>
            <div className="flex w-full h-[40rem] ">
                <div className="w-full h-full">

                    <div className="relative w-[40%] h-[20%] mt-40 overflow-y-auto left-20 justify-center text-3xl font-bold bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 inline-block text-transparent bg-clip-text">
                        {typing()}
                    </div>
                    <div className="absolute  mt-40   h-fit">
                        <div className=" relative left-20  items-center" >
                            <button className="w-[250px] h-[50px] bg-gradient-to-b from-red-800 to-red-400 rounded-lg ">PLAY NOW</button>
                        </div>
                    </div>
                </div>

                <div className="flex h-[30rem] w-[50%] absolute right-10 rounded-lg overflow-hidden ">
                    <Image className="mix-blend-multiply " id="bg1" alt="bg1" src={BG1}  ></Image>
                    <div className="flex-row ">
                    </div>
                </div>

            </div>
        </>
    );
}
