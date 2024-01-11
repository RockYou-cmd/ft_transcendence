import { useEffect , useState} from "react"
import achiev1 from "../../../../public/sprites/achievment_icons-01.png"
import achiev2 from "../../../../public/sprites/achievment_icons-03.png"
import achiev3 from "../../../../public/sprites/achievment_icons-04.png"
import achiev4 from "../../../../public/sprites/achievment_icons-06.png"
import Image from "next/image"

interface achievmentProps {
    gamesPlayed?: string;
    wins?: string;
    losses?: string;
    winRate?: number;
    goalScored?: string;
    goalConced?: string;
}

const Achievment: React.FC<achievmentProps> = ({ gamesPlayed, goalScored, goalConced , wins}) => {
   const [risingStar, setRisingStar] = useState(false);
   const [goalMachine, setGoalMachine] = useState(false);
   const [wallOfSteel, setWallOfSteel] = useState(false);
   const [undisputed, setUndisputed] = useState(false);

	useEffect(() => {
		if (Number(gamesPlayed) >= 3)
			setRisingStar(true);
		if (Number(goalScored) >= 20)
			setGoalMachine(true);
		if ((Number(goalConced) / Number(goalScored) * 100) <= 25)
			setWallOfSteel(true);
		if ((Number(wins) * 100 / Number(gamesPlayed)) >= 80 && Number(gamesPlayed) >= 5)
			setUndisputed(true);
	},[])

    return (
        <>
            <div className="flex flex-col  w-full ">
                    {risingStar &&
                <div className=" w-full flex border my-2 bg-cyan-400/10  rounded-xl items-center">
				
					<>
						<Image className="aspect-square"  src={achiev1} alt="achiev1" priority={true} width={80} height={80} />
						<div className="m-3">
							<h1 className=" font-bold text-xl">RISING STAR</h1>
							<p>Played more than 3 gmaes</p>
						</div>
					</>
					</div>
                    }

                    {goalMachine &&
					<div className=" w-full flex border my-2 bg-cyan-400/10 rounded-xl items-center">
							<>
								<Image className="aspect-square"  src={achiev2} alt="achiev1" priority={true} width={80} height={80} />
								<div className="m-3">
									<h1 className=" font-bold text-xl">GOAL MACHINE</h1>
									<p>Scored over 20 goals</p>
								</div>
							</>
					</div>
                    }
                    {wallOfSteel &&
					<div className=" w-full flex border my-2 bg-cyan-400/10 rounded-xl items-center">
							<>
								<Image className="aspect-square"  src={achiev3} alt="achiev1" priority={true} width={80} height={80} />
								<div className="m-3">
									<h1 className=" font-bold text-xl">WALL OF STEEL</h1>
									<p>Get less than 25% conceded on you </p>
								</div>
							</>
					</div>
                    }
                    {undisputed &&
					<div className=" w-full flex border my-2 bg-cyan-400/10 rounded-xl items-center">
							<>
								<Image className="aspect-square"  src={achiev4} alt="achiev1" priority={true} width={80} height={80} />
								<div className="m-3">
									<h1 className=" font-bold text-xl">UNDISPUTED CHAMPION</h1>
									<p>Win over 80% of your games</p>
								</div>
							</>
					</div>
                    }
            </div>
        </>
    );
};

export default Achievment;