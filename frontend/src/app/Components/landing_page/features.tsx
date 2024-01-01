import React, { useEffect, useRef, useState } from 'react';
import { FaGamepad, FaTrophy, FaCog, FaUsers, FaSyncAlt, FaHeadphones, FaQuestionCircle, FaShieldAlt, FaRocket } from 'react-icons/fa'; // Import icons from react-icons library
import "../../assest/features.css"

const PongPongSection = () => {
  const features = [
    {
      icon: <FaGamepad size={64} />,
      title: 'Online Multiplayer',
      description: 'Compete against friends or random opponents online.',
    },
    {
      icon: <FaTrophy size={64} />,
      title: 'Leaderboards',
      description: 'Track your scores and climb the global leaderboards.',
    },
    {
      icon: <FaCog size={64} />,
      title: 'Customizable Settings',
      description: 'Personalize your game experience with adjustable settings.',
    },
    {
      icon: <FaUsers size={64} />,
      title: 'Community Challenges',
      description: 'Join multiplayer challenges and tournaments.',
    },
    {
      icon: <FaSyncAlt size={64} />,
      title: 'Real-time Updates',
      description: 'Receive instant updates and notifications.',
    },
    {
      icon: <FaHeadphones size={64} />,
      title: 'Support & Assistance',
      description: 'Get prompt assistance from our dedicated team.',
    },
    {
      icon: <FaQuestionCircle size={64} />,
      title: 'Help Center',
      description: 'Access our comprehensive FAQ and help resources.',
    },
    {
      icon: <FaShieldAlt size={64} />,
      title: 'Security Measures',
      description: 'Ensuring the safety and security of your gaming experience.',
    },
    {
      icon: <FaRocket size={64} />,
      title: 'Fast & Seamless',
      description: 'Enjoy a fast and seamless gaming experience.',
    },
  ];


  return (
    <div className='w-full text-slate-700'>
      <div className="flex items-center  feature-container  overflow-x-hidden w-full ">
        <div className="features-slider flex w-full ">
          {features.map((feature, index) => (
            <div key={index} className="feature-item  w-full">
              <div className='flex items-center justify-center'>
              {feature.icon}
              </div>
              <h1 className='font-bold w-full  text-xl text-center'>{feature.title}</h1>
              <p className='w-64 text-center'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PongPongSection;
