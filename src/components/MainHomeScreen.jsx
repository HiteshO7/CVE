import React, { useState, useEffect } from 'react';
import './MainHomeScreen.scss';

const MainHomeScreen = () => {
  const texts = ["Protect", "Secure"];
  const animationDuration = 200; // Duration for each letter animation
  const totalDisplayTime = 3000; // Time for full display before switching
  const [index, setIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);

  // This effect handles the animation
  useEffect(() => {
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
  }, [index, isRemoving, currentWordIndex, texts]); // Make sure texts is stable

  return (
    <div className="home-screen-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/mainbg.mp4" type="video/mp4" />
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
        <p>Protecting your data involves using secure practices, tools, and maintaining regular vigilance to minimize risks...</p>
      </div>
      <div className="bottom-text-left">
        <p>For network safety, avoid using public Wi-Fi for confidential transactions...</p>
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
