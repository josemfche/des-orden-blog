/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePostStore } from '../stores/globalStore';
import { searchPostSByTitle } from '../services';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [updatePosts] = usePostStore(
    (state) => [state.updatePosts],
  );

  const constructArray = (postArray) => {
    const newPostArray = postArray.map((post) => ({ node: post, cursor: 'null' }));
    return newPostArray;
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const searchedPosts = (await searchPostSByTitle(searchParam)) || [];

      updatePosts(constructArray(searchedPosts));
      setSearchParam('');
      if (isSidebarOpen) setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-4 pt-3 flex flex-wrap items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        <Link href="/">
          <a className="flex items-center cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-2" />
            <span className="font-bold text-2xl text-secondthegray">Des-orden</span>
          </a>
        </Link>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white z-10 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden w-3/4 max-w-xs`}>
        <div className="flex justify-between items-center mt-4 mx-4">
          <Link href="/">
            <a className="flex items-center cursor-pointer">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-2" />
            </a>
          </Link>
          <FontAwesomeIcon icon={faX} className="text-black cursor-pointer text-2xl" onClick={toggleSidebar} />
        </div>
        <div className="flex flex-col items-left mt-8 ml-4 mb-8">
          <Link href="/blog">
            <a className="text-black font-normal cursor-pointer mb-4">Artículos</a>
          </Link>
          <Link href="/podcast-videos">
            <a className="text-black font-normal cursor-pointer mb-4">Podcast</a>
          </Link>
          <Link href="/sobre-nosotros">
            <a className="text-black font-normal cursor-pointer mb-4">Sobre nosotros</a>
          </Link>
          <Link href="/contacto">
            <a className="text-black font-normal cursor-pointer">Contacto</a>
          </Link>
        </div>
        <div className="absolute left-0 right-0 w-full py-4 px-4">
          <div className="relative">
            <input
              onKeyDown={handleKeyDown}
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              type="text"
              placeholder="Buscar"
              className="searchInputHome border text-gray-400 bg-white py-2 pl-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden sm:flex items-center mb-4 sm:mb-0">
        <Link href="/blog">
          <a className="text-black font-normal cursor-pointer mr-4">Artículos</a>
        </Link>
        <Link href="/podcast-videos">
          <a className="text-black font-normal cursor-pointer mr-4">Podcast</a>
        </Link>
        <Link href="/sobre-nosotros">
          <a className="text-black font-normal cursor-pointer mr-4">Sobre nosotros</a>
        </Link>
        <Link href="/contacto">
          <a className="text-black font-normal cursor-pointer mr-4">Contacto</a>
        </Link>
      </div>

      {/* Search input */}
      <div className="hidden sm:block">
        <div className="relative">
          <input
            onKeyDown={handleKeyDown}
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            type="text"
            placeholder="Buscar"
            className="searchInputHome border text-gray-400 bg-white py-2 pl-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-black" />
          </div>
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div className="sm:hidden absolute top-0 right-0 mt-4 mr-4">
        <FontAwesomeIcon icon={faBars} className="text-black cursor-pointer text-2xl" onClick={toggleSidebar} />
      </div>
    </div>
  );
};

export default Header;
