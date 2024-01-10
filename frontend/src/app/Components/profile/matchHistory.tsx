import Image from "next/image";
import avatar from "../../../../public/avatar.png"
import { useEffect, useState } from "react";
import { Get } from "../../Components/Fetch/Fetch";
import { APIs } from "../../Props/APIs";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useMe } from "../../Components/Log/LogContext";


const MatchHistory = ({page} : {page : string}) => {

	const [data, setData] = useState({} as any);
	const { me } = useMe() as any;
	const div1 = page == "Profile" ? "bg-gradient-to-b from-slate-700 via-slate-900 to-black" : "bg-gradient-to-b from-cyan-800 to-[#172554]";
	const div2 = page == "Profile" ? "bg-gradient-to-br from-slate-900 via-slate-700 to-black" : "bg-gradient-to-tl from-[#172554] via-cyan-700 to-[#172554]";
	const div3 = page == "Profile" ? "bg-gradient-to-bl from-slate-900 via-slate-700 to-black" : "bg-gradient-to-bl from-[#172554] via-cyan-700 to-[#172554]";
	async function fetchData() {
		const resData = await Get(APIs.matchHistory);
		console.log("games", resData);
		setData({games : resData});
	}
	const router = useRouter();


	useEffect(() => {
		fetchData();
	}, []);

	function seeProfile(e : MouseEvent, user : string) {
		e.preventDefault();
		if (user != me?.username)
			router.push("/users/" + user);
	}


    return (
      <div>
        {data?.games?.map((match : any, index : number) => (
          <div key={index} className={div1 +  " flex relative my-2 w-full  rounded-2xl items-center justify-between overflow-hidden"}>
            <div className={div2 + " w-full flex items-center justify-start relative overflow-hidden"}>
              <div className="w-[60px] h-[60px] m-1 rounded-full overflow-hidden border">
                <Image src={match?.participants[0]?.profile?.user?.photo ? match?.participants[0]?.profile?.user?.photo  : avatar} alt={"image"} width={60} height={60} />
              </div>
              <h1 onClick={(e : MouseEvent)=>seeProfile(e, match?.participants[0]?.profile?.userId)} className="cursor-pointer text-lg font-bold">{match?.participants[0]?.profile?.user?.username}</h1>
			  <h1 className="text-lg font-bold mr-6 ml-auto">{match?.participants[0]?.score}</h1>
            </div>
            <div>
              <h1 className="font-bold text-xl border p-1 rounded-full">VS</h1>
            </div>
            <div className={div3 + "  w-full flex relative items-center justify-end"}>
			  <h1 className="text-lg font-bold ml-6 mr-auto">{match?.participants[1]?.score}</h1>
              <h1 onClick={(e : MouseEvent)=>seeProfile(e, match?.participants[1]?.profile?.userId)} className="cursor-pointer text-lg font-bold">{match?.participants[1]?.profile?.user?.username}</h1>
              <div className="w-[60px] h-[60px] m-1 rounded-full overflow-hidden border">
                <Image src={match?.participants[1]?.profile?.user?.photo ? match?.participants[1]?.profile?.user?.photo : avatar} alt={"image"} width={60} height={60} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MatchHistory;
  

