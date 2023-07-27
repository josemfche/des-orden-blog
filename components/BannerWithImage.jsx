import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CotizacionesCarousel from './CotizacionesCarousel';

const Hero = ({ isHome }) => (
  <div>
    <div className="flex flex-col lg:flex-row py-8 mt-16 justify-center items-center">
      <div className="flex flex-col lg:w-2/3 w-full lg:justify-start justify-center lg:px-8 px-8">
        <p className="text-3xl md:text-5xl lg:text-7xl text-left mb-8 text-secondthegray">
          Economía, política e inversiones desde otra perspectiva.
        </p>
        {/*         <p className="text-sm md:text-base lg:text-lg text-gray-800 pr-5 mb-4">
          Soy venezolano, médico psiquiatra dedicado a las finanzas, intentando dar explicaciones al des-orden que vivimos.
        </p> */}
      </div>
      <div className="lg:w-1/3 w-full justify-center items-center">
        <CotizacionesCarousel />
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
