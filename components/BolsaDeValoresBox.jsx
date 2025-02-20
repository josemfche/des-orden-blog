/* import Image from 'next/image'; */
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Circles } from 'react-loader-spinner';

const BolsaDeValoresBox = ({ bolsaDeValoresData, loading }) => {
  if (loading || bolsaDeValoresData === null) {
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

  const BCVData = bolsaDeValoresData.filter((stock) => stock?.COD_SIMB === 'BVCC')[0];
  const isPositive1hBCV = parseFloat(BCVData.ULT_VAR_REL) >= 0;

  return (
    <div className="bg-white w-full rounded-lg py-4 px-8 h-full flex flex-col justify-center">
      <div className="font-bold text-center w-full">Nacional</div>
      <div key={BCVData?.COD_SIMB} className="flex items-center my-2 py-2">
        <div className="rounded-full shadow-2xl flex justify-center items-center">
          {/*               <Image
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${BCVData.id}.png`}
                alt={BCVData.name}
                width={64}
                height={64}
              /> */}
        </div>
        <div className="flex-1 flex-col">
          <div className="flex font-extrabold">{BCVData.COD_SIMB}</div>
          <div className="flex"><strong>{'Volumen: '}</strong>{BCVData.VOLUMEN}</div>
        </div>
        <div className="text-sm flex flex-col items-end">
          <span
            className={`mr-1 font-extrabold text-xl ${' '}`}
          >
            {parseFloat(BCVData.PRECIO_ULT).toFixed(2)}
          </span>
          <span
            className={`${isPositive1hBCV ? 'bg-green1' : 'bg-red-500'} flex px-8 justify-center items-center text-white font-bold rounded-lg text-center w-1/2 px-2`}
          >
            {isPositive1hBCV
              ? <FontAwesomeIcon icon={faArrowUp} className="text-white mx-1" />
              : <></>}
            {!isPositive1hBCV
              ? <FontAwesomeIcon icon={faArrowDown} className="text-white mx-1" />
              : <></>}
            {` ${parseFloat(BCVData.ULT_VAR_REL).toFixed(2)}`}%
          </span>
        </div>
      </div>
      {bolsaDeValoresData.filter((stock) => stock?.COD_SIMB !== 'BVCC').map((stock) => {
        const isPositive24h = stock.DIF_PRECIO_CIE >= 0;
        const isPositive1h = stock.PORC_DIF_CIE >= 0;

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
                {/* <div className="flex">{stock.COD_SIMB}</div> */}
                <div className="flex font-extrabold">{stock.COD_SIMB}</div>
              </div>
              <div className="text-sm flex flex-col items-end">
                <span
                  className={`mr-1 font-extrabold text-xl ${' '}`}
                >
                  {parseFloat(stock.INDI_ACTUAL).toFixed(2)}
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
                  {` ${parseFloat(stock.PORC_DIF_CIE).toFixed(2)}`}%
                </span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BolsaDeValoresBox;
