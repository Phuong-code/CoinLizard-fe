import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';
import '../../App.css';

function Banner() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Add a resize event listener to update windowWidth
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener-a
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const variantTitle = windowWidth < 800 ? 'h4' : 'h3';
  const variantSubTitle = windowWidth < 800 ? 'subtitle2' : 'subtitle1';

  return (
    <div className="banner-background">
      <Container
        className="bannerContent"
        style={{ height: windowWidth > 1200 ? '400px' : '300px' }}
      >
        <div className="tagline">
          <Typography
            variant={variantTitle}
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
              color: 'gold',
            }}
          >
            Coin Lizard
          </Typography>
          <Typography
            variant={variantSubTitle}
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
