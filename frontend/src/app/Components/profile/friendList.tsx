import { useEffect, useState } from "react";
import { APIs } from "@/app/Props/APIs";
import { Get } from "../Fetch/Fetch";
import Image from "next/image";
import avatar from '../../../../public/avatar.png'

const FriendListComponent: any = ({}) => {
    const [friendList, setFriendList] = useState<any>();
const fetchFriendList = async () => {
  try {
    const response = await Get(APIs.Friends);
    setFriendList(response); 
   

} catch (error) {
    console.error('Error fetching friend list:', error);
}
console.log("here:",friendList);
};

useEffect(() => {
    fetchFriendList();
}, []); 

  function Print(user : any){
    user = user?.user;
    user = user?.users[0];
    return (
    <div className="flex mx-2 overflow-y-auto bg-gradient-to-bl from-slate-900 via-slate-700 to-slate-900 items-center rounded-xl my-3 p-1">
      <Image  className="rounded-full border " src={user?.photo ? user?.photo : avatar} alt="img"  width={60} height={60} />
      <span className=" pl-8 text-lg font-bold justify-center text-center items-center">{user?.username.toUpperCase()}</span>
    </div>
    )
  }

console.log("here:",friendList);
    return (
        <div>
        <ul>
          {friendList?.friends?.map((friend : any , index : any) => (
           <Print key={index} user={friend}/>
          ))}
        </ul>
      </div>
      );
};

export default FriendListComponent;
