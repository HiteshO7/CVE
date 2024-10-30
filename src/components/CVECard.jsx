import React from 'react';

const CVECard = ({ cve }) => {
  // Check the cvssMetricV31 array
  const cvssMetrics = cve.cve.metrics?.cvssMetricV31 || [];
  const cvssData = cvssMetrics.length > 0 ? cvssMetrics[0].cvssData : null;

  // Ensure descriptions and references are safely accessed
  const description = cve.cve.descriptions && cve.cve.descriptions[0]?.value
    ? cve.cve.descriptions[0].value
    : 'No description available';

  const references = cve.cve.references || [];

  return (
    <div className="border p-4 mb-4 rounded shadow-md">
      <h2 className="font-semibold text-lg">
        <a href={`https://nvd.nist.gov/vuln/detail/${cve.cve.id}`} target="_blank" rel="noopener noreferrer">
          {cve.cve.id}
        </a>
      </h2>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Severity:</strong> {cvssData ? `${cvssData.baseSeverity} (CVSS Score: ${cvssData.baseScore})` : 'N/A'}</p>
      <p><strong>Published:</strong> {new Date(cve.cve.published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p><strong>Last Modified:</strong> {new Date(cve.cve.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div>
        <strong>References:</strong>
        <ul className="list-disc list-inside">
          {references.length > 0 ? (
            references.map((ref, idx) => (
              <li key={idx}>
                <a  href={ref.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                  {ref.source || `Reference ${idx + 1}`}
                </a>
              </li>
            ))
          ) : (
            <li>No references available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CVECard;
