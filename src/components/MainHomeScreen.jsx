import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import './MainHomeScreen.scss';

const MainHomeScreen = () => {
  const texts = useMemo(() => ["Protect", "Secure"], []);
  const animationDuration = 200;
  const totalDisplayTime = 3000;
  const [index, setIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [changingNumber, setChangingNumber] = useState(5);
  const [videoSrc, setVideoSrc] = useState('/mainbg.mp4'); // Default video source

  // Effect to update the video source based on color scheme preference
  useEffect(() => {
    const updateVideoSource = (e) => {
      if (e.matches) {
        console.log('Light mode detected');
        setVideoSrc('/white.mp4'); // Change to light mode video
      } else {
        console.log('Dark mode detected');
        setVideoSrc('/mainbg.mp4'); // Change to dark mode video
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    updateVideoSource(mediaQuery); // Set initial video based on preference
    mediaQuery.addEventListener('change', updateVideoSource); // Listen for changes

    return () => {
      mediaQuery.removeEventListener('change', updateVideoSource);
    };
  }, []);

  // Effect for typing animation
  useEffect(() => {
    console.log('Current video source:', videoSrc); // Log current video source

    const timeout = setTimeout(() => {
      if (isRemoving) {
        if (index > 0) {
          setIndex((prevIndex) => prevIndex - 1);
        } else {
          setIsRemoving(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        if (index < texts[currentWordIndex].length) {
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsRemoving(true);
        }
      }
    }, isRemoving
      ? animationDuration
      : (index === texts[currentWordIndex].length ? totalDisplayTime - (animationDuration * texts[currentWordIndex].length) : animationDuration)
    );

    return () => clearTimeout(timeout);
  }, [index, isRemoving, currentWordIndex, texts, videoSrc]); // Add videoSrc to dependencies

  // Effect for changing number animation
  useEffect(() => {
    const numberInterval = setInterval(() => {
      setChangingNumber((prevNumber) => (prevNumber === 9 ? 1 : prevNumber + 1));
    }, 500);

    return () => clearInterval(numberInterval);
  }, []);

  // Log when the component renders
  console.log('MainHomeScreen component is rendering');

  return (
    <div className="home-screen-container">
     <video className="background-video" key={videoSrc} autoPlay loop muted>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      <div className="text-container">
        <div className="text-left">
          <h1>{texts[currentWordIndex].slice(0, index)}</h1>
        </div>
      </div>
      <div className="text-right">
        <h1>your</h1>
      </div>
      <div className="text-center">
        <h1>data</h1>
      </div>
      <div className="bottom-text-right">
        <p>Protecting your data involves using secure practices, tools, and maintaining regular vigilance to minimize risks. A strong foundation starts with using complex, unique passwords for each account and enabling two-factor authentication (2FA) to add an extra layer of security beyond passwords. Equally essential is keeping all your software, applications, and antivirus programs updated, as regular updates patch vulnerabilities that attackers could otherwise exploit.</p>
      </div>
      <div className="bottom-text-left">
        <p>For network safety, avoid using public Wi-Fi for confidential transactions. If needed, add a layer of security with a Virtual Private Network (VPN). Regular backups to secure locations, such as an external drive or encrypted cloud storage, ensure data recovery in case of cyberattacks or hardware failure.</p>
      </div>

      <div className="overlay-container">
        <div className="overlay-div-first">
          <p>
            <span>+ </span> 6
            <motion.span
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="changing-number"
            >
              {changingNumber}
            </motion.span>
            k
          </p>
          <p className="Text">startups</p>
          <span className="span1">←</span>
        </div>
        <div className="overlay-div-second">
          The CVE Program partners with community members worldwide to grow CVE content...
        </div>
        <div className="overlay-div-third">
          <p><span>+</span> 240830</p>
          <p className="ow">Data used</p>
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1730133946">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default MainHomeScreen;
