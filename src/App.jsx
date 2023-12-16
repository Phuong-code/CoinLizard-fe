import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
// import CoinPage from './pages/CoinPage';
import { Box } from '@mui/material';
import { Routes } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: '#14161a',
          color: 'white',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          {/* <Route exact path="/coin/:id" element={<CoinPage />} /> */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
