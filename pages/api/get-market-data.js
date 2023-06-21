import axios from 'axios';

const getCryptoData = async () => {
  const response = await axios.get(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,XLA',
    {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
      },
    },
  );
  return Object.keys(response.data.data).map((key) => response.data.data[key]);
};

const getStockData = async (symbol) => {
  const apiKey = process.env.MARKETS_SH_API_KEY;
  const url = `https://markets.sh/api/v1/symbols/${symbol}?api_token=${apiKey}`;
  // const url = 'https://markets.sh/api/v1/symbols/NASDAQ:AAPL?api_token=e6efd9c09c6c6d41c2d45357d6c972a8';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

const getStocksData = async (symbols) => {
  try {
    const requests = symbols.map((symbol) => getStockData(symbol));
    const responses = await Promise.all(requests);

    return responses;
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  const tableData = {};
  try {
    tableData.crypto = await getCryptoData();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from CoinMarketCap API');
  }
  try {
    tableData.stocks = await getStocksData(['NASDAQ:NDAQ', 'NASDAQ:NDAQ', 'NASDAQ:NDAQ', 'NASDAQ:NDAQ']);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from markets sh API');
  }

  res.send(tableData);
}
