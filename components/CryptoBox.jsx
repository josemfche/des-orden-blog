import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

const CryptoBox = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          '/api/get-market-data?symbol=BTC,ETH,USDT,XLA',
        );
        setCryptoData(res.data);
        setLoading(false);
        console.error(res);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white w-1/4 rounded-lg p-4">
      {Object.keys(cryptoData.data).map((key) => {
        const coin = cryptoData.data[key];
        const isPositive24h = coin.quote.USD.percent_change_24h >= 0;
        const isPositive1h = coin.quote.USD.percent_change_1h >= 0;

        return (
          <div key={coin.id} className="flex items-center my-2">
            <div className="mr-2 rounded-lg p-2 shadow-2xl flex justify-center items-center">
              <Image
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                alt={coin.name}
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 flex-col">
              <div className="flex font-extrabold">{coin.name}</div>
              <div className="flex">{coin.symbol}</div>
            </div>
            <div className="text-sm flex flex-col">
              <span
                className={`mr-1 font-extrabold text-xl ${isPositive1h ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {coin.quote.USD.percent_change_1h.toFixed(2)}%
              </span>
              <span
                className={`${isPositive24h ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {coin.quote.USD.percent_change_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoBox;
