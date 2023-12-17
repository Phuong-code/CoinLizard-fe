export const SingleCoin = (id) => `http://localhost:8080/api/crypto/coin/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `http://localhost:8080/api/price-data/${id}/days=${days}`;
