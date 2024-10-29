'use client';

import React from 'react';
import './About2.scss';

const About2 = () => {
    return (
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
    );
};

export default About2;
