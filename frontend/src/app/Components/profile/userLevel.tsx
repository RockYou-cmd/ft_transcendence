
const UserLevel = ({ data } : { data : any}) => {
   
    const decimalPart = (Number(data?.xp) * 100) / (Number(data?.requiredXp));

    const barstyle ={
        width: `${decimalPart}%`,
    } ;
    return (
        <div className="flex relative my-2 py-2 flex-col w-full justify-center items-center ">
            <h1 className="text-lg font-bold text-slate-100 ">LEVEL: {data?.level} </h1>
                    <h1 className=" absolute mt-7 z-10 justify-center items-center font-bold text-center ">
                        {decimalPart.toFixed(0)}%
                    </h1>
            <div className="realtive w-[70%] h-5 bg-slate-500 shadow-inner shadow-gray-900 rounded-lg items-center text-center justify-center">
                <div className="flex relative items-center justify-center bg-gradient-to-b from-teal-700 via-teal-500 to-teal-700 rounded-lg h-5 " style={barstyle}>
                </div>
            </div>
        </div>
    )
}

export default UserLevel;