import axios from 'axios';

const PRICE_DATA_ENDPOINT = '/api/price-data';

const coinsTableService = {
  getAllCoinsDetails: async () => {
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `http://localhost:8080${PRICE_DATA_ENDPOINT}/all-coins`,
      );
      return response.data;
    } catch (error) {
      console.error('Error getting all coins details:', error);
      throw error;
    }
  },
};

export default coinsTableService;
