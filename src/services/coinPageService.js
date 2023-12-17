export const SingleCoin = (id) => `http://localhost:8080/api/crypto/coin/${id}`;

export const HistoricalChart = (id, days) =>
  `http://localhost:8080/api/price-data/${id}/days=${days}`;
