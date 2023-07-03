import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Hero = ({ bannerText, isSearch, imageUrl }) => (
  <div className="container mx-auto my-10 text-center">
    {
      imageUrl
      && (
        <div className="relative w-full h-0 overflow-hidden" style={{ paddingBottom: '56.25%' }}>/
          <Image
            src={imageUrl}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            placeholder="empty"
          />
        </div>
      )
    }
    <div className="px-6 lg:px-16 py-10 rounded-3xl">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
        <div className="flex flex-row gap-5 lg:gap-10">
          <div className="flex flex-col gap-5 lg:gap-10 text-secondthegray">
            <p className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-center">
              {bannerText?.title}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-800">
              {bannerText?.subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
    {
      isSearch
      ?? (
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
    }
  </div>
);

export default Hero;
