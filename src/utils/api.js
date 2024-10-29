import axios from 'axios';

export const fetchCVEs = async (query, severity, startDate, endDate) => {
  let url = `https://services.nvd.nist.gov/rest/json/cves/1.0?resultsPerPage=10&startIndex=0&keyword=${encodeURIComponent(query)}`;

  // Add severity filter if selected
  if (severity) {
    url += `&cvssV3Severity=${severity}`;
  }

  // Add date range filter if provided
  if (startDate) {
    url += `&pubStartDate=${startDate}`;
  }
  if (endDate) {
    url += `&pubEndDate=${endDate}`;
  }

  try {
    const response = await axios.get(url);
    return response.data.vulnerabilities || [];
  } catch (error) {
    console.error('API fetch error:', error);
    return [];
  }
};
