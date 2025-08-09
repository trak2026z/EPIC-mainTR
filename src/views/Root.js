import React from 'react';
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
import CurrentSlideInfo from 'components/olecues/CurrentSlideInfo/CurrentSlideInfo';
import useNasaData from '../hooks/useNasaData';
import { formatDisplayDate } from '../services/dateService';

function Root() {
  const { data, isLoading, selectedDate, currentDisplayedDate, currentSlideIndex, setSelectedDate, setCurrentSlideIndex, fetchDataForDate } = useNasaData();

  const handleDate = ({ target }) => {
    setSelectedDate(target.value);
  };

  const handleForm = async (e)=> {
    e.preventDefault();
    await fetchDataForDate(selectedDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle ./>
      <StyledContainer>
        {isLoading && <p>Loading...</p>}
        <StyledWrapper>
          <div className="left">
            <LeftComponent \n              handleForm={handleForm} \n              handleDate={handleDate} \n              isLoading={isLoading} \n              data={data.data} \n              currentSlideIndex={currentSlideIndex} \n              distanceBetweenObjects={null} \n            />
          </div>
          <div className="right">
            {data.data && data.data.length > 0 ? (
              <>
                <SwiperComponent \n                  data={data.data} \n                  currentDisplayedDate={formatDisplayDate(currentDisplayedDate)}  \n                  setCurrentSlideIndex={setCurrentSlideIndex} \n                />\n                <CurrentSlideInfo \n                  currentSlideIndex={currentSlideIndex + 1}  \n                  allSlides={data.data.length} \n                />\n              </>\n            ) : (\n              <p>No images available for the selected date.</p>\n            )\n          }\n        </div>
      </StyledWrapper>
    </StyledContainer>
    </ThemeProvider>
  );
}

export default Root;