import { useState } from "react";
import "../../assest/ProfileCard.css"
import Image from "next/image"

type CardProps = {
    imageurl: File;
    name: string;
    title: string;
    discription: string;
}

const ProfileCard = ({imageurl, name, title, discription}: CardProps) => {

    return (
        <div className="container  ">
            <div className="card">
                <div className="front  overflow-hidden ">
                    <Image src={imageurl} alt="Picture of the dev"  />
                    <h1 className="text-xl font-bold h-1 "> {name}</h1> 
                    <h1 className="mb-3 font-light"> {title}</h1>
                </div>
                <div className="back">
                    <p className="back-head"> </p>
                    <h1>Bio:</h1> <br/>
                    <p> {discription} </p>
                </div>
            </div>
        </div>
    )
};

export default ProfileCard;