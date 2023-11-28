"use client"
// import Link from 'next/link';
// import Navbar from '../Components/navbar';

// export default function User() {

// 	console.log("hey 3");
// 	return (
// 		<>
// 			<Navbar />
			
// 		</>
// 	)
// }

import React, { useState, useEffect, useRef } from 'react';

const OutsideClickHandler = ({ onOutsideClick, children } : any) => {
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
	const handleOutsideClick = (event: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
			onOutsideClick();
		}
	};

	document.addEventListener('mousedown', handleOutsideClick);

	return () => {
		document.removeEventListener('mousedown', handleOutsideClick);
	};
}, [onOutsideClick]);

  return <div ref={containerRef}>{children}</div>;
};

// Example usage
const App = () => {
  const [isComponentOpen, setIsComponentOpen] = useState(true);

  const closeComponent = () => {
    setIsComponentOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsComponentOpen(!isComponentOpen)}>Toggle Component</button>
      {isComponentOpen && (
        <OutsideClickHandler onOutsideClick={closeComponent}>
          {/* Your component content goes here */}
          <div style={{ border: '1px solid black', padding: '10px' }}>
            Click outside me to close.
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default App;
