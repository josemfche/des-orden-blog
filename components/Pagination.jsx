import React from 'react';

const Pagination = ({ handlePageChange, currentPage, filteredPosts, postsPerPage }) => (
  <div className="w-full mt-4">
    <nav className="flex justify-center">
      <button
        type="button"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 bg-white border text-gray-900 mx-2 focus:outline-none ${currentPage === 1 && 'opacity-50 cursor-default'}`}
      >
        {'<'}
      </button>
      {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-1 ${pageNumber === currentPage ? 'bg-salmon text-white' : 'bg-white border text-gray-900'} mx-2 focus:outline-none`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => handlePageChange(Math.ceil(filteredPosts.length / postsPerPage))}
        disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
        className={`px-3 py-1 bg-white border text-gray-900 mx-1 focus:outline-none ${currentPage === Math.ceil(filteredPosts.length / postsPerPage) && 'opacity-50 cursor-default'}`}
      >
        {'>'}
      </button>
    </nav>
  </div>
);

export default Pagination;
