import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import BG1 from "../../../../public/image_processing20210831-17741-n4ldfo.gif"
import { useEffect } from "react";
// #4660A4, #0C0B38

export default function Hero_section() {
    


    return (
        <>
        <div className="flex w-full h-[40rem] bg-gradient-to-b from-white to-indigo-60">
            <div className="typewriter felx flex-row h-[100vh]">
            <div className="font-bold text-xl w-[60%] items-center m-24">
                <h1>Dive into PONGY Arena – the ultimate online Pong experience with seamless chat.</h1>
                <h1>Challenge opponents, showcase your skills, and chat in real-time. </h1>
                <h1>It's PONGY time – let the games and conversations begin!</h1>
            </div>
            <div className=" w-[50%]" >
                <button className="w-[250px] h-[50px] bg-gradient-to-b from-red-800 to-red-400 rounded-lg hover:">PLAY NOW</button>
            </div>
            </div>
            <div className="flex h-[30rem]  rounded-lg overflow-hidden ">
                <Image className="mix-blend-multiply " id="bg1" alt="bg1" src={BG1}  ></Image>
                <div className="flex-row ">
                </div>
            </div>

        </div>
        </>
    );
}
