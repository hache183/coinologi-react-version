import { useState, useEffect } from 'react';

const cryptoSymbols = [
  'bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana',
  'polkadot', 'chainlink', 'litecoin', 'polygon', 'avalanche-2',
  'dogecoin', 'shiba-inu', 'tron', 'cosmos', 'algorand'
];

const getSymbol = (id) => {
  const symbols = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'binancecoin': 'BNB',
    'cardano': 'ADA',
    'solana': 'SOL',
    'polkadot': 'DOT',
    'chainlink': 'LINK',
    'litecoin': 'LTC',
    'polygon': 'MATIC',
    'avalanche-2': 'AVAX',
    'dogecoin': 'DOGE',
    'shiba-inu': 'SHIB',
    'tron': 'TRX',
    'cosmos': 'ATOM',
    'algorand': 'ALGO'
  };
  return symbols[id] || id.toUpperCase();
};

export default function useCryptoTicker() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(',')}&vs_currencies=eur&include_24hr_change=true`
      );
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        symbol: getSymbol(key),
        price: data[key].eur,
        change24h: data[key].eur_24h_change
      }));
      setCryptoData(formattedData);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { cryptoData, loading, error };
}
