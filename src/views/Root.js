import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'views/App.css';
import 'swiper/css/navigation';
import { GlobalStyle } from 'assets/styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { StyledContainer } from 'components/templates/StyledContainer/StyledContainer.style';
import { StyledWrapper } from 'components/templates/StyledWrapper/StyledWrapper.style';
import SwiperComponent from 'components/organisms/SwiperComponent/SwiperComponent';
import LeftComponent from 'components/organisms/LeftComponent/LeftComponent';
import CurrentSlideInfo from 'components/molecues/CurrentSlideInfo/CurrentSlideInfo';
import {fetchNasaData} from '../services/nasaService';
import {parseInputDate} from '../services/dateService';
import {distanceBetweenObjects} from '../services/mathService';

const API_KEY = process.env.REACT_APPA_API_KEY;

function Root() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDisplayedDate, setCurrentDisplayedDate] = useState(JSON.parse(window.localStorage.getItem('currentDisplayedDate')) || {});
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        setIsLoading(false);
        if (window.localStorage) {
            const storedData = window.localStorage.getItem('data');
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        }
    }, []);

    const handleDate = ({ target }) => {
        setSelectedDate(parseInputDate(target.value));
    };

    const handleForm = async (e)=> {
        e.preventDefault();
        try {
            setIsLoading(true);
            setCurrentDisplayedDate(selectedDate);
            setCurrentSlideIndex(0);
            localStorage.setItem('currentDisplayedDate', JSON.stringify(selectedDate));
            const apiData = await fetchNasaData(selectedDate.fullDate, API_KEY;
            localStorage.setItem('data', JSON.stringify(apiData));
            setData(apiData);
        } catch(err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <StyledContainer>
                {!isLoading && (
                    <StyledWrapper>
                        <div className="left">
                            <LeftComponent
                                handleForm={handleForm}
                                handleDate={handleDate}
                                isLoading={isLoading}
                                data={data.data}
                                currentSlideIndex={currentSlideIndex}
                                distanceBetweenObjects={distanceBetweenObjects}
                            />
                        </div>
                        <div className="right">
                            {data.data && data.data.length > 0 && (
                                <>
                                    <SwiperComponent
                                        data={data.data}
                                        currentDisplayedDate={currentDisplayedDate}
                                        setCurrentSlideIndex={setCurrentSlideIndex}
                                    />
                                    <CurrentSlideInfo currentSlideIndex={currentSlideIndex + 1} allSlides={data.data.length} />
                                </>
                            )}
                            {data.data && data.data.length === 0 && <p>No images available for the selected date.</p>}
                        </div>
                    </StyledWrapper>
                )}
            </StyledContainer>
        </ThemeProvider>
    );
}

export default Root;
