import { useEffect, useState } from 'react';
import {
  Container,
  createTheme,
  TableCell,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import homePageService from '../services/homePageService';
import { numberWithCommas } from '../utils/numberWithCommas';

const CACHE_KEY = 'CoinsCache'; // Key for storing cache in local storage
const CACHE_EXPIRATION_TIME = 1 * 15 * 60 * 1000; // Cache expiration time (15 mins)

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Theme customization for Material UI components
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  // Function to fetch coin data from the API or local cache
  const fetchCoins = async () => {
    setLoading(true);
    // Check if the data is available in the cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      // Check if the cached data is not expired
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        setCoins(data);
        setLoading(false);
        return;
      }
    }

    // If data is not cached or expired, make the API call
    homePageService
      .getAllCoinsDetails()
      .then((data) => {
        // Cache the fetched data along with a timestamp
        const cacheData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        setCoins(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching all coins details:', error);
      });
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // Function to handle search filtering
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search),
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {[
                    'Coin',
                    'Price',
                    '24h Change',
                    '7d Change',
                    '30d Change',
                    '24h Volumn',
                    'Market Cap',
                  ].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? 'center' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch().map((row) => {
                  // Determining the color based on profit or loss
                  const profit24h = row.priceChangePercentage24h > 0;
                  const profit7d = row.priceChangePercentage7d > 0;
                  const profit30d = row.priceChangePercentage30d > 0;
                  const numberFontSize = '18px';
                  const numberFontWeight = '500';
                  const positiveColor = 'rgb(14, 203, 129)';
                  const negativeColor = 'red';
                  return (
                    <TableRow
                      onClick={() => navigate(`/coin/${row.id}`)}
                      className="coin-row"
                      key={row.name}
                    >
                      {/* Coin cell with image and name */}
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: 'flex',
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              textTransform: 'uppercase',
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: 'darkgrey' }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: numberFontSize }}>
                        {'$'} {numberWithCommas(row.currentPrice.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit24h ? positiveColor : negativeColor,
                          fontWeight: numberFontWeight,
                          fontSize: numberFontSize,
                        }}
                      >
                        {profit24h && '+'}
                        {row.priceChangePercentage24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit7d ? positiveColor : negativeColor,
                          fontWeight: numberFontWeight,
                          fontSize: numberFontSize,
                        }}
                      >
                        {profit7d && '+'}
                        {row.priceChangePercentage7d.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit30d ? positiveColor : negativeColor,
                          fontWeight: numberFontWeight,
                          fontSize: numberFontSize,
                        }}
                      >
                        {profit30d && '+'}
                        {row.priceChangePercentage30d.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: numberFontSize }}>
                        {'$'} {numberWithCommas(row.volumn24h.toString().slice(0, -6))}M
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: numberFontSize }}>
                        {'$'} {numberWithCommas(row.marketCap.toString().slice(0, -6))}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}
