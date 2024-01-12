
import logo from "../../../../public/logo.png"
import Image from "next/image";
import Link from "next/link";


export default function Landing_navbar() {
    return (
        <>
            <header className="font-inter  flex h-[80px] w-full bg-[#e7ebf4] items-center justify-between rounded-r-2xl rounded-tl-2xl" >
                <div className="flex ml-20 items-center justify-center ">
                <Image src={logo.src} alt={"logo"} priority={true} width={160} height={54}  style={{ filter: 'invert(100%)'}}></Image>
                </div >

                <div className="flex mr-20 text-black font-bold ">
                    <Link href="/create" className="mr-5 bg-slate-900 text-white  font-bold p-3 rounded-lg ">SIGN UP</Link>
                    
                </div>
            </header>
        </>
    );
}