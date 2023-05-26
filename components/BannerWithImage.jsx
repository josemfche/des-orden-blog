import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CryptoBox from './CryptoBox';

const Hero = ({ isHome }) => (
  <div className="container mx-auto my-10 px-4 md:px-6 lg:px-16">
    <div className="py-10 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="flex flex-col gap-5 justify-self-start md:gap-10 w-full md:w-2/3 pr-5">
          <p className="text-2xl md:text-4xl lg:text-6xl font-bold text-left">
            Economía, política e inversiones desde otra perspectiva.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-800 pr-5">
            Soy venezolano, médico psiquiatra dedicado a las finanzas, intentando dar explicaciones al des-orden que vivimos.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center mx-6 w-full md:w-auto">
          <CryptoBox />
        </div>
      </div>
    </div>
    {!isHome && (
      <div className="flex items-center justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="searchInputHome text-black bg-gray-100 py-2 pl-4 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Hero;
