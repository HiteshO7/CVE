import React from 'react';

const CVECard = ({ cve }) => {
    const cvssMetrics = cve.cve.metrics?.cvssMetricV31 || [];
    const cvssData = cvssMetrics.length > 0 ? cvssMetrics[0].cvssData : null;
    const description = cve.cve.descriptions && cve.cve.descriptions[0]?.value
        ? cve.cve.descriptions[0].value
        : 'No description available';
    const references = cve.cve.references || [];

    const downloadCVE = () => {
        const dataStr = JSON.stringify(cve, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${cve.cve.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="border p-4 mb-4 rounded shadow-md">
            <h2 className="font-semibold text-lg">
                <a href={`https://nvd.nist.gov/vuln/detail/${cve.cve.id}`} target="_blank" rel="noopener noreferrer">
                    {cve.cve.id}
                </a>
            </h2>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Severity:</strong> {cvssData?.baseSeverity ? `${cvssData.baseSeverity} (CVSS Score: ${cvssData.baseScore})` : 'N/A'}</p>
            <p><strong>Published:</strong> {new Date(cve.cve.published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Last Modified:</strong> {new Date(cve.cve.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div>
                <strong>References:</strong>
                <ul className="list-disc list-inside">
                    {references.length > 0 ? (
                        references.map((ref, idx) => (
                            <li key={idx}>
                                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                                    {ref.source || `Reference ${idx + 1}`}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li>No references available.</li>
                    )}
                </ul>
            </div>
            <div className="button-container mt-2 flex justify-end">
                <button onClick={downloadCVE} className="download-button rounded-lg shadow-xl border-solid border-2 p-1 border-gray-300">
                    Download
                </button>
            </div>
        </div>
    );
};

export default CVECard;
