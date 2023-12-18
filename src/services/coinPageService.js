import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const coinPageService = {
  // Function to get details of a single coin
  getSingleCoin: async (id) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/crypto/coin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting details for coin ${id}:`, error);
      throw error;
    }
  },

  // Function to get historical price data of a coin
  getHistoricalChart: async (id, days) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/price-data/${id}/days=${days}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting historical chart for coin ${id}:`, error);
      throw error;
    }
  },
};

export default coinPageService;
