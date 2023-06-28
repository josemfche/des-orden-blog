import Image from 'next/image';
import { faSquareArrowUpRight, faSquareArrowDownRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CryptoBox = ({ cryptoData, loading }) => {
  if (loading || cryptoData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-4">
      {cryptoData.map((coin) => {
        const isPositive24h = coin.quote.USD.percent_change_24h >= 0;
        /* const isPositive1h = coin.quote.USD.percent_change_1h >= 0; */

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
                className={`mr-1 font-extrabold text-xl ${' '}`}
              >
                ${coin.quote.USD.price.toFixed(2)}
              </span>
              <span
                className={`${isPositive24h ? 'bg-green-500' : 'bg-red-500'} text-white font-bold rounded-lg text-center px-2`}
              >
                {isPositive24h
                  ? <FontAwesomeIcon icon={faSquareArrowUpRight} className="text-white" />
                  : <FontAwesomeIcon icon={faSquareArrowDownRight} className="text-white" />}
                {` ${coin.quote.USD.percent_change_24h.toFixed(2)}`}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoBox;
