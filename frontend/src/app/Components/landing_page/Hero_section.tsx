import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import Paddle from "../../../../public/paddle.png"
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
                typeSpeed: 80,
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
            <div className=" flex w-full h-[40rem]  ">
                <div className="w-full h-full">

                    <div className="relative w-[40%] h-[30%] mt-40 overflow-y-auto left-20 justify-center text-4xl font-bold bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 inline-block text-pretty text-transparent bg-clip-text">
                        {typing()}
                    </div>
                    <div className="absolute  mt-40   h-fit">
                        <div className=" relative left-20  items-center" >
                            <button className="w-[250px] h-[50px] bg-gradient-to-b from-red-800 to-red-400 rounded-lg ">PLAY NOW</button>
                        </div>
                    </div>
                </div>

                <div className="  flex h-[30rem] w-[50%] absolute right-24 rounded-lg  ">

                    <div className="animate-bounce ml-32 mt-18">
                        <div className="absolute  w-11 h-11  animate-spin duration-75 shadow-2xl ml-64 mt-36  rounded-full bg-gradient-to-r from-slate-100 to-gray-700">
                        </div>
                    </div>
                    <Image className="w-[20rem] h-[20rem] m-auto mt-32 " id="bg1" alt="bg1" src={Paddle}  ></Image>
                </div>

            </div>
        </>
    );
}
