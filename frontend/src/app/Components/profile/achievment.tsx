import { useEffect , useState} from "react"
import achiev1 from "../../../../public/sprites/achievment_icons-01.png"
import achiev2 from "../../../../public/sprites/achievment_icons-03.png"
import achiev3 from "../../../../public/sprites/achievment_icons-04.png"
import achiev4 from "../../../../public/sprites/achievment_icons-06.png"
import achiev5 from "../../../../public/sprites/achievment_icons-08.png"
import Image from "next/image"

interface achievmentProps {
    gamesPlayed?: string;
    wins?: string;
    losses?: string;
    winRate?: number;
    goalScored?: string;
    goalConced?: string;
}

const Achievment: React.FC<achievmentProps> = ({ gamesPlayed, goalScored, winRate, goalConced }) => {
   const [risingStar, setRisingStar] = useState(false);
   const [goalMachine, setGoalMachine] = useState(false);
   const [wallOfSteel, setWallOfSteel] = useState(false);
   const [undisputed, setUndisputed] = useState(false);


	useEffect(() => {
		console.log("achievment", gamesPlayed, goalScored, winRate, goalConced);
		if (Number(gamesPlayed) >= 3)
			setRisingStar(true);
		if (Number(goalScored) >= 20)
			setGoalMachine(true);
		if ((Number(goalConced) / Number(goalScored)) >= 25)
			setWallOfSteel(true);
		if (Number(winRate) >= 80)
			setUndisputed(true);
	},[gamesPlayed, goalScored, winRate, goalConced])
    //  Rising Star: Bright Start
    //  Goal Machine: ⚽️ Scoring Spree
    //  Wall of Steel: ️ Defensive Wall
    //  Undisputed Champion: Top Dog

    return (
        <>
            <div className="flex flex-col  w-full ">
                <div className=" w-full flex border my-2 rounded-xl items-center">
                    {risingStar &&
                        <>
                            <Image className="aspect-square"  src={achiev1} alt="achiev1" priority={true} width={80} height={80} />
                            <div className="m-3">
                                <h1 className=" font-bold text-xl">RISING STAR</h1>
                                <p>Played more than 3 gmaes</p>
                            </div>
                        </>
                    }
                </div>

                <div className=" w-full flex border my-2 rounded-xl items-center">
                    {goalMachine &&
                        <>
                            <Image className="aspect-square"  src={achiev2} alt="achiev1" priority={true} width={80} height={80} />
                            <div className="m-3">
                                <h1 className=" font-bold text-xl">GOAL MACHINE</h1>
                                <p>Scored over 20 goals</p>
                            </div>
                        </>
                    }
                </div>
                <div className=" w-full flex border my-2 rounded-xl items-center">
                    {goalMachine &&
                        <>
                            <Image className="aspect-square"  src={achiev3} alt="achiev1" priority={true} width={80} height={80} />
                            <div className="m-3">
                                <h1 className=" font-bold text-xl">WALL OF STEEL</h1>
                                <p>Get less than 25% conceded on you </p>
                            </div>
                        </>
                    }
                </div>
                <div className=" w-full flex border my-2 rounded-xl items-center">
                    {goalMachine &&
                        <>
                            <Image className="aspect-square"  src={achiev4} alt="achiev1" priority={true} width={80} height={80} />
                            <div className="m-3">
                                <h1 className=" font-bold text-xl">UNDISPUTED CHAMPION</h1>
                                <p>Win over 80% of your games</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default Achievment;