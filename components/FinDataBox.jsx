import Image from 'next/image';

const FinDataBox = ({ finData, loading }) => {
  if (loading || finData === null) {
    return <div>Loading...</div>;
  }

  const iconsURLMap = {
    'NASDAQ:NDAQ': '/nasdaq-big.svg',
  };

  return (
    <div className="bg-white w-full rounded-lg py-4 px-8">
      {finData.map((stock) => {
        const isPositive24h = stock?.change_perc_today >= 0;
        const isPositive1h = (stock?.last_close - stock?.last_price) >= 0;

        return (
          <div key={stock.id} className="flex items-center my-2">
            <div className="mr-2 rounded-lg p-2 shadow-2xl flex justify-center items-center">
              <Image
                src={iconsURLMap[stock.msh_id]}
                alt={stock.name}
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 flex-col">
              <div className="flex font-extrabold">{stock?.ticker}</div>
              <div className="flex">{stock?.msh_id}</div>
            </div>
            <div className="text-sm flex flex-col">
              <span
                className={`mr-1 font-extrabold text-xl ${isPositive1h ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stock?.last_close.toFixed(2)}%
              </span>
              <span
                className={`${isPositive24h ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stock?.change_perc_today.toFixed(2)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinDataBox;
