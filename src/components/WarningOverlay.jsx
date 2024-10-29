// src/components/WarningOverlay.jsx

import React from 'react';
import Image from 'next/image';
import './WarningOverlay.scss'; // Import your styles

const WarningOverlay = ({ warnings = 10 }) => {
  return (
    <div className="overlay-div-forth">
      {Array.from({ length: warnings }, (_, index) => (
        <React.Fragment key={index}>
          <Image
            src="/Warning.png"
            alt="Warning"
            className="logo"
            width={50} // Set appropriate width for the warning image
            height={50} // Set appropriate height for the warning image
          />
          <p>Warning</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WarningOverlay;
