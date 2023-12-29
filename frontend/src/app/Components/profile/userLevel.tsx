interface UserLevelProps {
    level:number;
}
const UserLevel: React.FC<UserLevelProps> = ({ level }) => {

    const numberPart: number = Math.floor(level);
    const decimalPart : number = (level - numberPart) * 100;

    const barstyle ={
        width: `${decimalPart}%`,
    } ;
    return (
        <div className="flex w-full bg-red-500 justify-center items-center gap-2">
            <h1 className="text-lg font-bold text-slate-100 ">LEVEL:{numberPart} </h1>
            <div className="realtive w-[70%] h-4 bg-slate-400 rounded-lg items-center justify-center">
                <div className="flex items-center justify-center bg-green-400 rounded-lg h-4 " style={barstyle}>
                    <h1 className="font-bold ">
                        {decimalPart.toFixed()}%
                    </h1>
                </div>

            </div>
        </div>
    )
}

export default UserLevel;