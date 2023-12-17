import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Box } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';
import coinsTableService from '../../services/bannerService';

const CACHE_KEY = 'trendingCoinsCache';
const CACHE_EXPIRATION_TIME = 1 * 15 * 60 * 1000; // Cache expiration time in milliseconds (15 mins)

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    // Check if the data is available in the cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      // Check if the cached data is not expired
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        setTrending(data);
        return;
      }
    }

    // If data is not cached or expired, make the API call
    coinsTableService
      .getAllCoinsDetails()
      .then((data) => {
        // Cache the fetched data along with a timestamp
        const cacheData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        setTrending(data);
      })
      .catch((error) => {
        console.error('Error fetching all coins details:', error);
      });
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const items = trending.map((coin) => {
    const profit = coin?.priceChangePercentage24h >= 0;

    return (
      <Box key={coin.id} className="carousel-item">
        <div>
          <img src={coin?.image} alt={coin.name} />
        </div>
        <span>
          {coin?.symbol}&nbsp;
          <span className={profit ? 'profit' : 'loss'}>
            {profit && '+'}
            {coin?.priceChangePercentage24h?.toFixed(2)}%
          </span>
        </span>
        <span>$ {coin?.currentPrice.toFixed(2)}</span>
      </Box>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    350: {
      items: 3,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 5,
    },
  };

  return (
    <Box className="carousel-container">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Box>
  );
};

export default Carousel;
