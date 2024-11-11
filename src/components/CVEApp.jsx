import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CVECard from './CVECard';
import ErrorMessage from './ErrorMessage';
import LoadingScreen from './LoadingScreen';

import Image from 'next/image'; // Import Image from Next.js
import './CVEApp.scss';

const CVEApp = () => {
    const [keyword, setKeyword] = useState('');  //manages the search
    const [cves, setCves] = useState([]); // stores the list of vulnerabilites
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const resultsPerPage = 20;
    const [totalResults, setTotalResults] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const resultsContainerRef = useRef(null);

    const addToSearchHistory = (keyword) => {
        setSearchHistory((prevHistory) => {
            const newHistory = [keyword, ...prevHistory.filter((term) => term !== keyword)];
            return newHistory.slice(0, 5);
        });
    };

    const handleSearch = async () => {
        if (!keyword) return;
        setLoading(true);
        setError(null);
        setCves([]);
        setPage(0);
        try {
            const response = await axios.get(
                `https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=${resultsPerPage}&startIndex=0&keywordSearch=${encodeURIComponent(keyword)}`
            );
            setCves(response.data.vulnerabilities);
            setTotalResults(response.data.totalResults);
            addToSearchHistory(keyword);
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError('Error fetching data, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if ((page + 1) * resultsPerPage >= totalResults || loadingMore) return;
        setLoadingMore(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=${resultsPerPage}&startIndex=${(page + 1) * resultsPerPage}&keywordSearch=${encodeURIComponent(keyword)}`
            );
            setCves((prevCves) => [...prevCves, ...response.data.vulnerabilities]);
            setPage((prevPage) => prevPage + 1);
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError('Error fetching more data, please try again later.');
        } finally {
            setLoadingMore(false);
        }
    };

    const handleScroll = () => {
        if (
            resultsContainerRef.current &&
            resultsContainerRef.current.scrollTop + resultsContainerRef.current.clientHeight >=
            resultsContainerRef.current.scrollHeight - 50
        ) {
            loadMore();
        }
    };

    return (
        <div className="cve-app">
            <div className="content">
                <h1 className="title">CVE Search</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search for CVEs..."
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">
                        Search
                    </button>
                </div>
                <div className="search-history">
                    {searchHistory.length > 0 &&
                        searchHistory.map((term, index) => (
                            <button
                                key={index}
                                onClick={() => setKeyword(term)}
                                className="history-button"
                            >
                                {term}
                            </button>
                        ))}
                </div>
                {loading && (
                    <div className="loading-center">
                        <LoadingScreen />
                    </div>
                )}
                {error && <ErrorMessage message={error} />}
                {cves.length === 0 && !loading && !error && (
                    <div className="no-results">
                        <Image
                        src="/no-results.png" // Update with your image path
                        alt="No results found"
                        className="no-results-image"
                        width={150} // Set the desired width
                        height={150} // Set the desired height
                    />
                    No Result Found
                    </div>
                )}
                <div
                    className="results-container"
                    ref={resultsContainerRef}
                    onScroll={handleScroll}
                >
                    {cves.map((cve, index) => (
                        <CVECard key={index} cve={cve} />
                    ))}
                </div>
                {loadingMore && (
                    <div className="loading-center">
                        <LoadingScreen />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVEApp;
