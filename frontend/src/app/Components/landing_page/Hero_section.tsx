import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import Paddle from "../../../../public/paddle.png"
import { useRef, useEffect } from "react";
import Typed from "typed.js";
import cover from "../../../../public/pingpong.gif"
import "../../assest/corner.css"


export default function Hero_section({ setSignIn }: { setSignIn: any }) {

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

            <div className=" flex w-[50%] h-[40rem] bg-[#e7ebf4] rounded-b-3xl  ">
                <div className="w-full h-full">

                    <div className="relative w-[90%] h-[30%] mt-24 overflow-y-auto left-5 justify-center text-4xl font-bold bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 inline-block text-pretty text-transparent bg-clip-text">
                        {typing()}
                    </div>
                    <div className="absolute  mt-16  h-fit">
                        <div className=" relative left-20  items-center" >
                            <button className="w-[250px] h-[50px] bg-[#000000] rounded-lg font-bold text-xl " onClick={() => setSignIn(true)}>SIGN IN</button>
                        </div>
                    </div>
                </div>


            </div>
                <div className= "flex  h-[24rem] w-[43%] m-12 mr-2 items-center justify-center  overflow-hidden rounded-3xl ">
                    <Image className="  " id="bg1" alt="bg1" priority={true} src={cover} ></Image>
                    <div className="absolute  ">
                        <div className="  relative left-64 -top-64  "></div>
                    </div>
                </div>
        </div>
        </>
    );
}
