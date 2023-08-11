import axios from 'axios';

const API_BASE_URL = 'https://www.bolsadecaracas.com/api';
const LOGIN_ENDPOINT = '/login';
const DATA_ENDPOINT = '/mercado/indices';

let currentToken = null;

const getToken = async () => {
  const response = await axios.post(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
    sEmail: 'lramirez@mooregsf.com',
    sPassword: 'bvc*123',
  });
  return response.data.token;
};

const fetchDataWithToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${DATA_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired, get a new token and retry
      const newToken = await getToken();
      currentToken = newToken;
      return fetchDataWithToken(newToken);
    }
    throw error;
  }
};

export const getBolsaDeValoresData = async () => {
  try {
    // Get token from localStorage or login if it doesn't exist or is expired
    let token = currentToken;
    if (!token) {
      token = await getToken();
      currentToken = token;
    }

    // Use the token to fetch data
    const data = await fetchDataWithToken(token);

    return Object.keys(data.response).map((key) => {
      const dataBolsa = data.response[key];
      dataBolsa.COD_SIMB = key.toUpperCase();
      return dataBolsa;
    });
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

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
    tableData.stocks = await getStocksData(['^IXIC', '^DJI', '^GSPC', '^BVSP', '^GDAXI', '^FTSE', '^FCHI', '^IBEX', 'NYSE:FEZ', '^MERV', '^N225', '^MXX']);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from markets sh API');
  }
  try {
    tableData.bolsaDeValores = await getBolsaDeValoresData();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from bolsa de valores API');
  }

  res.send(tableData);
}
