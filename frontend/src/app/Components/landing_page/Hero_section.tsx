import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import Paddle from "../../../../public/paddle.png"
import { useRef, useEffect } from "react";
import Typed from "typed.js";
import cover from "../../../../public/pingpong.gif"
import "../../assest/corner.css"


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
        <div className="flex relative ">

            <div className=" flex w-[50%] h-[35rem] bg-[#e7ebf4] rounded-b-3xl  ">
                <div className="w-full h-full">

                    <div className="relative w-[90%] h-[30%] mt-40 overflow-y-auto left-20 justify-center text-4xl font-bold bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 inline-block text-pretty text-transparent bg-clip-text">
                        {typing()}
                    </div>
                    <div className="absolute  mt-30   h-fit">
                        <div className=" relative left-20  items-center" >
                            <button className="w-[250px] h-[50px] bg-[#000000] rounded-lg font-bold text-xl ">PLAY NOW</button>
                        </div>
                    </div>
                </div>


            </div>
                <div className="  flex  h-[30rem] w-[50%] m-7 items-center justify-center  overflow-hidden rounded-3xl ">
                    <Image className=" rounded-2xl  " id="bg1" alt="bg1" src={cover}  ></Image>
                    <div className=" corner absolute top-0 left-[48%] "></div>
                </div>
        </div>
        </>
    );
}
