import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PriceChart from '../components/PriceChart';
import coinPageService from '../services/coinPageService';
import { numberWithCommas } from '../utils/numberWithCommas';

const CoinPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async (coinId) => {
    try {
      const data = await coinPageService.getSingleCoin(coinId);
      setCoin(data);
    } catch (error) {
      console.error('Error fetching details for coin:', error);
    }
  };

  useEffect(() => {
    fetchCoin(coinId);
  }, [coinId]);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <div className="coinPage-container">
      <div className="coinPage-sidebar">
        <img src={coin?.image} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" className="coinPage-heading">
          {coin?.name}
        </Typography>
        <div className="coinPage-marketData">
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className="coinPage-heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {'$'} {numberWithCommas(coin?.currentPrice.toFixed(2))}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className="coinPage-heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {'$'} {numberWithCommas(coin?.marketCap.toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
      </div>
      <PriceChart coin={coin} />
    </div>
  );
};

export default CoinPage;
