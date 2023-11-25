import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import BG1 from "../../../../public/bg1.png"
// #4660A4, #0C0B38

export default function Hero_section() {
    return (
        <>
        <div className="flex justify-between w-full h-full bg-gradient-to-b from-blue-700 to-indigo-60">
            <div className="h-screen w-[50%]" >
                <button className="w-[250px] h-[50px] bg-gradient-to-b from-red-800 to-red-400 rounded-lg hover:">PLAY NOW</button>
            </div>
            <div className="flex m-7 rounded-lg  overflow-hidden  duration-700 blur-sm hover:blur-none hover:skew-y-6 skew-y-0 ease-in-out">
                <Image id="bg1" alt="bg1" src={BG1}  height={100} width={100}></Image>
            </div>
        </div>
        </>
    );
}
