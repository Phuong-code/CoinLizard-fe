import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../services/coinPageService';
import { numberWithCommas } from '../components/CoinsTable';
import { CryptoState } from '../components/CryptoContent';

const CoinPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(coinId));
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <div className="coinPage-container">
      <div className="coinPage-sidebar">
        <img src={coin?.image} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" className="coinPage-heading">
          {coin?.name}
        </Typography>
        {/* <Typography variant="subtitle1" className="coinPage-description">
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
        </Typography> */}
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
              {symbol} {numberWithCommas(coin?.currentPrice.toFixed(2))}
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
              {symbol} {numberWithCommas(coin?.marketCap.toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
