/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

const Header = () => (
  <div className="container mx-auto px-10 mb-4 pt-3 flex items-center justify-between">
    <div className="flex items-center">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <img src="/logoBlog.png" alt="Logo" className="w-12 h-12 mr-2" />
          <span className="font-bold text-2xl text-black">Des-orden</span>
        </div>
      </Link>
    </div>
    <div className="flex items-center">
      <Link href="/link1">
        <a className="text-black font-normal cursor-pointer mr-4">Artículos</a>
      </Link>
      <Link href="/link2">
        <a className="text-black font-normal cursor-pointer mr-4">Podcast</a>
      </Link>
      <Link href="/link3">
        <a className="text-black font-normal cursor-pointer mr-4">Sobre nosotros</a>
      </Link>
      <Link href="/link4">
        <a className="text-black font-normal cursor-pointer">Contacto</a>
      </Link>
    </div>
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
  </div>
);

export default Header;
