import React from 'react';
import Image from 'next/image'; // Import the Image component
import './Header.scss'; // Adjust this path to match your image location

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="site-name">
          <Image
            src="/logo.png"
            alt="logo"
            className="logo"
            width={100} // Set a width
            height={100} // Set a height
            priority // Optional: set priority for faster loading
          />
          CVE
        </h1>
      </div>
      <nav className="header-center">
        <span>About</span>
        <span>Search</span>
        <span>Support</span>
      </nav>
      <div className="header-right">
        <button className="see-more" onClick={() => {/* Add your action here */}}>
          See More
        </button>
      </div>
    </header>
  );
};

export default Header;
