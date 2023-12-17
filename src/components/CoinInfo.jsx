import axios from 'axios';
import { useEffect, useState } from 'react';
import { HistoricalChart } from '../services/coinPageService';
import { Line } from 'react-chartjs-2';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import SelectButton from './SelectButton';
import { chartDays } from '../services/data';
import { CryptoState } from './CryptoContent';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

// eslint-disable-next-line react/prop-types
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(7);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    // eslint-disable-next-line react/prop-types
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [coin, days, currency]); // Include all dependencies

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coinInfoContainer">
        {!historicData || flag === false ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                datasets: [
                  {
                    data: historicData.map((coin) => ({
                      x: new Date(coin[0]), // Convert timestamp to a Date object
                      y: coin[1], // Numerical value
                    })),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: '#EEBC1D',
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                scales: {
                  x: {
                    type: 'time',
                    time: {
                      tooltipFormat: 'll',
                      unit: 'day',
                      displayFormats: {
                        day: 'MMM d',
                      },
                    },
                    title: {
                      display: true,
                      text: 'Time',
                    },
                  },
                  y: {
                    type: 'linear',
                    title: {
                      display: true,
                      text: 'Prices in USD',
                    },
                    beginAtZero: false,
                  },
                },
              }}
            />
            <div className="chartDaysContainer">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
