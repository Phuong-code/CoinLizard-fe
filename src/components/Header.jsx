import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from './CryptoContent';

function Header() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  const GoToHomePage = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={GoToHomePage}
              variant="h6"
              sx={{
                flex: 1,
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              CoinLizard
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{ width: 100, height: 40, ml: 2 }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'AUD'}>AUD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
