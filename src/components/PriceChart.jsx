import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import coinPageService from '../services/coinPageService';
import { Line } from 'react-chartjs-2';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import SelectButton from './SelectButton';
import { chartDays } from '../utils/chartDays';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const PriceChart = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(7);

  // Define PropTypes for type checking
  PriceChart.propTypes = {
    coin: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  // Function to fetch historical data
  const fetchHistoricData = async (id, days) => {
    try {
      const data = await coinPageService.getHistoricalChart(id, days);
      setHistoricData(data.prices);
    } catch (error) {
      console.error('Error fetching historical Data for coin:', error);
    }
  };

  useEffect(() => {
    fetchHistoricData(coin.id, days);
  }, [coin.id, days]);

  // Theme customization for Material UI components
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
        {/* Display a loading indicator while data is being fetched */}
        {!historicData ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <>
            {/* Line chart to display historical price data */}
            <Line
              data={{
                datasets: [
                  {
                    data: historicData.map((coin) => ({
                      x: new Date(coin[0]), // Convert timestamp to a Date object
                      y: coin[1], // Numerical value
                    })),
                    label: `Price (Past ${days} Days) in USD`,
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
                      text: 'USD',
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  legend: {
                    align: 'end',
                  },
                },
              }}
            />
            {/* Buttons to select the number of days for the chart */}
            <div className="chartDaysContainer">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
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

export default PriceChart;
