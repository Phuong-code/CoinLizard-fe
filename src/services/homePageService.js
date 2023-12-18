import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const homePageService = {
  // Function to get details of all coins
  getAllCoinsDetails: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/crypto/all-coins`);
      return response.data;
    } catch (error) {
      console.error('Error getting all coins details:', error);
      throw error;
    }
  },
};

export default homePageService;
