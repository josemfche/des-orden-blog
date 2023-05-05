import axios from 'axios';

export default async function handler(req, res) {
  const { symbol } = req.query;
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from CoinMarketCap API');
  }
}
