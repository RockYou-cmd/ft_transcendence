import { Brygada_1918 } from "next/font/google";
import Image from "next/image";
import BG1 from "../../../../public/bg1.png"
import { useEffect } from "react";
// #4660A4, #0C0B38

export default function Hero_section() {
    const words = ["Dive into PONGY Arena – the ultimate online Pong experience with seamless chat.",
                    "Challenge opponents, showcase your skills, and chat in real-time.",
                    "It's PONGY time – let the games and conversations begin!"];
    let i: number =  0;
    let j: number =  0;
    let currentWord : string = "";
    let isDeleting: boolean = false;
    
    const typing = function type() {
        currentWord = words[i];
        if (isDeleting) {
            const typewriterElement = document.getElementById("typewriter");
            if (typewriterElement) {
                typewriterElement.textContent = currentWord.substring(0, j - 1);
            }
            j--;
            if (j === 0) {
                isDeleting = false;
                i++;
                if (i === words.length) {
                    i = 0;
                }
            }
        }
        else {
            const typewriterElement = document.getElementById("typewriter");
            if (typewriterElement) {
                typewriterElement.textContent = currentWord.substring(0, j + 1);
            }
            j++;
            if (j === currentWord.length) {
                isDeleting = true;
            }
        }
        setTimeout(type, 1000); // Call the `type` function after a delay of 1000 milliseconds (1 second)
    }

    return (
        <>
        <div className="flex w-full h-screen bg-gradient-to-b from-blue-700 to-indigo-60">
            <div className="typewriter felx flex-row h-[100vh]">

            <div className="font-bold text-xl w-[60%] items-center m-24">

            </div>
            <div className=" w-[50%]" >
                <button className="w-[250px] h-[50px] bg-gradient-to-b from-red-800 to-red-400 rounded-lg hover:">PLAY NOW</button>
            </div>
            </div>
            <div className="flex h-[40rem] w-[40rem] rounded-lg overflow-hidden  duration-700 blur-sm hover:blur-none hover:skew-y-6 skew-y-0 ease-in-out">
                <Image id="bg1" alt="bg1" src={BG1}  ></Image>
            </div>
        </div>
        </>
    );
}
