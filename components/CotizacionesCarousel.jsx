import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import { Circles } from 'react-loader-spinner';
import CryptoBox from './CryptoBox';
import FinDataBox from './FinDataBox';
import BolsaDeValoresBox from './BolsaDeValoresBox';
import BolsaDeValoresBoxRentaVar from './BolsaDeValoresBoxRentaVar';
import 'react-multi-carousel/lib/styles.css';

const CotizacionesCarousel = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [stocksData, setStocksData] = useState(null);
  const [bolsaDeValoresData, setBolsaDeValores] = useState(null);
  const [bolsaDeValoresRentaData, setBolsaDeValoresRenta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          '/api/get-market-data',
        );
        setCryptoData(res.data.tableData.crypto || []);
        setStocksData(res.data.tableData.stocks || []);
        setBolsaDeValores(res.data.tableData.bolsaDeValores.dataBolsa || []);
        setBolsaDeValoresRenta(res.data.tableData.bolsaDeValores.dataRenta || []);
        setLoading(false);
        console.log(res.data.errArray);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || cryptoData === null) {
    return (
      <div className="flex w-full justify-center">
        <Circles
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const stocksDataChunks = chunkArray(stocksData, 4);
  const bolsaDeValoresRentaDataChunks = chunkArray(bolsaDeValoresRentaData, 4);

  return (
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      ssr={false}
      infinite
      autoPlay
      autoPlaySpeed={15000}
      keyBoardControl
      showDots
      customTransition="all .5s ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
      dotListClass="custom-dot-list-style"
      itemClass=""
      className="shadow-xl rounded-lg xl:w-4/5 lg:w-full h-full"
    >
      {bolsaDeValoresRentaDataChunks.map((chunk, i) => <BolsaDeValoresBoxRentaVar key={i} finData={chunk} loading={loading} />)}
      <BolsaDeValoresBox bolsaDeValoresData={bolsaDeValoresData} loading={loading} />
      {stocksDataChunks.map((chunk, i) => <FinDataBox key={i} finData={chunk} loading={loading} />)}
      <CryptoBox cryptoData={cryptoData} loading={loading} />
    </Carousel>
  );
};

export default CotizacionesCarousel;
