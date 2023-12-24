import React from 'react';


const ProfileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // Handle menu item click actions
  const handleMenuItemClick = (menuItem) => {
    // Implement actions for each menu item here
    // For example: console.log(`Clicked on ${menuItem}`);
  };

  return (
      <div className="absolute top-10 right-4 bg-gray-800 w-[10rem] shadow-lg rounded-md p-2 z-10">
      {/* Example menu items */}

      <div onClick={() => handleMenuItemClick('')} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Invite To Game</div>
      <div onClick={() => handleMenuItemClick('')} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Open Chat</div>
      <div onClick={() => handleMenuItemClick('')} className="cursor-pointer hover:bg-gray-100/20 p-2 rounded-md">Block</div>
    </div>
  );
};

export default ProfileMenu;
