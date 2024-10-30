// src/app/page.js
"use client";
import React from 'react';
import CVEApp from '../components/CVEApp';
import Header from '../components/Header';
import About from '../components/About';
import MainHomeScreen from '../components/MainHomeScreen';
import WarningOverlay from '../components/WarningOverlay';

const Page = () => {
    const totalWarnings = 21;
  return (
    <div>
{/*
<WarningOverlay warnings={totalWarnings} /> */}
    <Header />
      <MainHomeScreen />
      <CVEApp />
      <About/>

    </div>
  );
};

export default Page;
