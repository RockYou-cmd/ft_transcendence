import React from 'react';
import { MouseEvent } from 'react';
import Link from 'next/link';
import { SendFriendRequest } from '../Settings/ChatSettings';
import { useMe , useSocket} from '../Log/LogContext';
import { useEffect , useRef } from 'react';
import { on } from 'events';

const ProfileMenu = ({ User, onClose , setRefresh, refresh} : {User : any, onClose : any , setRefresh : any, refresh : boolean}) => {
  
	const {socket} = useSocket();
	const {me} = useMe() as any;
	const visible = useRef<HTMLDivElement>(null);
  // Handle menu item click actions
  const handleMenuItemClick = (e : MouseEvent, type : string) => {
	if (type == "block")
		SendFriendRequest({ username: User?.username, status: "block", socket: socket, me: me });
	else if (type == "invite"){
		socket?.emit("invite", {player2 : User?.username, player1 : me?.username});
	}
	setRefresh(!refresh);
	onClose(false);
  };

  useEffect(() => {
	const handleOutsideClick = (event: any) => {
		if (!visible?.current?.contains(event.target as Node)) {
			onClose(false);
		}
	};

	document.addEventListener('mousedown', handleOutsideClick);

	return () => {
		document.removeEventListener('mousedown', handleOutsideClick);
	};
},[]);

  return (
      <div ref={visible} className="absolute top-10 right-4 bg-gray-800 w-[10rem] shadow-lg rounded-md p-2 z-10 border">

      <div onClick={(e : MouseEvent) => handleMenuItemClick(e, "invite")} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Invite To Game</div>
      <Link href={"/chat/?user=" + User?.username}><div className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Open Chat</div></Link>
       <div onClick={(e : MouseEvent) => handleMenuItemClick(e, "block")} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Block</div>
    </div>
  );
};

export default ProfileMenu;
