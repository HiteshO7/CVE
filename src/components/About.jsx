'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './About.scss';

const About = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });
    const mainRef = useRef(null);
    const textRef = useRef(null); // Reference to the text area

    const handleMouseMove = (e) => {
        if (!mainRef.current) return; // Safety check
        const rect = mainRef.current.getBoundingClientRect();
        setLocalMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Cursor size logic
    const isOverTextArea =
        textRef.current &&
        localMousePos.x >= textRef.current.getBoundingClientRect().left - mainRef.current.getBoundingClientRect().left &&
        localMousePos.x <= textRef.current.getBoundingClientRect().right - mainRef.current.getBoundingClientRect().left &&
        localMousePos.y >= textRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top &&
        localMousePos.y <= textRef.current.getBoundingClientRect().bottom - mainRef.current.getBoundingClientRect().top;

    const size = isOverTextArea ? 200 : 40;

    useEffect(() => {
        console.log('Mouse Position:', localMousePos);
        console.log('Text Area Position:', textRef.current?.getBoundingClientRect());
    }, [localMousePos]);

    return (
        <main
            className="main"
            ref={mainRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="mask"
                animate={{
                    WebkitMaskPosition: `${localMousePos.x - size / 2}px ${localMousePos.y - size / 2}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.4 }}
            >
                <p className="hover1" ref={textRef}>
                    Welcome to CVE Hub! This platform is focused on supplying real-time information about security vulnerabilities, making it easier for IT professionals, developers, and security enthusiasts to stay updated.
                </p>
            </motion.div>

            <div className="body">
                <div className="custom-shape-divider-top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill" />
                    </svg>
                </div>

                <div className="About-ous">
                    <h1> About<span>.</span> &nbsp; About<span>.</span> &nbsp;About<span>.</span> &nbsp;About<span>.</span> &nbsp;About<span>.</span> &nbsp;About<span>.</span> &nbsp;About<span>.</span> &nbsp;About<span>.</span> &nbsp;About<span>.</span>  </h1>
                </div>

                <p className="hover">
                    &apos;Welcome to <span>CVE Tracker!</span> This tool is committed to delivering timely updates on security vulnerabilities, simplifying the process for IT professionals, developers, and security enthusiasts to remain knowledgeable.
                </p>

                <section className="about-content">
                    <h2 className="hqq">Our Purpose</h2>
                    <p className="ppp">
                        We aim to simplify access to detailed CVE data, leveraging the National Vulnerability Database to deliver insights that help secure applications and systems globally.
                    </p>

                    <h2 className="hq">How to Use</h2>
                    <ol>
                        <li>1. Enter keywords related to vulnerabilities in the search bar.</li>
                        <li>2. Browse through the list of results to find details about each CVE.</li>
                        <li>3. Click on CVE IDs for more information.</li>
                    </ol>
                </section>
            </div>
        </main>
    );
};

export default About;
