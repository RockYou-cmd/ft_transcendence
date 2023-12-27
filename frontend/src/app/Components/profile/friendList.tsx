import { useState } from "react";


interface FriendListComponentProps {
    friendList: Friend[];
}
const FriendListComponent: any = ({ FriendListComponentProps }) => {

    return (
        <div>
            <div>
                <ul>
                    {FriendListComponentProps.map((Friend) => 
                        <li>
                            <image src={Friend.photo} alt="pic" />
                            <span>{Friend.username}</span>
                        

                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FriendListComponent;
