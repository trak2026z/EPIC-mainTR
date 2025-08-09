import axios from 'axios';

/**
 * Fetch EPIC natural color images data from NASA!API for a given date.
 * @param {string} date - Date in YYYY-MM-DD format.
 * @param {string} apiKey - NASA!API key.
 * @returns {Promise<any>} - API response data.
 */
export async function fetchNasaData(date, apiKey) {
  if (!date) throw new Error('Date parameter is required');
  if (!apiKey) throw new Error('NASA!API key is missing');

  const response = await axios.get(
    `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`
  );
  return response.data;
}
