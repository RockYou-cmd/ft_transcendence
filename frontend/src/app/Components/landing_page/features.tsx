import React from 'react';
import { FaGamepad, FaTrophy, FaCog, FaUsers, FaSyncAlt, FaHeadphones, FaQuestionCircle, FaShieldAlt, FaRocket } from 'react-icons/fa'; // Import icons from react-icons library
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
        <div className="flex flex-wrap justify-center p-4 mx-4 ">
          {features.map((feature, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3   p-4 hover:bg-blue-500/10 ease-in-out  hover:shadow-xl rounded-lg hover:scale-105 delay-100 duration-700 hover:cursor-pointer">
              <div className="mr-6 ">{feature.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
  );
};

export default PongPongSection;
