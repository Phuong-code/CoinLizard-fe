import { useEffect, useState } from 'react';
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@mui/material';
import coinsTableService from '../services/coinsTableService';
import { CryptoState } from './CryptoContent';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { currency, symbol } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    coinsTableService
      .getAllCoinsDetails()
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => {
        console.error('Error fetching all coins details:', error);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

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
          label="Search For a Crypto Currency.."
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
                  {['Coin', 'Price', '24h Change', '7d Change', '24h Volumn', 'Market Cap'].map(
                    (head) => (
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
                    ),
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch().map((row) => {
                  const profit24h = row.priceChangePercentage24h > 0;
                  const profit7d = row.priceChangePercentage7d > 0;
                  const numberFontSize = '18px';
                  return (
                    <TableRow
                      onClick={() => history.push(`/coins/${row.id}`)}
                      className="coin-row"
                      key={row.name}
                    >
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
                        {symbol} {numberWithCommas(row.currentPrice.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: row.priceChangePercentage24h > 0 ? 'rgb(14, 203, 129)' : 'red',
                          fontWeight: 500,
                          fontSize: numberFontSize,
                        }}
                      >
                        {profit24h && '+'}
                        {row.priceChangePercentage24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: row.priceChangePercentage7d > 0 ? 'rgb(14, 203, 129)' : 'red',
                          fontWeight: 500,
                          fontSize: numberFontSize,
                        }}
                      >
                        {profit7d && '+'}
                        {row.priceChangePercentage7d.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: numberFontSize }}>
                        {symbol} {numberWithCommas(row.volumn24h.toString().slice(0, -6))}M
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: numberFontSize }}>
                        {symbol} {numberWithCommas(row.marketCap.toString().slice(0, -6))}M
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
