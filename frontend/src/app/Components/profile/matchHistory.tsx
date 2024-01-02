import Image from "next/image";
import avatar from "../../../../public/avatar.png"
import { Data, Match } from "./data"; // Import Match interface

interface MatchHistoryProps{
    matches: Match[];
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches }) => {
    return (
      <div>
        {Data.MatchHistory.map((match, index) => (
          <div key={index} className="flex relative my-2 w-full bg-gradient-to-b from-slate-700 via-slate-900 to-black rounded-2xl items-center justify-between overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 via-slate-700 to-black w-full flex items-center justify-start relative overflow-hidden">
              <div className="w-[60px] h-[60px] m-1 rounded-full overflow-hidden border">
                <Image src={avatar} alt={"image"} width={60} height={60} />
              </div>
              <h1 className="text-lg font-bold">{match.winner}</h1>
            </div>
            <div>
              <h1 className="font-bold text-xl border p-1 rounded-full">VS</h1>
            </div>
            <div className="bg-gradient-to-bl from-slate-900 via-slate-700 to-black  w-full flex relative items-center justify-end">
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
  

