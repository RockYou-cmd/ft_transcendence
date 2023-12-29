import React from 'react';
import { MouseEvent } from 'react';
import Link from 'next/link';
import { SendFriendRequest } from '../Settings/ChatSettings';
import { useMe , useSocket} from '../Log/LogContext';

const ProfileMenu = ({ User, onClose } : {User : any, onClose : any }) => {
  
	const {socket} = useSocket();
	const {me} = useMe() as any;

  const handleMenuItemClick = (e : MouseEvent, type : string) => {
	if (type == "block")
		SendFriendRequest({ username: User?.username, status: "block", socket: socket, me: me });
	
  };

  return (
      <div className="absolute top-10 right-4 bg-gray-800 w-[10rem] shadow-lg rounded-md p-2 z-10 border">

      <div onClick={(e : MouseEvent) => handleMenuItemClick(e, "invite")} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Invite To Game</div>
      <Link href={"/chat/?user=" + User?.username}><div className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Open Chat</div></Link>
      <div onClick={(e : MouseEvent) => handleMenuItemClick(e, "block")} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Block</div>
    </div>
  );
};

export default ProfileMenu;
