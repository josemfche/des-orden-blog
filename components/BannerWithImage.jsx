import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CryptoBox from './CryptoBox';

const Hero = ({ isHome }) => (
  <div className="container mx-auto my-10 ">
    <div className="px-6 lg:px-16 py-10 rounded-3xl">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-5 justify-self-start lg:gap-10 w-2/3 pr-5">
            <p className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-left">
              Economía, política e inversiones desde otra perspectiva.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-800 pr-5 w-2/3">
              Soy venezolano, médico psiquiatra dedicado a las finanzas, intentando dar explicaciones al des-orden que vivimos.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center mx-6 w-100">
            <CryptoBox />
          </div>
        </div>
      </div>
    </div>
    {
      !isHome ? (
        <div className="flex items-center justify-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="searchInputHome text-black bg-gray-100 py-2 pl-4 pr-12 border border-gray-300 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
          </div>
        </div>
      )
        : <></>
    }
  </div>
);

export default Hero;
