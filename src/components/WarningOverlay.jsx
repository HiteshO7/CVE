// src/components/WarningOverlay.jsx

import React from 'react';
import './WarningOverlay.scss'; // Import your styles

const WarningOverlay = ({ warnings = 10 }) => {
  return (
    <div className="overlay-div-forth">
      {Array.from({ length: warnings }, (_, index) => (
        <React.Fragment key={index}>
          <img src="/Warning.png" alt="Warning" className="logo" />
          <p>Warning</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WarningOverlay;
