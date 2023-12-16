import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'AUD') setSymbol('A$');
  }, [currency]);

  return <Crypto.Provider value={{ currency, setCurrency, symbol }}>{children}</Crypto.Provider>;
};

CryptoContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
