import Image from "next/image";
import avatar from "../../../../public/avatar.png"
import { Data, Match } from "./data"; // Import Match interface
import { useEffect, useState } from "react";
import { Get } from "../../Components/Fetch/Fetch";
import { APIs } from "../../Props/APIs";



const MatchHistory = ({page} : {page : string}) => {

	const [data, setData] = useState({} as any);
	const div1 = page == "Profile" ? "bg-gradient-to-b from-slate-700 via-slate-900 to-black" : "";
	const div2 = page == "Profile" ? "bg-gradient-to-br from-slate-900 via-slate-700 to-black" : "";
	const div3 = page == "Profile" ? "bg-gradient-to-bl from-slate-900 via-slate-700 to-black" : "";
	async function fetchData() {
		const resData = await Get(APIs.matchHistory);
		console.log("match history", resData);
		setData(resData);
	}

	useEffect(() => {
		fetchData();
	}, []);

    return (
      <div>
        {Data.MatchHistory.map((match, index) => (
          <div key={index} className={div1 +  " flex relative my-2 w-full  rounded-2xl items-center justify-between overflow-hidden"}>
            <div className={div2 + " w-full flex items-center justify-start relative overflow-hidden"}>
              <div className="w-[60px] h-[60px] m-1 rounded-full overflow-hidden border">
                <Image src={avatar} alt={"image"} width={60} height={60} />
              </div>
              <h1 className="text-lg font-bold">{match.winner}</h1>
            </div>
            <div>
              <h1 className="font-bold text-xl border p-1 rounded-full">VS</h1>
            </div>
            <div className={div3 + "  w-full flex relative items-center justify-end"}>
              <h1 className="text-lg font-bold">{match.loser}</h1>
              <div className="w-[60px] h-[60px] m-1 rounded-full overflow-hidden border">
                <Image src={avatar} alt={"image"} width={60} height={60} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MatchHistory;
  

