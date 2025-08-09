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
  const {
    data,
    isLoading,
    selectedDate,
    currentDisplayedDate,
    currentSlideIndex,
    setSelectedDate,
    setCurrentSlideIndex,
    fetchDataForDate
  } = useNasaData();

  const handleDate = ({ target }) => {
    setSelectedDate(target.value);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    await fetchDataForDate(selectedDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledContainer>
        {isLoading && (<p>Loading...</p>) }
        <StyledWrapper>
          <div className="left">
            <LeftComponent
              handleForm={handleForm}
              handleDate={handleDate}
              isLoading={isLoading}
              data={data.data}
              currentSlideIndex={currentSlideIndex}
              distanceBetweenObjects={null}
            />
          </div>
          <div className="right">
            {data.data && data.data.length > 0 && (
              <SwiperComponent
                data={data.data}
                currentDisplayedDate={formatDisplayDate(currentDisplayedDate)}
                setCurrentSlideIndex={setCurrentSlideIndex}
            />
            <CurrentSlideInfo
              currentSlideIndex={currentSlideIndex + 1}
              allSlides={data.data.length}
            />
          )
          }
           {data.data && data.data.length === 0 && <p>No images available for the selected date.</p>}
        </div>
      </StyledWrapper>
    </StyledContainer>
    </ThemeProvider>
  );
}

export default Root;
