import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // Creating a dark theme using MUI's createTheme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  // Function to navigate to the home page when the title is clicked
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
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              CoinLizard
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
