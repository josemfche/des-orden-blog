import axios from 'axios';

const API_BASE_URL = 'https://www.bolsadecaracas.com/api';
const LOGIN_ENDPOINT = '/login';
const DATA_ENDPOINT = '/mercado/indices';
const DATA_ENDPOINT_RENTA_VARIABLE = '/mercado/renta-variable/titulos';

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

const fetchDataRentaWithToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${DATA_ENDPOINT_RENTA_VARIABLE}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired, get a new token and retry
      const newToken = await getToken();
      currentToken = newToken;
      return fetchDataRentaWithToken(newToken);
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
    const dataRenta = await fetchDataRentaWithToken(token);

    const dataBolsa = Object.keys(data.response).map((key) => {
      const dataBolsaVar = data.response[key];
      dataBolsaVar.COD_SIMB = key.toUpperCase();
      return dataBolsaVar;
    });

    return { dataBolsa, dataRenta };
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
  const errArray = [];
  try {
    tableData.crypto = await getCryptoData();
  } catch (error) {
    console.error(error);
    errArray.push('Error fetching data from CoinMarketCap API');
  }
  try {
    tableData.stocks = await getStocksData(['^IXIC', '^DJI', '^GSPC', '^BVSP', '^GDAXI', '^FTSE', '^FCHI', '^IBEX', 'NYSE:FEZ', '^MERV', '^N225', '^MXX']);
  } catch (error) {
    console.error(error);
    errArray.push('Error fetching data from markets sh API');
  }
  try {
    tableData.bolsaDeValores = await getBolsaDeValoresData();
  } catch (error) {
    console.error(error);
    errArray.push('Error fetching data from bolsa de valores API');
  }

  res.send({ tableData, errArray });
}
