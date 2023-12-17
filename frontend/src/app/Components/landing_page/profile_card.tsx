import { useState } from "react";
import "../../assest/ProfileCard.css"

type CardProps = {
    imageurl: string;
    text: string;
}

const ProfileCard = ({imageurl, text}: CardProps) => {

    return (
        <div className="container ">
            <div className="card">
                <div className="front">
                    <p className="front-head">Front Card</p>
                    <p> Front text</p>
                </div>
                <div className="back">
                    <p className="back-head"> Back Card</p>
                    <p> Back text</p>
                </div>
            </div>
        </div>
    )
};

export default ProfileCard;