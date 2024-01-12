
import "../../assest/ProfileCard.css"
import Image from "next/image"

type CardProps = {
    imageurl: string;
    name: string;
    title: string;
    discription: string;
}

const ProfileCard = ({imageurl, name, title, discription}: CardProps) => {

    return (
        <div className="container  ">
            <div className="card">
                <div className="front  overflow-hidden ">
                    <Image src={imageurl} alt="Picture of the dev" width={300} height={300}/>
                    <h1 className="text-xl font-bold h-1 "> {name}</h1> 
                    <h1 className="mb-3 font-light"> {title}</h1>
                </div>
                <div className="back p-4 text-lg">
                    <p className="back-head"> </p>
                    <h1 className="mb-4 font-bold text-2xl text-center">Bio:</h1> 
                    <p> {discription} </p>
                </div>
            </div>
        </div>
    )
};

export default ProfileCard;