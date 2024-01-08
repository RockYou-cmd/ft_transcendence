import { useEffect, useState } from "react";
import { APIs } from "@/app/Props/APIs";
import { Get, GetRes } from "../Fetch/Fetch";
import Image from "next/image";
import avatar from '../../../../public/avatar.png'
import Link from "next/link";
import '../../assest/mapBorder.css'

const FriendListComponent: any = ({User, refresh, Pending} : {User : string, refresh : boolean, Pending : boolean}) => {
    const [friendList, setFriendList] = useState<any>();
	const fetchFriendList = async () => {
	try {
		let response : any;
		console.log("user", User, "pending", Pending);
		if (User == ""){
			if (!Pending)
				response = await Get(APIs.Friends);
			else
				response = await Get(APIs.friendPending);
			console.log("res", response);
		}
		else{
			response = await Get(APIs.UserFriends + User);
			// const res  = GetRes(APIs.UserFriends + User);
			console.log("res", response);
		}
		setFriendList(response);
	

	} catch (error) {
		console.error('Error fetching friend list:', error);
	}
	};

useEffect(() => {
    fetchFriendList();
}, [refresh, Pending]); 

  function Print(user : any){
    user = user?.user;
    user = user?.users[0];
    return (
      <Link href={"/users/" + user?.username} ><div className="flex relative friendInProfile mx-2 overflow-y-auto bg-gradient-to-bl from-slate-900 via-slate-700 to-slate-900 items-center shadow-md rounded-xl my-3 p-2 hover:scale-105 ease-in-out duration-300 cursor-pointer">
      <Image  className=" rounded-full border aspect-square " src={user?.photo ? user?.photo : avatar} alt="img"  width={60} height={60} />
      <span className="  pl-8 text-lg font-bold justify-center text-center items-center">{user?.username.toUpperCase()}</span>
	  {((user?.status == "ONLINE" || user?.status == "INGAME") && (user?.friends ? (user.friends[0]?.status != "BLOCKED" ? true : false) : true)) ? <div className="status"></div> : <></>}
    </div></Link>
    )
  }

  return (
    <div className="">
        <ul>
          {friendList?.friends?.map((friend : any , index : any) => (
           <Print key={index} user={friend}/>
          ))}
        </ul>
      </div>
      );
};

export default FriendListComponent;
