import { useState, useEffect } from 'react';
import { fetchNasaData } from '../services/nasaService';
import { parseInputDate, formatDisplayDate } from '../services/dateService';
import { storageService } from '../services/storageService';
import { distanceBetweenObjects } from '../services/mathService';

const API_KEY = process.env.REACT_APP_API_KEY;

export function useNasaData(initialDate) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [currentDisplayedDate, setCurrentDisplayedDate] = useState(storageService.getCurrentDisplayedDate() || {});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    const storedData = storageService.getData();
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const fetchDataForDate = async (dateObject) => {
    try {
      setIsLoading(true);
      const parsed = parseInputDate(dateObject);
      setSelectedDate(parsed);
      setCurrentDisplayedDate(formatDisplayDate(parsed));
      storageService.setCorrentDisplayedDate(formatDisplayDate(parsed));
      setCurrentSlideIndex(0);
      const apiData = await fetchNasaData(parsed.fullDate, API_KEY);
      if (apiData && apiData.data) {
        apiData.data = apiData.data.map(item => ({
          ...item,
          distanceFromEarth: distanceBetweenObjects(item, { lat: 0, lon: 0 })
        }));
      }
      setData(apiData);
      storageService.setData(apiData);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    selectedDate,
    currentDisplayedDate,
    currentSlideIndex,
    setSelectedDate,
    setCurrentSlideIndex,
    fetchDataForDate
  };
}
export default {
  useNasaData
};