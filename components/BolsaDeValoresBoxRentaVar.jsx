/* import Image from 'next/image'; */
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Circles } from 'react-loader-spinner';

const BolsaDeValoresBoxRentaVar = ({ finData, loading }) => {
  if (loading || finData === null) {
    return (
      <Circles
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    );
  }

  return (
    <div className="bg-white w-full rounded-lg py-4 px-8 h-full flex flex-col justify-center">
      <div className="font-bold text-center w-full">Nacional</div>
      {finData.map((stock) => {
        const isPositive24h = parseFloat(stock.VAR_REL) >= 0;
        const isPositive1h = parseFloat(stock.VAR_REL) >= 0;
        return (
          <>
            <div key={stock?.id} className="flex items-center my-2 py-2">
              <div className="rounded-full shadow-2xl flex justify-center items-center">
                {/*               <Image
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${stock.id}.png`}
                alt={stock.name}
                width={64}
                height={64}
              /> */}
              </div>
              <div className="flex-1 flex-col">
                {/* <div className="flex">{stock.DESC_SIMB}</div> */}
                <div className="flex">{stock.COD_SIMB}</div>
                <div className="flex"><strong>{'Volumen: '}</strong>{stock.VOLUMEN}</div>
              </div>
              <div className="text-sm flex flex-col items-end">
                <span
                  className={`mr-1 font-extrabold text-xl ${' '}`}
                >
                  {parseFloat(stock.PRECIO).toFixed(2)}
                </span>
                <span
                  className={`${isPositive24h ? 'bg-green1' : 'bg-red-500'} flex px-8 justify-center items-center text-white font-bold rounded-lg text-center w-1/2 px-2`}
                >
                  {isPositive1h
                    ? <FontAwesomeIcon icon={faArrowUp} className="text-white mx-1" />
                    : <></>}
                  {!isPositive1h
                    ? <FontAwesomeIcon icon={faArrowDown} className="text-white mx-1" />
                    : <></>}
                  {` ${parseFloat(stock.VAR_REL).toFixed(2)}`}%
                </span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BolsaDeValoresBoxRentaVar;
